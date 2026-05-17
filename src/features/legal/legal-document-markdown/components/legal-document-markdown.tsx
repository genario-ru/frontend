import type { ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Heading } from "@/shared/components/ui/heading";
import { Separator } from "@/shared/components/ui/separator";

import { ALLOWED_ELEMENTS } from "../constants/allowed-elements";

type LegalDocumentMarkdownProps = {
  content: string;
};

export function LegalDocumentMarkdown({ content }: LegalDocumentMarkdownProps) {
  return (
    <Markdown
      allowedElements={[...ALLOWED_ELEMENTS]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: LegalDocumentMarkdownH1,
        h2: LegalDocumentMarkdownH2,
        h3: LegalDocumentMarkdownH3,
        p: LegalDocumentMarkdownP,
        br: LegalDocumentMarkdownBr,
        ul: LegalDocumentMarkdownUl,
        ol: LegalDocumentMarkdownOl,
        li: LegalDocumentMarkdownLi,
        blockquote: LegalDocumentMarkdownBlockquote,
        hr: LegalDocumentMarkdownHr,
        table: LegalDocumentMarkdownTable,
        thead: LegalDocumentMarkdownTHead,
        tbody: LegalDocumentMarkdownTBody,
        tr: LegalDocumentMarkdownTr,
        th: LegalDocumentMarkdownTh,
        td: LegalDocumentMarkdownTd,
        a: LegalDocumentMarkdownLink,
        strong: LegalDocumentMarkdownStrong,
        em: LegalDocumentMarkdownEm,
      }}
    >
      {content}
    </Markdown>
  );
}

function LegalDocumentMarkdownP(props: ComponentProps<"p">) {
  return (
    <p
      className="text-neutral-8 my-2 text-sm leading-6 first:mt-0 last:mb-0 md:text-base"
      {...props}
    />
  );
}

function LegalDocumentMarkdownBr(props: ComponentProps<"br">) {
  return <br {...props} />;
}

function LegalDocumentMarkdownH1(props: ComponentProps<"h1">) {
  return (
    <Heading
      variant="h1"
      as="h1"
      className="my-6 text-2xl first:mt-0"
      {...props}
    />
  );
}

function LegalDocumentMarkdownH2(props: ComponentProps<"h2">) {
  return (
    <Heading variant="h2" as="h2" className="mt-4 mb-2 first:mt-0" {...props} />
  );
}

function LegalDocumentMarkdownH3(props: ComponentProps<"h3">) {
  return (
    <Heading variant="h3" as="h3" className="mt-4 mb-2 first:mt-0" {...props} />
  );
}

function LegalDocumentMarkdownUl(props: ComponentProps<"ul">) {
  return (
    <ul
      className="my-4 list-inside list-disc space-y-2 text-sm leading-6 md:text-base"
      {...props}
    />
  );
}

function LegalDocumentMarkdownOl(props: ComponentProps<"ol">) {
  return (
    <ol
      className="my-4 list-inside list-decimal space-y-2 text-sm leading-6 md:text-base"
      {...props}
    />
  );
}

function LegalDocumentMarkdownLi(props: ComponentProps<"li">) {
  return <li {...props} />;
}

function LegalDocumentMarkdownBlockquote(props: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className="border-neutral-4 my-4 border-l-2 pl-4 text-sm leading-6 md:text-base [&_p]:my-0"
      {...props}
    />
  );
}

function LegalDocumentMarkdownHr(props: ComponentProps<typeof Separator>) {
  return <Separator className="my-4" {...props} />;
}

function LegalDocumentMarkdownTable(props: ComponentProps<"table">) {
  return (
    <div className="border-neutral-3 rounded-3 my-4 overflow-x-auto border">
      <table
        className="min-w-full border-collapse text-left text-sm md:text-base"
        {...props}
      />
    </div>
  );
}

function LegalDocumentMarkdownTHead(props: ComponentProps<"thead">) {
  return (
    <thead className="bg-neutral-2 border-neutral-3 border-b" {...props} />
  );
}

function LegalDocumentMarkdownTBody(props: ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

function LegalDocumentMarkdownTr(props: ComponentProps<"tr">) {
  return (
    <tr className="border-neutral-3 border-b last:border-b-0" {...props} />
  );
}

function LegalDocumentMarkdownTh(props: ComponentProps<"th">) {
  return (
    <th
      className="border-neutral-3 text-neutral-8 border-r px-4 py-2 font-medium last:border-r-0"
      {...props}
    />
  );
}

function LegalDocumentMarkdownTd(props: ComponentProps<"td">) {
  return (
    <td
      className="border-neutral-3 border-r px-4 py-2 align-top leading-6 last:border-r-0"
      {...props}
    />
  );
}

function LegalDocumentMarkdownLink({
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className="text-neutral-8 underline underline-offset-4 transition-opacity hover:opacity-70"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

function LegalDocumentMarkdownStrong(props: ComponentProps<"strong">) {
  return <strong className="font-semibold" {...props} />;
}

function LegalDocumentMarkdownEm(props: ComponentProps<"em">) {
  return <em {...props} />;
}
