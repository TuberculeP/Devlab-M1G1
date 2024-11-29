import '@/style/components/pages/Home.scss';
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export const HomePage = () => {
    return (
        <>
            <div className="h-dvh w-full p-8 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-4xl mb-4 font-bold">TITRE</h1>
                <p>SOUS TITRE</p>
                <Button className="mt-4">Click here</Button>
            </div>
            <div className="h-dvh p-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
                <div className="w-full h-full sm:w-5/12 flex flex-col items-start justify-center p-8 border-2">
                    <h2 className="text-4xl mb-4 font-bold">TITRE</h2>
                    <div className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">
                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
                        was born and I will give you a complete account of the system, and expound the actual teachings
                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,
                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know
                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again
                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
                        but because occasionally circumstances occur in which toil and pain can procure him some great
                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,
                        except to obtain some advantage from it?
                    </div>
                </div>
                <div className="w-full h-full sm:w-7/12 bg-black">

                </div>
            </div>
            <div className="h-dvh w-dvw flex flex-col justify-center items-center sm:flex-row gap-8 p-8">
                <div className="w-full h-full sm:w-5/12 border-2 flex justify-center items-center">
                    <ul className="w-full px-16 flex justify-center items-center gap-8 text-md md:text-lg lg:text-xl xl:text-2xl lg:gap-24">
                        <ul className="flex flex-col gap-1 lg:gap-8">
                            <li><span>*</span>Test</li>
                            <li><span>*</span>Test</li>
                            <li><span>*</span>Test</li>
                        </ul>
                        <ul className="flex flex-col gap-1 lg:gap-8">
                            <li><span>*</span>Test</li>
                            <li><span>*</span>Test</li>
                            <li><span>*</span>Test</li>
                        </ul>
                    </ul>
                </div>
                <div className="w-full h-full sm:w-7/12 flex flex-col items-start justify-center p-8 border-2">
                    <h2 className="text-4xl mb-4 font-bold">TITRE</h2>
                    <div className="text-xs sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
                        was born and I will give you a complete account of the system, and expound the actual teachings
                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,
                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know
                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again
                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
                        but because occasionally circumstances occur in which toil and pain can procure him some great
                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,
                        except to obtain some advantage from it? But who has any right to find fault with a man who
                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that
                        produces no resultant pleasure?
                    </div>
                </div>
            </div>
            <div className="h-dvh w-dvw p-8 flex justify-center items-center">
                <div className="w-full h-2/3 border-2 p-8 flex flex-col justify-around items-center gap-8">
                    <h2 className="text-4xl font-bold">TITRE</h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="md:text-2xl">Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="md:text-2xl">Is it styled?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It comes with default styles that matches the other
                                components&apos; aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="md:text-2xl">Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It&apos;s animated by default, but you can disable it if you
                                prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button className="text-lg" size="lg">Click here</Button>
                </div>
            </div>
        </>
    );
}