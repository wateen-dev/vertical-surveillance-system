import { SAPPHIRE_TILES } from './sapphire.analytics.config';
import { NAMAK_MANDI_TILES } from './namak-mandi.analytics.config';
import { AnalyticsTileConfig } from '../models/AnalyticsTileConfig';

export const COMPANY_TILE_MAP: Record<number, AnalyticsTileConfig[]> = {
  1: SAPPHIRE_TILES,
  2: NAMAK_MANDI_TILES
};
