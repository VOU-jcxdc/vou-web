export default function Footer() {
  return (
    <footer className="w-full h-72 xl:h-fit xl:mb-8 border-t border-t-foreground/10 p-8 sm:px-4 flex flex-col justify-center text-center gap-6 text-xs">
      <div className="flex justify-center items-center text-xl font-semibold">
        Logo placed here
      </div>

      <p className="max-w-[80%] sm:max-w-full mx-auto text-justify">
        Introducing our versatile Next.js web project template! Our Next.js web
        project template is designed to streamline the development process for
        your web projects. Built on top of Next.js, a powerful React framework,
        our template provides a solid foundation for creating modern and
        scalable web applications. Here are some key features of our template:
        1. Next.js Framework: Benefit from the capabilities of Next.js,
        including server-side rendering, automatic code splitting, and easy
        routing, to build fast and SEO-friendly web applications. 2. React
        Components: Leverage the power of React to create reusable UI
        components, making your codebase more modular and maintainable.
      </p>
    </footer>
  );
}
