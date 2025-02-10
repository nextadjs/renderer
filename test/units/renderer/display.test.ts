import { DisplayRenderer, type DisplayAd } from "@/renderers/display";

describe("Display Renderer", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div></div>`;
  });

  it("add iframe to child element", () => {
    const sut = new DisplayRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: {
        adm: "<div>adm</div>",
        w: 300,
        h: 250,
      },
    } as unknown as DisplayAd;

    sut.render(target, ad);

    const iframe = target.querySelector("iframe");
    expect(iframe).not.toEqual(null);
  });

  it("includes ad markup in iframe", () => {
    const sut = new DisplayRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: {
        adm: "<div>adm</div>",
        w: 300,
        h: 250,
      },
    } as unknown as DisplayAd;

    sut.render(target, ad);

    const iframe = target.querySelector("iframe");
    expect(iframe?.contentDocument?.body.innerHTML).include("<div>adm</div>");
  });

  it("includes reset css in iframe", () => {
    const sut = new DisplayRenderer();
    const target = document.querySelector("div") as HTMLDivElement;
    const ad = {
      display: {
        adm: "<div>adm</div>",
        w: 300,
        h: 250,
      },
    } as unknown as DisplayAd;

    sut.render(target, ad);

    const iframe = target.querySelector("iframe");
    expect(iframe?.contentDocument?.head.innerHTML).include("<style>");
    expect(iframe?.contentDocument?.head.innerHTML).include("</style>");
  });
});
