import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css", // 올바른 glob 패턴
  ],
  theme: {
    extend: {
      animation:{
        "spin-slow": "spin 20s linear infinite",
        "spin-slow-medium": "spin 22s linear infinite",
        "spin-slow-reverse": "spin 25s linear infinite reverse",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        brand: {
          light: "#96b23c",
          DEFAULT: "#96b23c",
          dark: "#638d3e",
        },
        // ✅ 스플래시 스크린 색상 추가
        splash: {
          background: "#e8f3d6", // 연한 초록색 배경
          text: "#638d3e", // 진한 초록색 텍스트
          accent: "#4a6d2e", // 보조 초록색
        },
        chat: {
          primary: {
            DEFAULT: "#96b23c",
            foreground: "hsl(var(--primary-foreground))",
            light: "#a6c24c",
            dark: "#638d3e",
          },
          secondary: {
            DEFAULT: "#f0f4e6",
            foreground: "#4a5568",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
