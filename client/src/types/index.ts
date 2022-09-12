export type ImageData = {
  id?: string;
  sku?: string;
  brand?: string;
  name?: string;
  silhouette?: string;
  colorway?: string;
  gender?: string; 
  estimated_market_value?: number;
  retail_price?: number;
  original_image?: string;
  thumbnail_image?: string;
  story?: string | null;
  release_year?: string;
  release_date?: string;
} | null