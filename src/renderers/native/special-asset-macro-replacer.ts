import type { LinkAsset } from "iab-adcom/media";

export class NativeSpecialAssetMacroReplacer {
  public replace(target: string, link?: LinkAsset): string {
    let result: string = target;

    if (link) result = this.replaceLinkMacros(result, link);

    return result;
  }

  private replaceLinkMacros(target: string, link: LinkAsset): string {
    return target.replace(/##hb_native_linkurl##/g, link.url);
  }
}
