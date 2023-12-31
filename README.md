## Installation

Create the SolidJs project

```sh
npm create vite@latest sotac -- --template solid-ts

cd sotac
npm install
npm run dev
```

Install the tailwind npm packages:

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Added to file: `tailwind.config.js

```json
  content: [
    "./src/**/*.{ts,tsx}"
  ],
```

Added css file: `./src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
