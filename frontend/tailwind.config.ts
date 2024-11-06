import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
	content: [
		"./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
		"../**/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'"Inter"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: {
							DEFAULT: "#fafafa",
						},
						primary: {
							DEFAULT: "#f2b808",
							foreground: "#000000",
						},
					},
				},
				dark: {
					colors: {
						primary: {
							DEFAULT: "#ffffff",
							foreground: "#000000",
						},
					},
				},
			},
		}),
	],
} satisfies Config;
