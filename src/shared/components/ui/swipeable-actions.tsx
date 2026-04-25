/**
 * Swipeable row: main content (`children`) slides horizontally over a right-aligned
 * actions strip. Spring `x` is the content offset (≤ 0); `width` mirrors |x| for the
 * actions panel clip. Drag uses @use-gesture + @react-spring; sizes come from ResizeObserver.
 */
import { animated, useSpring } from "@react-spring/web";
import { useResizeObserver } from "@siberiacancode/reactuse";
import { useDrag } from "@use-gesture/react";
import { clamp } from "es-toolkit/math";
import {
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/shared/utils/cn";

const AnimatedActions = animated("div");
const AnimatedContent = animated("div");

type SwipeableActionsProps = Omit<ComponentProps<"div">, "children"> & {
  actions: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};

export function SwipeableActions({
  actions,
  children,
  disabled = false,
  className,
  ...props
}: SwipeableActionsProps) {
  if (disabled) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <SwipeableActionsInteractive
      actions={actions}
      className={className}
      {...props}
    >
      {children}
    </SwipeableActionsInteractive>
  );
}

type SwipeableActionsInteractiveProps = Omit<SwipeableActionsProps, "disabled">;

function SwipeableActionsInteractive({
  actions,
  children,
  className,
  ...props
}: SwipeableActionsInteractiveProps) {
  const shell = useSwipeableShell();

  useResizeObserver(shell.actionsRowRef, { onChange: shell.measureActionsRow });
  useResizeObserver(shell.rootRef, { onChange: shell.measureRoot });

  return (
    <div
      ref={shell.rootRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <AnimatedActions
        style={{ width: shell.width }}
        className="absolute inset-y-0 right-0 flex overflow-hidden p-px"
      >
        <div
          ref={shell.actionsRowRef}
          className="flex h-full min-h-0 w-full flex-row items-stretch"
        >
          {/* Included in scrollWidth so swipe distance matches visible gap to the card */}
          <div className="w-2 shrink-0" aria-hidden />
          <div className={ACTIONS_ROW_SLOT_CLASS}>{actions}</div>
        </div>
      </AnimatedActions>
      <AnimatedContent
        {...shell.bind()}
        style={{ x: shell.x, touchAction: "pan-y" }}
        onClickCapture={shell.onContentClickCapture}
        className="relative h-full min-h-0"
      >
        {children}
      </AnimatedContent>
    </div>
  );
}

/**
 * Slot is a single flex child of the measured row; `actions` should render one root
 * wrapper — first descendant gets flex growth for full-width action groups.
 */
const ACTIONS_ROW_SLOT_CLASS =
  "flex h-full min-h-0 min-w-min flex-1 flex-row items-stretch [&>*:first-child]:min-h-0 [&>*:first-child]:w-full [&>*:first-child]:min-w-min [&>*:first-child]:flex-1 [&>*:not(:first-child)]:flex-none";

const OVERSCROLL_EASING_POWER = 2;
/** Treat |x| above this as “panel open” for click-to-close and hit-testing */
const PANEL_OPEN_X_EPS = 4;

/**
 * Finger must travel at least this fraction of the panel width from the drag start
 * “region” toward the opposite state, or we snap back to where the gesture began.
 */
const SNAP_PROGRESS_THRESHOLD = 0.3;

/**
 * Maps raw drag offset to visual `x` while the finger is down. Up to `-w` follows 1:1
 * (revealing actions of width `w`). Past that, if the row is narrower than the card (`c > w`),
 * apply rubber-band resistance so the card does not move infinitely.
 */
function mapOverscrollX(offsetX: number, w: number, c: number): number {
  if (offsetX >= -w) return offsetX;
  const extra = c - w;
  if (extra <= 0) return offsetX;
  const t = clamp((-offsetX - w) / extra, 0, 1);
  return -w - extra * t ** OVERSCROLL_EASING_POWER;
}

/**
 * Settles spring `x` on pointer up. Uses drag start vs end on the same scale as `mapOverscrollX`.
 *
 * - From near-closed, opens only if `endX` reaches at least `-SNAP_PROGRESS_THRESHOLD * panel`.
 * - From near-open, closes only if `endX` moves right past `-(1 - threshold) * panel`.
 * - If the gesture started in the middle third of the range, snap to whichever endpoint is closer.
 */
function snapEndWithThreshold(
  startX: number,
  endX: number,
  w: number,
  c: number,
): number {
  const panelW = Math.min(w, c);
  if (panelW <= 0) return 0;

  const openX = -panelW;
  const minTravel = SNAP_PROGRESS_THRESHOLD * panelW;

  const commitOpenLine = -minTravel;
  const commitCloseLine = openX + minTravel;

  const startedNearClosed = startX > commitCloseLine;
  const startedNearOpen = startX < commitOpenLine;
  const ambiguousStart = startedNearClosed && startedNearOpen;

  if (ambiguousStart) {
    return snapToCloserEnd(endX, openX);
  }

  if (startedNearClosed) {
    return endX <= commitOpenLine ? openX : 0;
  }

  if (startedNearOpen) {
    return endX >= commitCloseLine ? 0 : openX;
  }

  return snapToCloserEnd(endX, openX);
}

function snapToCloserEnd(endX: number, openX: number): number {
  return Math.abs(endX - openX) <= Math.abs(endX) ? openX : 0;
}

/**
 * Drag bounds, spring sync, measure guards, and tap-to-close on the foreground layer.
 */
function useSwipeableShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const actionsRowRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const [swipeActionsWidth, setSwipeActionsWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [{ x, width }, api] = useSpring(() => ({
    from: { x: 0, width: 0 },
  }));

  const measureActionsRow = useCallback(() => {
    const row = actionsRowRef.current;
    if (!row) return;
    // Avoid changing measured width mid-gesture — would desync bounds from what the user sees
    if (Math.abs(x.get()) > 0.5 || width.get() > 0.5) return;
    const sw = Math.ceil(row.scrollWidth);
    if (sw > 0) setSwipeActionsWidth((prev) => (sw !== prev ? sw : prev));
  }, [x, width]);

  const measureRoot = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const cw = Math.ceil(root.clientWidth);
    if (cw > 0) setContainerWidth((prev) => (cw !== prev ? cw : prev));
  }, []);

  const dragBounds = useMemo(() => {
    const c = containerWidth > 0 ? containerWidth : swipeActionsWidth;
    if (c <= 0) return { left: 0, right: 0 };
    return { left: -c, right: 0 };
  }, [containerWidth, swipeActionsWidth]);

  const close = useCallback(() => {
    void api.start({ x: 0, width: 0 });
  }, [api]);

  const bind = useDrag(
    ({ active, first, tap, offset: [offsetX] }) => {
      const w = swipeActionsWidth;
      if (w === 0) return;

      if (first && active) {
        dragStartXRef.current = x.get();
      }

      if (tap) return;

      const c = containerWidth > 0 ? containerWidth : w;
      const endX = mapOverscrollX(offsetX, w, c);

      const targetX = active
        ? endX
        : snapEndWithThreshold(dragStartXRef.current, endX, w, c);

      void api.start({ x: targetX, width: Math.abs(targetX) });
    },
    {
      axis: "x",
      from: () => [x.get(), 0],
      bounds: dragBounds,
      filterTaps: true,
      enabled: swipeActionsWidth > 0,
    },
  );

  /** When the sheet is open, the first tap on the card should close it, not activate links underneath. */
  const onContentClickCapture = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (x.get() > -PANEL_OPEN_X_EPS) return;
      e.preventDefault();
      e.stopPropagation();
      close();
    },
    [close, x],
  );

  return {
    rootRef,
    actionsRowRef,
    x,
    width,
    bind,
    onContentClickCapture,
    measureActionsRow,
    measureRoot,
  };
}
