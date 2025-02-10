import { AdCOM } from "iab-adcom";
import type { Bid } from "iab-openrtb/v26";

export type Ad = AdCOM.Media.Ad;

export interface IRenderer {
  render(ad: Partial<Ad>): Promise<void>;
}

export interface CreativeConverter {
  convert(bid: Bid): Partial<Ad>;
}