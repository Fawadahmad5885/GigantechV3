/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: false,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#03466E",
        secondaryColor: "#4595A0",
        tertiaryColor: "#ffc4b2",
        backgroundColor: "#d2eaeb",
        tertiary2Color: "#54b2f5",
        textColor: "#2E2E2E",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.textColor"),
              fontSize: theme("fontSize.3xl"),
              fontWeight: theme("fontWeight.medium"),
              lineHeight: theme("lineHeight.tight"),
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.2"),
            },
            h2: {
              color: theme("colors.textColor"),
              fontSize: theme("fontSize.3xl"),
              fontWeight: theme("fontWeight.semibold"),
              lineHeight: theme("lineHeight.tight"),
              marginTop: theme("spacing.3"),
              marginBottom: theme("spacing.1"),
            },
            h3: {
              color: theme("colors.textColor"),
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.semibold"),
              lineHeight: theme("lineHeight.tight"),
              marginTop: theme("spacing.3"),
              marginBottom: theme("spacing.1"),
            },
            p: {
              color: theme("colors.gray.700"),
              fontSize: theme("fontSize.lg"),
              // lineHeight: theme("lineHeight.relaxed"),
              marginTop: theme("spacing.2"),
              marginBottom: theme("spacing.2"),
            },
            ul: {
              marginTop: theme("spacing.2"),
              marginBottom: theme("spacing.2"),
              paddingLeft: theme("spacing.5"),
            },
            "ul > li": {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            strong: {
              color: theme("colors.textColor"),
            },
            a: {
              color: theme("colors.primaryColor"),
              "&:hover": {
                color: theme("colors.secondaryColor"),
              },
            },
          },
        },
      }),
      keyframes: {
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" }, // change 1.2 to limit
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-loop": "rotate 10s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
