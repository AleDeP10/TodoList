import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "@/lib/styles/globals.css";
import { Providers } from "./providers";
import ToastManager from "@/components/feedback/ToastManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "ToDoList - Next.js implementation",
  description:
    "Modular task management app built with Next.js, Docker, and Storybook. Designed for multi-frontend integration and scalable deployment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPrerender = typeof window === "undefined";

  return (
    <html lang="en" className="skyline">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem("theme") || "skyline";
                document.documentElement.setAttribute("data-theme", theme);
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "/styles/themes/" + theme + "-theme.css";
                link.setAttribute("data-theme", "true");
                document.head.appendChild(link);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          {!isPrerender && <ToastManager />}
        </Providers>
      </body>
    </html>
  );
}
