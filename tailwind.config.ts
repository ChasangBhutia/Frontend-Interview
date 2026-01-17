import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                heading: ["Inter", "system-ui", "sans-serif"],
                body: ["Poppins", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
}

export default config
