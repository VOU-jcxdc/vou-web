import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/organisms/header";

export const metadata = {
  title: "VOU",
  keywords: "next.js, typescript, tailwindcss, react-query, zustand",
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
