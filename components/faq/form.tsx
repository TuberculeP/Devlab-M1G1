import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const FAQContactForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = () => {
    alert("Votre message a bien été envoyé. Merci de nous avoir contactés !");
  };

  return (
    <section className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md max-w-3xl self-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Vous n&apos;avez pas trouvé la réponse à votre question ?
      </h2>
      <p className="mt-2 text-gray-600">
        Pas de souci, notre équipe est là pour vous aider ! Remplissez le
        formulaire ci-dessous, et nous vous répondrons dans les plus brefs
        délais.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Nom */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre nom</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Entrez votre email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Expliquez-nous votre problème ou votre question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton Envoyer */}
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FAQContactForm;
