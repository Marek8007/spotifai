/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.tsx",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./presentation/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Paleta Spotify
                spotify: {
                    green: "#1DB954",
                    "green-dark": "#158a3e",
                    black: "#121212",
                    "dark-gray": "#181818",
                    "medium-gray": "#282828",
                    "light-gray": "#535353",
                    white: "#FFFFFF",
                    "off-white": "#B3B3B3",
                },
            },
            fontFamily: {
                "circular-bold": ["CircularStd-Bold"],
                "circular-medium": ["CircularStd-Medium"],
                "circular-book": ["CircularStd-Book"],
            },
        },
    },
    plugins: [],
};
