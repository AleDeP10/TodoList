module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/styles/**/*.css"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  safelist: [
    // Layout & Flex
    "flex",
    "inline-flex",
    "flex-col",
    "flex-wrap-reverse",
    "items-center",
    "justify-center",
    "justify-between",
    "gap-1",
    "gap-2",
    "gap-3",
    "gap-x-2",

    // Spacing
    "p-1",
    "p-2",
    "p-6",
    "px-2",
    "px-3",
    "px-4",
    "px-6",
    "py-1",
    "py-2",
    "py-4",
    "py-6",

    // Typography
    "text-sm",
    "text-xs",
    "text-lg",
    "font-semibold",
    "text-left",
    "text-center",
    "select-none",

    // Borders & Radius
    "border",
    "border-b",
    "border-t",
    "border-red-500",
    "border-gray-300",
    "border-[var(--fg)]",
    "rounded",
    "rounded-full",
    "rounded-lg",

    // Background & Color
    "bg-transparent",
    "bg-white",
    "bg-black/40",
    "bg-blue-600",
    "bg-gray-300",
    "bg-red-600",
    "bg-red-700",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-[var(--bg)]",
    "bg-[var(--menu-bg)]",
    "bg-[var(--modal-bg)]",
    "bg-gradient-to-r",
    "from-[var(--navbar-start)]",
    "to-[var(--navbar-end)]",
    "!bg-white", 
    "text-[var(--fg)]",
    "text-[var(--menu-fg)]",
    "text-[var(--navbar-fg)]",
    "text-white",
    "text-red-500",
    "text-yellow-400",
    "!text-black",
    
    // Effects & Transitions
    "transition",
    "transition-colors",
    "transition-transform",
    "hover:brightness-110",
    "hover:[filter:brightness(90%)]",
    "hover:cursor-pointer",
    "hover:bg-[var(--menu-hover-bg)]",
    "hover:bg-blue-700",
    "hover:bg-gray-400",
    "hover:bg-red-700",
    "animate-spin",

    // Positioning
    "relative",
    "absolute",
    "fixed",
    "top-0.5",
    "top-full",
    "left-0",
    "inset-0",
    "z-50",

    // Sizing
    "w-full",
    "w-10",
    "w-4",
    "max-w-lg",
    "h-5",
    "h-4",
    "min-w-[140px]",

    // Ring & Focus
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-1",
    "focus:ring-[var(--fg)]",

    // Shadow
    "shadow-md",
    "shadow-lg",

    // Backdrop
    "backdrop-blur-md",

    // Translate
    "translate-x-5",

    // Accessibility
    "sr-only",
  ],
};
