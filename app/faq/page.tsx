"use client";

import FAQContactForm from "@/components/faq/form";
import '@/style/components/pages/Faq.scss';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useUserHook from "@/hooks/userHook";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";

export default function Faq() {
  const { loading, fetchUserData } = useUserHook();

  const { isDark } = useContext(LightAndDarkModeContext)!;

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid place-items-center min-h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div className={`${isDark ? "text-white" : ""} min-h-screen p-8 pb-20 gap-3 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col`}>
          <h1 className="text-2xl font-bold my-6">Articles</h1>
          <Link href={"/faq/reconditionnement"}>
            <div className="article-card">
              <div className="article-picture"></div>
              <p className="article-title">Comment préparer son ordinateur au reconditionnement</p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold my-6">Foire Aux Questions (FAQ)</h1>
          <div>
            Vous avez des questions ? Nous avons les réponses ! Cette section
            est là pour vous guider et répondre aux interrogations les plus
            fréquentes concernant le reconditionnement d&apos;ordinateurs, les
            points de collecte et les points de vente. Si vous ne trouvez pas ce
            que vous cherchez, n&apos;hésitez pas à nous contacter directement
            via le formulaire en bas de la page.
          </div>
          <h2 className="text-xl font-bold mt-6">Questions générales</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Qu&apos;est-ce que le reconditionnement d&apos;ordinateurs ?
              </AccordionTrigger>
              <AccordionContent>
                Le reconditionnement d&apos;ordinateurs est un processus par lequel des ordinateurs usagés,
                défectueux ou obsolètes sont réparés, remis à niveau, et testés pour leur donner une seconde vie.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Pourquoi devrais-je acheter un ordinateur reconditionné plutôt
                qu&apos;un neuf ?
              </AccordionTrigger>
              <AccordionContent>
                Acheter un ordinateur reconditionné plutôt qu&apos;un neuf présente des avantages
                économiques, écologiques et pratiques.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Quelle est la différence entre un ordinateur reconditionné et un
                ordinateur d&apos;occasion ?
              </AccordionTrigger>
              <AccordionContent>
                Un ordinateur reconditionné est testé, réparé, et remis à neuf pour garantir son bon
                fonctionnement, souvent accompagné d&apos;une garantie. En revanche, un ordinateur d&apos;occasion est
                vendu tel quel, sans vérifications ni réparations, et généralement sans garantie.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h2 className="text-xl font-bold  mt-6">Don de matériel</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Comment puis-je donner mon ordinateur pour le faire
                reconditionner ?
              </AccordionTrigger>
              <AccordionContent>
                Pour donner votre ordinateur à reconditionner, vous pouvez rejoindre un centre de collecte.
                Vous pouvez en trouver un sur ce <Link href={"/collect"}>lien</Link>.
                Assurez-vous avant cela de sauvegarder
                vos données, puis supprimez-les avant de donner l&apos;appareil.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Quels types d&apos;ordinateurs peuvent être donnés pour le
                reconditionnement ?
              </AccordionTrigger>
              <AccordionContent>
                La plupart des ordinateurs peuvent être donnés pour reconditionnement, qu&apos;ils soient portables
                ou de bureau. Ils doivent être en état réparable, même s&apos;ils sont anciens ou légèrement
                endommagés. Les appareils très obsolètes ou irréparables sont généralement recyclés.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Dois-je supprimer mes données avant de donner mon ordinateur ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, vous devez supprimer vos données avant de donner votre ordinateur.
                Sauvegardez vos fichiers importants, puis utilisez un logiciel de réinitialisation ou
                d&apos;effacement sécurisé pour protéger vos informations personnelles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Quelles sont les étapes du processus de collecte et de
                reconditionnement ?
              </AccordionTrigger>
              <AccordionContent>
                Les étapes du processus de collecte et de reconditionnement sont :
                <ul className="faq-list">
                  <li>- Collecte : Récupération des ordinateurs dans un point de collecte.</li>
                  <li>- Évaluation : Inspection pour déterminer leur état et réparabilité par Emaus Connect.</li>
                  <li>- Réparation : Remplacement ou réparation des composants défectueux.</li>
                  <li>- Mise à jour : Installation de nouveaux composants et logiciels.</li>
                  <li>- Tests : Vérification des performances et fiabilité.</li>
                  <li>- Revente ou don : Les appareils remis à neuf sont proposés avec garantie.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FAQContactForm />
        </div>
      )}
    </>
  );
}
