import type { ComponentProps } from "react";
import Markdown from "react-markdown";

import { Heading, type HeadingProps } from "@/shared/components/ui/heading";
import {
  Separator,
  type SeparatorProps,
} from "@/shared/components/ui/separator";

type ScenarioChapterSceneComponentMarkdownProps = {
  content: string;
};

const ALLOWED_ELEMENTS = [
  "h4",
  "h5",
  "h6",
  "p",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
];

export function ScenarioChapterSceneComponentMarkdown({
  content,
}: ScenarioChapterSceneComponentMarkdownProps) {
  return (
    <Markdown
      allowedElements={ALLOWED_ELEMENTS}
      components={{
        p: ScenarioChapterSceneComponentMarkdownP,
        h4: ScenarioChapterSceneComponentMarkdownH4,
        h5: ScenarioChapterSceneComponentMarkdownH5,
        h6: ScenarioChapterSceneComponentMarkdownH6,
        ul: ScenarioChapterSceneComponentMarkdownUl,
        ol: ScenarioChapterSceneComponentMarkdownOl,
        li: ScenarioChapterSceneComponentMarkdownLi,
        blockquote: ScenarioChapterSceneComponentMarkdownBlockquote,
        hr: ScenarioChapterSceneComponentMarkdownHr,
      }}
    >
      {content}
    </Markdown>
  );
}

function ScenarioChapterSceneComponentMarkdownH4(props: HeadingProps) {
  return (
    <Heading
      variant="h4"
      as="h4"
      className="my-2 font-medium first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownH5(props: HeadingProps) {
  return (
    <Heading
      variant="h4"
      as="h5"
      className="my-2 font-medium first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownH6(props: HeadingProps) {
  return (
    <Heading
      variant="h4"
      as="h6"
      className="my-2 font-medium first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownP(props: ComponentProps<"p">) {
  return <p className="my-2 first:mt-0 last:mb-0" {...props} />;
}

function ScenarioChapterSceneComponentMarkdownUl(props: ComponentProps<"ul">) {
  return (
    <ul
      className="my-3 list-inside list-disc first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownOl(props: ComponentProps<"ol">) {
  return (
    <ol
      className="my-3 list-inside list-decimal first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownLi(props: ComponentProps<"li">) {
  return <li className="my-1 first:mt-0 last:mb-0" {...props} />;
}

function ScenarioChapterSceneComponentMarkdownBlockquote(
  props: ComponentProps<"blockquote">,
) {
  return (
    <blockquote
      className="border-neutral-6 text-neutral-7 my-3 border-l-2 pl-2 italic first:mt-0 last:mb-0"
      {...props}
    />
  );
}

function ScenarioChapterSceneComponentMarkdownHr(props: SeparatorProps) {
  return <Separator className="my-4 first:mt-0 last:mb-0" {...props} />;
}
