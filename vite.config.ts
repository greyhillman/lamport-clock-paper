import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	css: {
		postcss: {
			plugins: [
				postcssNesting,
			]
		}
	}
});
