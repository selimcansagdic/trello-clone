import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Query } from "@tanstack/react-query";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/trello-logo.png",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <main>{children}</main>
            </ThemeProvider>
            <Toaster richColors />
            <ModalProvider />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
