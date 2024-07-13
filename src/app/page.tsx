"use client";

import Template from "@app/(main)/template";
import Footer from "@components/Layout/Footer/Footer";
import Header from "@components/Layout/Header/Header";
import HomeSlider from "@components/Sliders/HomeSlider";

export default async function Home() {
  return (
    <>
      <Header />
      <Template>
        <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
          <div className="w-[80%]">
            <HomeSlider />
          </div>
        </main>
      </Template>
      <Footer />
    </>
  );
}
