
import { Footer } from "@/components/layout/footer";
import { FileText } from "lucide-react";
import termsContent from "@/content/terms.json";

export default function TermsOfServicePage() {
    return (
        <>
            <div className="flex flex-col bg-background">
                <section className="w-full py-20 md:py-32 bg-accent/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                             <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-destructive dark:text-foreground">
                                {termsContent.hero.title}
                            </h1>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl">
                                Last updated: {termsContent.hero.lastUpdated}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-20 md:py-32">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-lg dark:prose-invert">
                        {termsContent.sections.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="font-headline text-2xl font-bold text-destructive dark:text-foreground">{section.title}</h2>
                                <p className="text-muted-foreground">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
