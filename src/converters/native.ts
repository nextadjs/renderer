import type { Ad, CreativeConverter } from "@/types";
import type { Bid } from "iab-openrtb/v26";
import type {
  AssetResponse,
  DataResponse,
  ImageResponse,
  LinkResponse,
  NativeResponse,
  TitleResponse,
  VideoResponse,
} from "iab-native";
import type {
  Asset,
  DataAsset,
  ImageAsset,
  LinkAsset,
  Native,
  TitleAsset,
  VideoAsset,
} from "iab-adcom/media";

export class NativeConverter implements CreativeConverter {
  public convert(bid: Bid): Partial<Ad> {
    const nativeResponse: NativeResponse = JSON.parse(bid.adm || "{}");
    return {
      display: {
        native: this.convertNativeResponse(nativeResponse),
      },
    };
  }

  private convertNativeResponse(response: NativeResponse): Native {
    return {
      link: this.convertLink(response.link),
      asset: response.assets?.map((asset) => this.convertAsset(asset)) || [],
    };
  }

  private convertLink(link: LinkResponse): LinkAsset {
    return {
      url: link.url,
      urlfb: link.fallback,
      trkr: link.clicktrackers,
    };
  }

  private convertAsset(asset: AssetResponse): Asset {
    const result: Asset = {
      id: asset.id,
      req: asset.required === 1 ? 1 : 0,
    };

    if (asset.title) {
      result.title = this.convertTitle(asset.title);
    }

    if (asset.img) {
      result.image = this.convertImage(asset.img);
    }

    if (asset.data) {
      result.data = this.convertData(asset.data);
    }

    if (asset.video) {
      result.video = this.convertVideo(asset.video);
    }

    if (asset.link) {
      result.link = this.convertLink(asset.link);
    }

    return result;
  }

  private convertTitle(title: TitleResponse): TitleAsset {
    return {
      text: title.text,
      len: title.len,
    };
  }

  private convertImage(image: ImageResponse): ImageAsset {
    return {
      url: image.url,
      w: image.w,
      h: image.h,
      type: image.type,
    };
  }

  private convertData(data: DataResponse): DataAsset {
    return {
      value: data.value,
      len: data.len,
      type: data.type,
    };
  }

  private convertVideo(video: VideoResponse): VideoAsset {
    return {
      adm: video.vasttag,
    };
  }
}
