import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";

export const metadata = {
  title: "Public | Next.js Kit",
  description: "The fastest way to build apps with Next.js and Supabase.",
  keywords: "next.js, supabase, starter kit",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-full h-fit min-h-screen flex flex-col gap-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
