import { isPositiveWholeNumber } from './validation';

export interface WarConfiguration {
  suits: number;
  ranks: number;
  players: number;
  seed?: string;
}

export const isWarConfiguration = (object: any): object is WarConfiguration =>
  typeof object === 'object' &&
  Object.keys(object).length === 4 &&
  'suits' in object &&
  'ranks' in object &&
  'players' in object;

export enum WarOptionValidationError {
  invalidSuitCount = 'Number of suits must be a positive integer.',
  invalidRankCount = 'Number of ranks must be a positive integer.',
  invalidPlayerCount = 'Number of players must be a positive integer.',
  cannotSplitDeckEvenly = 'Cannot split deck of size (suits * ranks) evenly across the desired number of players.'
}

export const validateWarConfiguration = (
  suits: number,
  ranks: number,
  playerCount: number
): WarOptionValidationError => {
  if (!isPositiveWholeNumber(suits)) {
    return WarOptionValidationError.invalidSuitCount;
  }

  if (!isPositiveWholeNumber(ranks)) {
    return WarOptionValidationError.invalidRankCount;
  }

  if (!isPositiveWholeNumber(playerCount)) {
    return WarOptionValidationError.invalidPlayerCount;
  }

  const numCards = suits * ranks;
  if (numCards % playerCount !== 0) {
    return WarOptionValidationError.cannotSplitDeckEvenly;
  }

  return null;
};
