import { AdCOM } from "iab-adcom";
import type { Bid } from "iab-openrtb/v26";

export type Ad = AdCOM.Media.Ad;

export interface IRenderer {
  render(target: HTMLDivElement, ad: Partial<Ad>): Promise<void>;
  // renderNative(ad: Partial<Ad>, adTemplate: string): Promise<void>;
}

export interface CreativeConverter {
  convert(bid: Bid): Partial<Ad>;
}