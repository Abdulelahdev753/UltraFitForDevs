import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  date?: string;
}

export interface Faq1Props {
  badge?: string;
  title: React.ReactNode;
  faqs: FaqItem[];
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

export function Faq1({
  badge,
  title,
  faqs,

  className,
}: Faq1Props) {
  return (
    <section className={cn('w-full bg-black px-4 py-16 md:py-24', className)}>
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-12 flex flex-col items-center text-center">
          {badge && (
            <span className="mb-6 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
              {badge}
            </span>
          )}
          <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl md:leading-tight">
            {title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-lg border border-white/[0.06] bg-[#1a1a1a] px-6 transition-colors hover:bg-[#212121]"
            >
              <AccordionTrigger className="group flex items-center py-6 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
                <span className="pr-4 text-left text-base font-medium text-white md:text-lg">
                  {faq.question}
                </span>
                <div className="relative ml-auto flex size-4 shrink-0 items-center justify-center text-zinc-400">
                  <FaPlus className="absolute h-4 w-4 transition-all duration-300 ease-out group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                  <FaMinus className="absolute h-4 w-4 -rotate-90 opacity-0 transition-all duration-300 ease-out group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-6">
                <p className="text-sm leading-relaxed text-[#80db18] md:text-base">
                  {faq.answer}
                </p>
                {faq.date && (
                  <div className="mt-4 text-sm font-medium text-zinc-500">
                    {faq.date}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
