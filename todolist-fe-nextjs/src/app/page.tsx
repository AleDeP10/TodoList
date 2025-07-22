"use client";

import Image from "next/image";
import NavBar from "@/components/ui/NavBar";
import { MenuIcons } from "@/lib/icons/Icons";
import MenuItem from "@/components/ui/MenuItem";
import MainContainer from "@/components/MainContainer";

const menuItems = {
  Functionalities: [
    {
      label: "Tasks",
      icon: MenuIcons.tasks,
      onClick: () => console.log("Tasks clicked"),
    },
    {
      label: "Users",
      icon: MenuIcons.users,
      onClick: () => console.log("Users clicked"),
    },
  ],
  About: [
    {
      label: "The author",
      icon: MenuIcons.author,
      onClick: () => console.log("About clicked"),
    },
    { label: "Portfolio", icon: MenuIcons.portfolio, href: "/portfolio" },
  ],
};

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-16">
      <MainContainer>
        {/* <NavBar menuItems={menuItems}>
          <div className="p-6">
            <h1 className="text-xl font-bold">Benvenuto</h1>
          </div>
        </NavBar> */}
      </MainContainer>

      <main className="flex flex-col gap-[32px] items-center sm:items-start px-6 sm:px-20">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            aria-hidden
          />
          Learn
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            aria-hidden
          />
          Examples
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            aria-hidden
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
