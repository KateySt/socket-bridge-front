import daisyui from "daisyui";

const config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
};

export default config;