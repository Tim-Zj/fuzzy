import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fuzzy",
  description: "boost your work by fuzzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
