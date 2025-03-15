import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Rubik } from 'next/font/google';

import "./globals.css";
import ContextProvider from "@/providers/contextProvider";

export const metadata: Metadata = {
  title: "Enix Assistent",
  description:
    "Enix Assistant — aqlli va tez yordamchi, salqin vibe bilan. Savollarga javob beradi, vazifalarga yordam beradi va hayotni osonlashtiradi. 🚀",
};
const rubik = Rubik({ subsets: ['latin', 'cyrillic'], weight: ['400', '700'] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Ensure it's always a Promise
}) {
  const resolvedParams = await params; // Await the promise here
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as "uz" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ContextProvider>
      <html lang={locale} className={rubik.className}>
        <head>
          <link rel="icon" href="/favicon.png" sizes="any" />
          <title>Enix AI Assistent</title>
        </head>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ContextProvider>
  );
}
