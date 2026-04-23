import {
  cloneElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
} from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const TRIGGER_DATA_ATTR = "data-drag-safe-dropdown-trigger";
const DRAG_THRESHOLD_PX = 5;

type DragSafeDropdownMenuProps = {
  trigger: ReactElement;
  children: ReactNode;
  modal?: boolean;
  contentProps?: Omit<
    ComponentProps<typeof DropdownMenuContent>,
    "onPointerDownOutside"
  >;
};

export function DragSafeDropdownMenu({
  trigger,
  children,
  modal = false,
  contentProps,
}: DragSafeDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const pointerDownPosRef = useRef<{ x: number; y: number } | null>(null);

  const triggerElement = cloneElement(trigger, {
    [TRIGGER_DATA_ATTR]: "",
    onPointerDown: (event: React.PointerEvent) => {
      pointerDownPosRef.current = { x: event.clientX, y: event.clientY };
      // Блокируем дефолтное открытие Radix на pointerdown, чтобы жесты скролла
      // (например, Swiper) не раскрывали меню. Открываем руками в onClick.
      event.preventDefault();
    },
    onClick: (event: React.MouseEvent) => {
      const start = pointerDownPosRef.current;

      pointerDownPosRef.current = null;

      if (start) {
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
          event.preventDefault();
          return;
        }
      }

      // start === null — клавиатурный клик (Enter/Space), открываем как обычно.
      setOpen((prev) => !prev);
    },
  } as Partial<ComponentProps<"button">>);

  return (
    <DropdownMenu modal={modal} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent
        {...contentProps}
        onPointerDownOutside={(event) => {
          // Клик по триггеру при открытом меню иначе закроет меню на pointerdown,
          // а затем onClick триггера снова откроет. Гасим внешнее закрытие —
          // собственный onClick триггера затем корректно тоглит состояние.
          const target = event.detail.originalEvent.target;
          if (
            target instanceof Element &&
            target.closest(`[${TRIGGER_DATA_ATTR}]`)
          ) {
            event.preventDefault();
          }
        }}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
