import type {
  Banner,
  Display as BaseDisplay,
  LinkAsset,
} from "iab-adcom/media";

interface Display extends BaseDisplay {
  adm: undefined;
  banner: Banner;
}

export type BannerAd = {
  display: Omit<Display, "native">;
};

export class BannerRenderer {
  public render(target: HTMLDivElement, ad: BannerAd) {
    const container = document.createElement("div");

    if (ad.display.banner.link) {
      const link = this.createLink(ad.display.banner.link);
      container.appendChild(link);
      link.appendChild(this.createImage(ad));
    } else {
      container.appendChild(this.createImage(ad));
    }

    target.appendChild(container);
  }

  private createImage(ad: BannerAd): HTMLImageElement {
    const image = document.createElement("img");
    image.src = ad.display.banner.img;
    if (ad.display.w) {
      image.width = ad.display.w;
    }

    if (ad.display.h) {
      image.height = ad.display.h;
    }

    return image;
  }

  private createLink(link: LinkAsset): HTMLAnchorElement {
    const linkEl = document.createElement("a");
    linkEl.style.padding = "0";
    linkEl.style.margin = "0";
    linkEl.href = link.url;

    linkEl.addEventListener("click", () => {
      link.trkr?.forEach((tracker) => {
        fetch(tracker, {
          keepalive: true,
        });
      });
    });

    return linkEl;
  }
}
