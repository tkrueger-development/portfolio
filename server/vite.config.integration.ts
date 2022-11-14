import { defineConfig } from 'vitest/config';


const config = defineConfig({
  test: {
    include: ['./src/**/__test__/*.spec.ts'],
  },
});

export default config;