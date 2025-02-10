import { OpenRTBBidConverter } from "./openrtb-bid-converter";
import { DisplayRenderer, type DisplayAd } from "./renderer/display";
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
}
