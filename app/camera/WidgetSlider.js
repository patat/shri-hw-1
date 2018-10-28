/* global requestAnimationFrame */
export default class WidgetSlider {
    constructor(el, initialValue = 0.5) {
        this.sliderCursor = el.querySelector('.slider__cursor');
        this.isVertical = false;
        this.sliderRect = el.getBoundingClientRect();
        this.minDisplacement = 0;
        this.maxDisplacement = this.sliderRect.width - this.sliderCursor.offsetWidth;
        // slider value is always in [0, 1] interval
        this.cursorDisplacement = Math.floor(this.maxDisplacement * initialValue);
        this.sliderCursor.style.left = this.cursorDisplacement + 'px';
        this.tracking = false;
        this.sliderCursor.addEventListener('pointerdown', ev => this.sliderStart(ev), true);
        this.sliderCursor.addEventListener('pointermove', ev => this.sliderMove(ev), true);
        this.sliderCursor.addEventListener('pointerup', () => this.sliderEnd(), true);
        this.sliderCursor.addEventListener('pointercancel', () => this.sliderEnd(), true);
    }
    getValue() {
        return this.cursorDisplacement / this.maxDisplacement;
    }
    setValue(value) {
        let newValue = value;
        if (newValue < 0) {
            newValue = 0;
        }
        if (newValue > 1) {
            newValue = 1;
        }
        this.cursorDisplacement = Math.floor(this.maxDisplacement * newValue);
        this.sliderCursor.style.left = this.cursorDisplacement + 'px';
    }
    bindCallback(callback) {
        this.callback = callback;
    }
    sliderStart(ev) {
        if (!this.tracking) {
            this.sliderCursor.setPointerCapture(ev.pointerId);
            this.prevCoord = this.isVertical ? ev.clientY : ev.clientX;
            this.tracking = true;
        }
    }
    sliderMove(ev) {
        if (this.tracking) {
            const currCoord = (this.isVertical ? ev.clientY : ev.clientX);
            let delta = currCoord - this.prevCoord;
            if (this.isVertical)
                delta = -delta;
            this.prevCoord = currCoord;
            let nextDisplacement = this.cursorDisplacement + delta;
            if (nextDisplacement < this.minDisplacement) {
                nextDisplacement = this.minDisplacement;
            }
            else if (nextDisplacement > this.maxDisplacement) {
                nextDisplacement = this.maxDisplacement;
            }
            this.cursorDisplacement = nextDisplacement;
            requestAnimationFrame(() => {
                if (this.isVertical) {
                    this.sliderCursor.style.left = nextDisplacement + 'px';
                    return;
                }
                this.sliderCursor.style.left = nextDisplacement + 'px';
                this.callback(this.getValue());
            });
        }
    }
    sliderEnd() {
        if (this.tracking) {
            this.tracking = false;
        }
    }
}
