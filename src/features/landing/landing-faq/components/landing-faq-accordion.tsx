import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

import { landingFaqAccordionItems } from "../constants/landing-faq-accordion-items";

export function LandingFaqAccordionItems() {
  return (
    <Accordion multiple>
      {landingFaqAccordionItems.map((item, index) => (
        <AccordionItem key={`landing-faq-accordion-item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
