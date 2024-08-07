import Template from "@app/(main)/template";
import Footer from "@components/Layout/Footer/Footer";
import { redirect } from "next/navigation";

import Header from "@/components/organisms/header";

export default async function Home() {
  redirect("/users");
  return (
    <>
      <Header />
      <Template>
        <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in"></main>
      </Template>
      <Footer />
    </>
  );
}
