/* global requestAnimationFrame */
export default class WidgetSlider {
  public sliderCursor: HTMLElement;
  public isVertical: boolean;
  public sliderRect: ClientRect;
  public minDisplacement: number;
  public maxDisplacement: number;
  public cursorDisplacement: number;
  public tracking: boolean;
  public callback: (val: number) => void;
  public prevCoord: number;

  constructor(el: HTMLElement, initialValue: number = 0.5) {
    this.sliderCursor = el.querySelector(".slider__cursor");
    this.isVertical = false;

    this.sliderRect = el.getBoundingClientRect();

    this.minDisplacement = 0;
    this.maxDisplacement = this.sliderRect.width - this.sliderCursor.offsetWidth;

    // slider value is always in [0, 1] interval
    this.cursorDisplacement = Math.floor(this.maxDisplacement * initialValue);
    this.sliderCursor.style.left = this.cursorDisplacement + "px";
    this.tracking = false;

    this.sliderCursor.addEventListener("pointerdown", (ev) => this.sliderStart(ev), true);
    this.sliderCursor.addEventListener("pointermove", (ev) => this.sliderMove(ev), true);
    this.sliderCursor.addEventListener("pointerup", () => this.sliderEnd(), true);
    this.sliderCursor.addEventListener("pointercancel", () => this.sliderEnd(), true);
  }

  public getValue() {
    return this.cursorDisplacement / this.maxDisplacement;
  }

  public setValue(value: number) {
    let newValue = value;
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > 1) {
      newValue = 1;
    }

    this.cursorDisplacement = Math.floor(this.maxDisplacement * newValue);
    this.sliderCursor.style.left = this.cursorDisplacement + "px";
  }

  public bindCallback(callback: (val: number) => void) {
    this.callback = callback;
  }

  public sliderStart(ev: PointerEvent) {
    if (!this.tracking) {
      this.sliderCursor.setPointerCapture(ev.pointerId);

      this.prevCoord = this.isVertical ? ev.clientY : ev.clientX;
      this.tracking = true;
    }
  }

  public sliderMove(ev: PointerEvent) {
    if (this.tracking) {
      const currCoord = (this.isVertical ? ev.clientY : ev.clientX);
      let delta = currCoord - this.prevCoord;
      if (this.isVertical) { delta = -delta; }
      this.prevCoord = currCoord;
      let nextDisplacement = this.cursorDisplacement + delta;

      if (nextDisplacement < this.minDisplacement) {
        nextDisplacement = this.minDisplacement;
      } else if (nextDisplacement > this.maxDisplacement) {
        nextDisplacement = this.maxDisplacement;
      }

      this.cursorDisplacement = nextDisplacement;

      requestAnimationFrame(() => {
        if (this.isVertical) {
          this.sliderCursor.style.left = nextDisplacement + "px";
          return;
        }

        this.sliderCursor.style.left = nextDisplacement + "px";
        this.callback(this.getValue());
      });
    }
  }

  public sliderEnd() {
    if (this.tracking) {
      this.tracking = false;
    }
  }
}
