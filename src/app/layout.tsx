import "@app/styles/globals.css";

import ThemeProvider from "@components/Providers/ThemeProvider";

import ReactQueryProvider from "@/components/Providers/react-query.provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "VOU",
  keywords: "next.js, typescript, tailwindcss, react-query, zustand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ReactQueryProvider>
          <ThemeProvider>
            <main className="flex min-h-screen w-auto max-w-[2200px] flex-col items-center">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
