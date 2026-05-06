// Dynamically import all images from assets folder
const modules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", { eager: true });

export const imageMap: Record<string, string> = {};

for (const path in modules) {
  const match = path.match(/\/([^/]+)\.\w+$/);
  if (match) {
    const filename = match[1];
    const module: any = modules[path];
    imageMap[filename] = module.default || module;
  }
}

if (typeof window !== "undefined") {
  (window as any).__imageMap = imageMap;
}

/**
 * Gets the main image by matching the package slug.
 * Example: kerala.jpg -> slug: kerala
 */
export function getImageBySlug(slug: string): string | undefined {
  if (!slug) return undefined;
  
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Explicit mapping for slight filename variations
  if (normalizedSlug === "pondicherry") {
    return imageMap["pondichery"] || imageMap["pondicherry"];
  }
  
  // Check the normalized key first
  if (imageMap[normalizedSlug]) {
    return imageMap[normalizedSlug];
  }
  
  // Try directly checking the keys in case of exact match
  return imageMap[slug];
}

/**
 * Helper function to load multiple gallery images per state.
 * For example: if slug is 'kerala', looks for kl1, kl2, kl3... in imageMap.
 */
export function getImagesByStatePrefix(slug: string): string[] {
  if (!slug) return [];

  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  let searchPrefix = normalizedSlug;
  if (normalizedSlug === "tamilnadu" || normalizedSlug === "tamil-nadu") searchPrefix = "tn";
  if (normalizedSlug === "kerala") searchPrefix = "kl";
  if (normalizedSlug === "karnataka") searchPrefix = "kr";
  if (normalizedSlug === "andhrapradesh" || normalizedSlug === "andhra-pradesh") searchPrefix = "ap";
  if (normalizedSlug === "pondicherry" || normalizedSlug === "pondichery") searchPrefix = "pd";

  const matches: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const key = `${searchPrefix}${i}`;
    if (imageMap[key]) {
      matches.push(imageMap[key]);
    }
  }
  return matches;
}
