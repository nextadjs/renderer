import { OpenRTBBidConverter } from "@/openrtb-bid-converter";
import type { NativeResponse } from "iab-native";
import type { Bid } from "iab-openrtb/v26";

describe("OpenRTB Bid Converter", () => {
  it("converts OpenRTB Bid object to Ad object when bid includes banner ad markup", () => {
    const sut = new OpenRTBBidConverter();
    const bid = {
      apis: [1],
      w: 300,
      h: 250,
      wratio: 16,
      hratio: 9,
      adm: "<div>display</div>",
      mtype: 1,
    } as unknown as Bid;

    const result = sut.fromBid(bid);

    expect(result).toEqual({
      display: {
        api: 1,
        w: 300,
        h: 250,
        wratio: 16,
        hratio: 9,
        adm: "<div>display</div>",
      },
    });
  });

  it("converts OpenRTB Bid object to Ad object when bid includes native ad markup", () => {
    const sut = new OpenRTBBidConverter();
    const nativeResponse: NativeResponse = {
      ver: "1.2",
      assets: [
        {
          id: 1,
          required: 1,
          title: {
            text: "Ad",
            len: 25,
          },
        },
        {
          id: 2,
          required: 1,
          img: {
            url: "https://example.com/image.jpg",
            w: 300,
            h: 250,
            type: 3,
          },
        },
        {
          id: 3,
          data: {
            value: "Description",
            len: 90,
            type: 2,
          },
        },
        {
          id: 4,
          video: {
            vasttag: '<VAST version="3.0">...</VAST>',
          },
        },
      ],
      link: {
        url: "https://example.com/landing",
        fallback: "https://example.com/fallback",
        clicktrackers: [
          "https://example.com/click1",
          "https://example.com/click2",
        ],
      },
    };
    const bid = {
      adm: JSON.stringify(nativeResponse),
      mtype: 4,
    } as unknown as Bid;

    const result = sut.fromBid(bid);

    expect(result).toEqual({
      display: {
        native: {
          link: {
            url: "https://example.com/landing",
            urlfb: "https://example.com/fallback",
            trkr: ["https://example.com/click1", "https://example.com/click2"],
          },
          asset: [
            {
              id: 1,
              req: 1,
              title: {
                text: "Ad",
                len: 25,
              },
            },
            {
              id: 2,
              req: 1,
              image: {
                url: "https://example.com/image.jpg",
                w: 300,
                h: 250,
                type: 3,
              },
            },
            {
              id: 3,
              req: 0,
              data: {
                value: "Description",
                len: 90,
                type: 2,
              },
            },
            {
              id: 4,
              req: 0,
              video: {
                adm: '<VAST version="3.0">...</VAST>',
              },
            },
          ],
        },
      },
    });
  });
});
