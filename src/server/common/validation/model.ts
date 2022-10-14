import { ModelType } from '@prisma/client';
import { z } from 'zod';

export const imageSchema = z.object({
  name: z.string(),
  url: z.string(),
  userId: z.number(),
  prompt: z.string().optional(),
  hash: z.string().optional(),
  height: z.string().optional(),
  width: z.string().optional(),
});

export const modelVersionSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  url: z.string(),
  steps: z.number().optional(),
  epochs: z.number().optional(),
  trainingImages: z.array(imageSchema),
  exampleImages: z.array(imageSchema),
});

export const modelSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty.'),
  description: z.string().optional(),
  type: z.nativeEnum(ModelType),
  trainedWords: z.array(z.string()).min(1, 'At least one trained word is required.'),
  tags: z.array(z.string()),
  nsfw: z.boolean(),
  modelVersions: z.array(modelVersionSchema).min(1, 'At least one model version is required.'),
});
