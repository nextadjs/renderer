import { AdCOM } from "iab-adcom";
import type { Bid } from "iab-openrtb/v26";

export type Ad = AdCOM.Media.Ad;

export interface IRenderer {
  render(target: HTMLDivElement, ad: Partial<Ad>): Promise<void>;
  renderNative(target: HTMLDivElement, ad: Partial<Ad>, adTemplate: string): Promise<void>;
  fromOpenRTB2Bid(bid: Bid): Ad;
}

export interface CreativeConverter {
  convert(bid: Bid): Partial<Ad>;
}

export interface IViewableTracker {
  trackViewable(targetElement: HTMLDivElement, callback: () => void): void;
  trackViewableLost(targetElement: HTMLDivElement, callback: () => void): void;
  trackViewableMrc50(targetElement: HTMLDivElement, callback: () => void): void;
  trackViewableMrc100(
    targetElement: HTMLDivElement,
    callback: () => void
  ): void;
}