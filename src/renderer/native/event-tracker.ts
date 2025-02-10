import { EventTrackingMethod, EventType } from "iab-adcom/enum";
import type { IViewableTracker } from "@/types";
import type { Event } from "iab-adcom/media";

export class NativeEventTracker {
  private viewableTracker: IViewableTracker;

  public constructor(viewableTracker: IViewableTracker) {
    this.viewableTracker = viewableTracker;
  }

  public track(targetElement: HTMLDivElement, eventTrackers: Event[]) {
    eventTrackers.forEach((eventTracker) => {
      this.trackEventTracker(targetElement, eventTracker);
    });
  }

  private trackEventTracker(
    targetElement: HTMLDivElement,
    eventTracker: Event
  ) {
    if (eventTracker.url) {
      const url = eventTracker.url;

      if (eventTracker.type === EventType.IMPRESSION) {
        targetElement.appendChild(
          this.generateTrackElement(url, eventTracker.method)
        );
      } else {
        if (eventTracker.type === EventType.VIEWABLE_MRC_50) {
          this.viewableTracker.trackViewableMrc50(targetElement, () => {
            targetElement.appendChild(
              this.generateTrackElement(url, eventTracker.method)
            );
          });
        } else if (eventTracker.type === EventType.VIEWABLE_MRC_100) {
          this.viewableTracker.trackViewableMrc100(targetElement, () => {
            targetElement.appendChild(
              this.generateTrackElement(url, eventTracker.method)
            );
          });
        }
      }
    }
  }

  private generateTrackElement(
    url: string,
    method: EventTrackingMethod
  ): HTMLScriptElement | HTMLImageElement {
    if (method === EventTrackingMethod.JAVASCRIPT) {
      return this.generateTrackScript(url);
    } else {
      return this.generateTrackImage(url);
    }
  }

  private generateTrackScript(url: string): HTMLScriptElement {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    return script;
  }

  private generateTrackImage(url: string): HTMLImageElement {
    const image = new Image(1, 1);
    image.src = url;
    image.style.display = "none";
    return image;
  }
}