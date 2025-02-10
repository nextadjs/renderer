import { OpenRTBBidConverter } from "./openrtb-bid-converter";
import { DisplayRenderer, type DisplayAd } from "./renderer/display";
import { NativeRenderer, type NativeAd } from "./renderer/native";
import type { Ad, IRenderer } from "./types";
import type { Bid } from "iab-openrtb/v26";

export class Renderer implements IRenderer {
  private openrtbBidConverter: OpenRTBBidConverter;

  public constructor() {
    this.openrtbBidConverter = new OpenRTBBidConverter();
  }

  public async render(target: HTMLDivElement, ad: Partial<Ad>) {
    if (this.isDisplayAd(ad)) {
      const displayRenderer = new DisplayRenderer();
      displayRenderer.render(target, ad);
    }
  }

  public async renderNative(
    target: HTMLDivElement,
    ad: Partial<Ad>,
    adTemplate: string
  ) {
    if (this.isNativeAd(ad)) {
      const nativeRenderer = new NativeRenderer();
      // TODO: callbackの条件分岐
      nativeRenderer.renderByAdTemplate(target, ad, adTemplate);
    }
  }

  public fromOpenRTB2Bid(bid: Bid): Ad {
    return this.openrtbBidConverter.fromBid(bid);
  }

  private isDisplayAd(ad: Partial<Ad>): ad is DisplayAd {
    return !!(
      ad.display &&
      typeof ad.display.adm === "string" &&
      !ad.display.native &&
      !ad.display.banner
    );
  }

  private isNativeAd(ad: Partial<Ad>): ad is NativeAd {
    return !!(ad.display && ad.display.native && !ad.display.banner);
  }
}
