import { BannerRenderer, type BannerAd } from "@/renderer/banner";

describe("Banner Renderer", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div></div>`;
  });

  // コンテナ要素が追加される
  it("add container element", () => {
    const sut = new BannerRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: { banner: { img: "https://example.com/url" } },
    } as unknown as BannerAd;

    sut.render(target, ad);

    expect(target.innerHTML).include("<div");
    expect(target.innerHTML).include("</div>");
  });

  // 画像要素追加される
  it("add image element in banner container", () => {
    const sut = new BannerRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: { banner: { img: "https://example.com/url" } },
    } as unknown as BannerAd;

    sut.render(target, ad);

    const bannerContainer = target.querySelector("div") as HTMLDivElement;
    expect(bannerContainer.innerHTML).include(
      '<img src="https://example.com/url"'
    );
  });

  // リンクが含まれているときはリンクが追加される
  it("add link when banner ad includes link", () => {
    const sut = new BannerRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: {
        banner: {
          img: "https://example.com/url",
          link: { url: "https://example.com/link" },
        },
      },
    } as unknown as BannerAd;

    sut.render(target, ad);

    const bannerContainer = target.querySelector("div") as HTMLDivElement;
    expect(bannerContainer.innerHTML).include(
      'href="https://example.com/link"'
    );
  });

  // リンクにトラッカーが含まれるときはリンクをクリックしたときに発火する
  it("emit third party tracking url when link click", () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve());
    vi.spyOn(global, "fetch").mockImplementation(fetchMock);
    const sut = new BannerRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: {
        banner: {
          img: "https://example.com/url",
          link: {
            url: "https://example.com/link",
            trkr: ["https://example.com/trkr"],
          },
        },
      },
    } as unknown as BannerAd;
    sut.render(target, ad);
    const bannerLink = target.querySelector("a") as HTMLAnchorElement;

    bannerLink.dispatchEvent(
      new Event("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("https://example.com/trkr", {
      keepalive: true,
    });
  });
});
