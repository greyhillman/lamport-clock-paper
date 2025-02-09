import { defineConfig } from 'vite';
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/lamport-clock-paper",
	plugins: [],
	css: {
		postcss: {
			plugins: [
				postcssNesting,
			]
		}
	},
});
