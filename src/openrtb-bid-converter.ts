import { CreativeMarkupType, type Bid } from "iab-openrtb/v26";
import type { Ad, CreativeConverter } from "./types";
import { NativeConverter } from "./converters/native";
import { DisplayConverter } from "./converters/display";

export class OpenRTBBidConverter {
  private readonly creativeConverters: {
    [CreativeMarkupType.Banner]: CreativeConverter;
    [CreativeMarkupType.Native]: CreativeConverter;
  };

  constructor() {
    this.creativeConverters = {
      [CreativeMarkupType.Banner]: new DisplayConverter(),
      [CreativeMarkupType.Native]: new NativeConverter(),
    };
  }

  public fromBid(bid: Bid): Ad {
    const ad: Ad = {
      id: bid.crid || bid.id,
      adomain: bid.adomain,
      bundle: bid.bundle ? [bid.bundle] : undefined,
      iurl: bid.iurl,
      cat: bid.cat,
      cattax: bid.cattax,
      lang: bid.language,
      attr: bid.attr,
      mrating: bid.qagmediarating,
    };

    if (bid.mtype && bid.mtype === 1) {
      const creative = this.creativeConverters[bid.mtype].convert(bid);
      Object.assign(ad, creative);
    }

    if (bid.mtype && bid.mtype === 4) {
      const creative = this.creativeConverters[bid.mtype].convert(bid);
      Object.assign(ad, creative);
    }

    /*
    if (bid.mtype && this.creativeConverters[bid.mtype]) {
      const creative = this.creativeConverters[bid.mtype].convert(bid);
      Object.assign(ad, creative);
    }*/

    return ad;
  }
}
