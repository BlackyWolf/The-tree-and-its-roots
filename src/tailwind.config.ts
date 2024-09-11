import { type Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
    content: [
        "{routes,islands,components}/**/*.{ts,tsx}",
    ],
    plugins: [
        forms
    ],
    theme: {
        extend: {
            fontFamily: {
                cursive: ["cursive"]
            },
            gridColumn: {
                'span-13': 'span 13 / span 13',
                'span-14': 'span 14 / span 14',
                'span-15': 'span 15 / span 15',
                'span-16': 'span 16 / span 16',
            },
            gridTemplateColumns: {
                13: "repeat(13, minmax(0, 1fr))",
                14: "repeat(14, minmax(0, 1fr))",
                15: "repeat(15, minmax(0, 1fr))",
                16: "repeat(16, minmax(0, 1fr))",
            }
        }
    }
} satisfies Config;
