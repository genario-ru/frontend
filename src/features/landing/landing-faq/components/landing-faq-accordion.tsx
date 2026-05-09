import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

import { landingFaqAccordionItems } from "../constants/landing-faq-accordion-items";

export function LandingFaqAccordionItems() {
  return (
    <Accordion multiple className="w-full">
      {landingFaqAccordionItems.map((item, index) => (
        <AccordionItem key={`landing-faq-accordion-item-${index}`}>
          <AccordionTrigger className="items-start text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
