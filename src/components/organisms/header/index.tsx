// import ThemeButton from "@components/Theme/ThemeButton";
import Logo from "/assets/logo.png";

import Dropdown from "@/components/organisms/header/drop-down";
import NavBar from "@/components/organisms/header/nav-bar";

export default function Header() {
  return (
    <div className="border-b-1 flex h-20 w-full flex-row justify-around gap-3 border border-slate-200 bg-slate-50 px-20 xl:justify-between sm:px-4 ">
      <div className="mr-4 flex items-center">
        <img src={Logo} className="h-10 w-fit object-contain" />
      </div>
      <nav className="flex w-full max-w-[1300px] flex-row items-center justify-around gap-6">
        <NavBar />
      </nav>
      <div className="flex items-center gap-2">
        <Dropdown />
      </div>
    </div>
  );
}
