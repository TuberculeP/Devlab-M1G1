import '@/style/components/pages/Home.scss';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LightAndDarkModeContext } from '@/context/lightAndDarkMode';
import { useContext } from 'react';

export const HomePage = () => {

    const { isDark } = useContext(LightAndDarkModeContext)!;

    return (
        <>
            <div className="home-page-hero h-dvh w-full flex flex-col items-center justify-center bg-gray-100">
                <div className='filter-home-hero'>
                    <div className='container-title-home-hero'>
                        <h1 className="text-4xl mb-4 font-bold">Le reconditionnement c&apos;est bien</h1>
                        <a href='#en-savoir-plus'><Button className="mt-4">En savoir plus</Button></a>
                    </div>
                </div>
            </div>
            <div id='en-savoir-plus' className="h-dvh p-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
                <div className="w-full h-full sm:w-5/12 flex flex-col items-start justify-center p-8 border-2 rounded-lg">
                    <h2 className={`${isDark ? "text-white" : ""} text-4xl mb-4 font-bold`}>Déposez vos appareils électroniques facilement, dans un de nos points de collecte !</h2>
                    <div className={`${isDark ? "text-white" : ""} text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl`}>
                        Grâce à nos nombreux points de collecte, il n&apos;a jamais été aussi simple de donner une seconde vie à vos appareils électroniques,
                        tout en contribuant à la protection de l&apos;environnement. Déposez-les près de chez vous et participez à un geste responsable et durable !
                    </div>
                </div>
                <div className="w-full h-full sm:w-7/12 bg-home-page-section-1 rounded-lg">
                </div>
            </div>
            <div className="h-dvh w-dvw flex flex-col justify-center items-center sm:flex-row gap-8 p-8">
                <div className="w-full h-full sm:w-5/12 flex justify-center items-center rounded-lg bg-home-page-section-2">
                </div>
                <div className="w-full h-full sm:w-7/12 flex flex-col items-start justify-center p-8 border-2 rounded-lg">
                    <h2 className={`${isDark ? "text-white" : ""} text-4xl mb-4 font-bold`}>Votre appareil est cassé ? Trouvez un réparateur rapidement !</h2>
                    <div className={`${isDark ? "text-white" : ""} text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl`}>
                        Ne laissez pas un appareil cassé vous freiner ! Trouvez un réparateur près de chez vous en quelques
                        clics et donnez une nouvelle vie à votre matériel électronique.
                    </div>
                </div>
            </div>
            <div className="h-dvh w-dvw p-8 flex justify-center items-center">
                <div className="w-full h-2/3 border-2 p-8 flex flex-col justify-around items-center gap-8">
                    <h2 className={`${isDark ? "text-white" : ""} text-4xl font-bold`}>Questions générales</h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className={`${isDark ? "text-white" : ""}`}>
                                Qu&apos;est-ce que le reconditionnement d&apos;ordinateurs ?
                            </AccordionTrigger>
                            <AccordionContent className={`${isDark ? "text-white" : ""}`}>
                                Le reconditionnement d&apos;ordinateurs est un processus par lequel des ordinateurs usagés,
                                défectueux ou obsolètes sont réparés, remis à niveau, et testés pour leur donner une seconde vie.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className={`${isDark ? "text-white" : ""}`}>
                                Pourquoi devrais-je acheter un ordinateur reconditionné plutôt
                                qu&apos;un neuf ?
                            </AccordionTrigger>
                            <AccordionContent className={`${isDark ? "text-white" : ""}`}>
                                Acheter un ordinateur reconditionné plutôt qu&apos;un neuf présente des avantages
                                économiques, écologiques et pratiques.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className={`${isDark ? "text-white" : ""}`}>
                                Quelle est la différence entre un ordinateur reconditionné et un
                                ordinateur d&apos;occasion ?
                            </AccordionTrigger>
                            <AccordionContent className={`${isDark ? "text-white" : ""}`}>
                                Un ordinateur reconditionné est testé, réparé, et remis à neuf pour garantir son bon
                                fonctionnement, souvent accompagné d&apos;une garantie. En revanche, un ordinateur d&apos;occasion est
                                vendu tel quel, sans vérifications ni réparations, et généralement sans garantie.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    );
}