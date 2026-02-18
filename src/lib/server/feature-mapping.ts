/**
 * Feature IDs in wizard-config.ts now directly match Hygraph enum values.
 * These functions are kept as no-ops for backward compatibility but do nothing.
 *
 * @deprecated No mapping required — feature IDs already match Hygraph enum values.
 */

/** @deprecated IDs already match Hygraph enum values — pass-through only */
export function mapFeaturesToHygraph(features: string[]): string[] {
  return features;
}

/** @deprecated IDs already match Hygraph enum values — pass-through only */
export function mapFeaturesFromHygraph(features: string[]): string[] {
  return features;
}
