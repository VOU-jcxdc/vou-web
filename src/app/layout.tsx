import "@app/styles/globals.css";

import ThemeProvider from "@components/Providers/ThemeProvider";

import ReactQueryProvider from "@/components/Providers/react-query.provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "vOU",
  description: "The fastest way to build apps with Next.js and Supabase.",
  keywords: "next.js, supabase, starter kit",
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
            <main className="mx-auto flex min-h-screen w-screen max-w-[2200px] flex-col items-center">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
