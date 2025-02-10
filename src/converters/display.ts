import type { Ad, CreativeConverter } from "@/types";
import type { Display } from "iab-adcom/media";
import type { Bid } from "iab-openrtb/v26";

export class DisplayConverter implements CreativeConverter {
  public convert(bid: Bid): Partial<Ad> {
    const display: Display = {
      api: bid.apis?.[0],
      w: bid.w,
      h: bid.h,
      wratio: bid.wratio,
      hratio: bid.hratio,
      adm: bid.adm,
    };

    return { display };
  }
}
