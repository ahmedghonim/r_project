import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import ScrollTop from "@/components/layout/footer/scroll-top";

const fontSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(
  {
    params: { lang },
  }: {
    params: { lang: string };
  },
  cookieLang: string | undefined
): Promise<Metadata> {
  return {
    title: {
      template: `TrateMeta | %s`,
      default: "TrateMeta",
    },
    description: "description",
    keywords: "keywords",
    authors: [{ name: "TrateMeta" }],
    applicationName: "TrateMeta",
    metadataBase: new URL("https://www.TrateMeta.com"),
    alternates: {
      canonical: "en",
      languages: {
        en: "/en",
        "en-US": "/en",
        "en-au": "/en",
        "en-bz": "/en",
        "en-ca": "/en",
        "en-ie": "/en",
        "en-jm": "/en",
        "en-nz": "/en",
        "en-za": "/en",
        "en-tt": "/en",
        "en-gb": "/en",
        "en-us": "/en",
      },
    },

    openGraph: {
      type: "website",
      title: "TrateMeta",
      url: "https://www.TrateMeta.com",
      siteName: "TrateMeta",
      images: [
        {
          url: "/public/favicon.ico",
          width: 800,
          height: 600,
          alt: "TrateMeta",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Nav />
        <main className="relative  layoutPadding overflow-x-hidden">
          <div className="fixed w-[479.365px] h-[507.308px] rotate-[12.185deg] bg-[#48647D3D] blur-[150px] left-10 top-10 -translate-x-1/2  rounded-[507.308px]" />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}