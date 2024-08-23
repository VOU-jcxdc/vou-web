import Logo from "/assets/logo.png";
export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-6 bg-primary/5 p-8 text-center text-xs xl:mb-8 xl:h-fit sm:px-4">
      <img src={Logo} className="h-10 w-fit" />
      <p className="mx-auto max-w-[80%] text-justify sm:max-w-full">
        &copy; 2024 JCXDC group. All rights reserved.
      </p>
    </footer>
  );
}
