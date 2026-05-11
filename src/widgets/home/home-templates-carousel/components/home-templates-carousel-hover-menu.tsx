import { TemplateCardMenu } from "@/features/templates/template-card/components/template-card-menu";

type HomeTemplatesCarouselHoverMenuProps = {
  templateId: string;
};

export function HomeTemplatesCarouselHoverMenu({
  templateId,
}: HomeTemplatesCarouselHoverMenuProps) {
  return (
    <TemplateCardMenu
      templateId={templateId}
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
    />
  );
}
