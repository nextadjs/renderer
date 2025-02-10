import type { Native, Display as BaseDisplay } from "iab-adcom/media";
import { NativeAssetMacroReplacer } from "./native/asset-macro-replacer";
import { NativeSpecialAssetMacroReplacer } from "./native/special-asset-macro-replacer";
import { NativeLinkHandler } from "./native/link-handler";

interface Display extends BaseDisplay {
  adm: undefined;
  native: Native;
}

export type NativeAd = {
  display: Omit<Display, "banner">;
};

export class NativeRenderer {
  public renderByAdTemplate(
    target: HTMLDivElement,
    ad: NativeAd,
    adTemplate: string
  ) {
    const nativeAssetMacroReplacer = new NativeAssetMacroReplacer();
    let replacedAd = nativeAssetMacroReplacer.replace(
      adTemplate,
      ad.display.native.asset || []
    );

    const nativeSpecialAssetMacroReplacer =
      new NativeSpecialAssetMacroReplacer();
    replacedAd = nativeSpecialAssetMacroReplacer.replace(
      replacedAd,
      ad.display.native?.link
    );

    target.innerHTML = replacedAd;

    const nativeLinkHandler = new NativeLinkHandler();
    nativeLinkHandler.handle(
      target,
      ad.display.native.link,
      ad.display.native.asset
    );
  }

  public renderByCallback(
    target: HTMLDivElement,
    ad: NativeAd,
    callbackFn: (/* ここにタイトルとかイメージとか入れる (データアセットも適切に分割する) */) => void
  ) {}
}
