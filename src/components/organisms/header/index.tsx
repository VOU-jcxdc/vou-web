import Dropdown from "@components/organisms/header/Dropdown";
import NavBar from "@components/organisms/header/NavBar";
import PrimaryLogo from "@components/PrimaryLogo";
import ThemeButton from "@components/Theme/ThemeButton";

export default function Header() {
  return (
    <div className="flex h-20 w-full flex-row justify-around gap-3 px-20 bg-slate-50 border border-b-1 border-slate-200 xl:justify-between sm:px-4 ">
      <div className="mr-4 flex items-center">
        <PrimaryLogo />
      </div>
      <nav className="flex w-full max-w-[1300px] flex-row items-center justify-around gap-6">
        <NavBar />
      </nav>
      <div className="flex items-center gap-2">
        <ThemeButton />
        <Dropdown />
      </div>
    </div>
  );
}
