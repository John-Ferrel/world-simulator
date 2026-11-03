export { PHASE3_FAMILY_BRIEFS } from './phase3-briefs.js';
export { PHASE4_FAMILY_BRIEFS } from './phase4-briefs.js';
export { PHASE7_FAMILY_BRIEFS } from './phase7-briefs.js';
export { PHASE8_TASK_BRIEFS } from './phase8-briefs.js';
export type { GeneratedPack } from '../generated.js';
export {
  PHASE2_FAMILY_BRIEFS,
  briefById,
  type ContentFamilyBrief,
  type ContentNodeBrief,
} from './briefs.js';
export {
  auditPacks,
  summarizeAudit,
  LIFE_STAGES,
  TARGET_TAGS,
  REQUIRED_STAGE_TAGS,
  type PackCoverageReport,
  type ExistingAuditSummary,
} from './coverage.js';
export {
  generatePack,
  writeGeneratedPack,
  describeBrief,
  type GeneratePackOptions,
  type GenerationBrief,
  type PackAttempt,
  type PackGenerationResult,
} from './generate.js';
export {
  validateAuthoredPack,
  KNOWN_RESIDENCE_IDS,
  type AuthoredValidation,
  type AuthoredValidationOptions,
} from './strict.js';

export { macroContentGaps, type MacroContentGap } from './macro-gap.js';
