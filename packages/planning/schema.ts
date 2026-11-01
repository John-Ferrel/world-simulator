import { z } from 'zod';
export const StepSchema = z
  .object({
    action: z.enum([
      'practice',
      'seek_work',
      'care',
      'socialize',
      'relocate',
      'organize',
      'petition',
      'research',
      'publish',
      'aid',
      'project',
      'faith',
      'campaign',
      'negotiate',
    ]),
    targetId: z
      .string()
      .max(100)
      .regex(/^[^\u0000]*$/u)
      .optional(),
    traditionId: z
      .string()
      .regex(/^faith:[a-z0-9][a-z0-9_-]{0,47}$/)
      .optional(),
    label: z
      .string()
      .min(1)
      .max(160)
      .regex(/^[^\u0000]*$/u),
    months: z.number().int().min(1).max(24).default(1),
    domain: z.enum(['craft', 'science', 'culture', 'medicine', 'civic', 'commerce']).optional(),
    ideology: z
      .enum(['liberal', 'conservative', 'socialist', 'nationalist', 'religious'])
      .optional(),
    institution: z.enum(['guild', 'academy', 'council']).optional(),
  })
  .strict()
  .superRefine((step, ctx) => {
    if (step.action === 'campaign' && !step.ideology)
      ctx.addIssue({
        code: 'custom',
        path: ['ideology'],
        message: '政治活动必须声明主张，不能默认政治立场',
      });
  });
export const AgendaDefinitionSchema = z
  .object({
    intention: z
      .string()
      .min(1)
      .max(300)
      .regex(/^[^\u0000]*$/u),
    rationale: z
      .string()
      .max(600)
      .regex(/^[^\u0000]*$/u),
    steps: z.array(StepSchema).min(1).max(12),
  })
  .strict();
export const AgendaProposalSchema = AgendaDefinitionSchema.extend({
  version: z.literal(1),
  jobId: z.string().max(100),
  actorId: z.string().max(100),
  actorVersion: z.number().int().nonnegative(),
  deadline: z.number().int().nonnegative(),
  evidenceIds: z.array(z.string().max(120)).min(1).max(12),
}).strict();
export type AgendaDefinition = z.infer<typeof AgendaDefinitionSchema>;
export type AgendaProposal = z.infer<typeof AgendaProposalSchema>;
