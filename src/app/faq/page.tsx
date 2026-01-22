
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Footer } from "@/components/layout/footer";
import { HelpCircle } from "lucide-react";
import faqContent from "@/content/faq.json";

export default function FAQPage() {
    return (
        <>
            <div className="flex flex-col bg-background">
                <section className="w-full py-20 md:py-32 bg-accent/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                                <HelpCircle className="h-8 w-8" />
                            </div>
                            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-destructive dark:text-foreground">
                                {faqContent.hero.title}
                            </h1>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl">
                                {faqContent.hero.description}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-20 md:py-32">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <Accordion type="single" collapsible className="w-full">
                            {faqContent.questions.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
