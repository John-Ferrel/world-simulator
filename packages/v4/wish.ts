import { chat } from '../model/config.js';
import {
  birthContractMessages,
  parseBirthContract,
  toLegacyWishReading,
  type BirthContract,
  type BirthContractInput,
  type LegacyWishReading,
} from './birth-contract.js';

export {
  BIRTH_CAPABILITIES,
  BIRTH_CONTRACT_BOUNDS,
  BIRTH_EVENT_TAGS,
  BIRTH_FOCI,
  BirthContractError,
  BirthContractSchema,
  CAPABILITY_PROFILES,
  birthContractMessages,
  parseBirthContract,
  toLegacyWishReading,
  validateBirthContract,
} from './birth-contract.js';
export type {
  BirthCapability,
  BirthCondition,
  BirthContract,
  BirthContractInput,
  BirthCost,
  BirthEventTag,
  BirthFocus,
  BirthLimit,
  BirthSkillDeltas,
  BirthTraitDeltas,
  LegacyBirthCapability,
  LegacyWishReading,
} from './birth-contract.js';

export type WishInput = BirthContractInput;

/** Backwards-compatible projection used by the pre-2.0 worker/store. */
export type ParsedWishReading = LegacyWishReading;

/** Parse a model reply into the legacy reading shape. */
export function parseWishReading(text: string): ParsedWishReading {
  return toLegacyWishReading(parseBirthContract(text));
}

/** Backwards-compatible prompt; now the Birth Contract 2.0 prompt. */
export function wishMessages(input: WishInput) {
  return birthContractMessages(input);
}

/**
 * Compile the untrusted birth wish into a bounded Birth Contract. The caller
 * is responsible for persisting it; this module never writes world state.
 */
export async function compileBirthContract(input: WishInput): Promise<{
  contract: BirthContract;
  model: string;
  tokens: number;
}> {
  const result = await chat(birthContractMessages(input), {
    conversation: `v4-wish:${input.name}:${input.date.year}`,
    maxTokens: 900,
    json: true,
  });
  return {
    contract: parseBirthContract(result.text),
    model: result.model,
    tokens: result.tokens,
  };
}

/**
 * Compatibility wrapper. It still returns the legacy `reading` expected by the
 * current worker, plus the full contract for the next integration step.
 */
export async function compileBirthWish(input: WishInput): Promise<{
  reading: ParsedWishReading;
  contract: BirthContract;
  model: string;
  tokens: number;
}> {
  const compiled = await compileBirthContract(input);
  return {
    reading: toLegacyWishReading(compiled.contract),
    contract: compiled.contract,
    model: compiled.model,
    tokens: compiled.tokens,
  };
}
