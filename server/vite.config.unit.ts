import { defineConfig } from 'vitest/config';


const config = defineConfig({
  test: {
    include: ['./src/**/*.spec.ts'],
    exclude: ['**/__test__/**']
  },
});

export default config;