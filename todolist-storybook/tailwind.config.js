import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const tailwindConfig = {
  content: [
    join(__dirname, 'public/styles/**/*.css'),
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '.storybook/**/*.{js,ts,jsx,tsx}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;