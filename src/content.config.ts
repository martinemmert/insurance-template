import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sections' }),
  schema: z.object({
    label: z.string().optional(),
    title: z.string().optional(),
  }),
});

const onboarding = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/home/onboarding' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
  }),
});

export const collections = { sections, onboarding };
