"use strict";
exports.__esModule = true;
var Camera = /** @class */ (function () {
    function Camera(el) {
        this.el = el;
        this.view = el.querySelector('.event-card__view');
        this.zoomInfo = el.querySelector('.event-card__zoom');
        this.brightnessInfo = el.querySelector('.event-card__brightness');
        // debugging
        // this.log = document.createElement('div');
        // el.appendChild(this.log);
        // this.log.textContent = 'hohoho';
        this.camPosition = 50; // horizontal position in % from 0 to 100 
        this.zoomValue = 2; // x initial view element size
        this.brightness = 1;
        // setup camera image background
        this._resizeCamImage();
        this.view.style.backgroundPosition = this.camPosition + "% 50%";
        this._initScrollBar();
    }
    Camera.prototype._resizeCamImage = function () {
        this.camImageWidth = this.view.clientWidth * this.zoomValue;
        this.camImageHeight = this.view.clientHeight * this.zoomValue;
        this.view.style.backgroundSize = this.camImageWidth + "px " + this.camImageHeight + "px";
    };
    Camera.prototype._initScrollBar = function () {
        this.scrollbar = this.view.querySelector('.event-card__scrollbar');
        this.scroller = this.view.querySelector('.event-card__scroller');
        this.scrollbarWidth = this.scrollbar.clientWidth - 2;
        this._initScroller();
        this._moveScroller();
    };
    Camera.prototype._initScroller = function () {
        this.scrollerWidth = Math.floor(this.scrollbarWidth / this.zoomValue);
        this.scroller.style.width = this.scrollerWidth + "px";
    };
    Camera.prototype._moveScroller = function () {
        var pos = (this.scrollbarWidth - this.scrollerWidth) * this.camPosition / 100;
        this.scroller.style.transform = "translateX(" + pos + "px)";
    };
    Camera.prototype._updateZoomInfo = function () {
        var zoomPercentage = Math.floor((this.zoomValue - 2) * 50);
        this.zoomInfo.textContent = "\u041F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u0438\u0435: " + zoomPercentage + "%";
    };
    Camera.prototype._updateBrightness = function () {
        this.view.style.filter = "brightness(" + this.brightness + ")";
        this.brightnessInfo.textContent = "\u042F\u0440\u043A\u043E\u0441\u0442\u044C: " + Math.floor(this.brightness * 100) + "%";
    };
    Camera.prototype.move = function (delta) {
        var _this = this;
        //this.log.textContent = delta;
        var camPosition = this.camPosition - delta * 100 / this.view.clientWidth;
        if (camPosition <= 0) {
            camPosition = 0;
        }
        if (camPosition >= 100) {
            camPosition = 100;
        }
        this.camPosition = camPosition;
        requestAnimationFrame(function () {
            _this.view.style.backgroundPosition = camPosition + "% 50%";
            _this._moveScroller();
        });
    };
    Camera.prototype.zoom = function (delta) {
        var _this = this;
        //this.log.textContent = delta;
        var zoomValue = this.zoomValue + delta * 0.05;
        if (zoomValue <= 2) {
            zoomValue = 2;
        }
        if (zoomValue >= 4) {
            zoomValue = 4;
        }
        this.zoomValue = zoomValue;
        requestAnimationFrame(function () {
            _this._resizeCamImage();
            _this._initScroller();
            _this._moveScroller();
            _this._updateZoomInfo();
        });
    };
    Camera.prototype.brigtness = function (delta) {
        var _this = this;
        //this.log.textContent = delta;
        var brightnessValue = this.brightness + delta * 0.05;
        if (brightnessValue <= 0.5) {
            brightnessValue = 0.5;
        }
        if (brightnessValue >= 1.5) {
            brightnessValue = 1.5;
        }
        this.brightness = brightnessValue;
        requestAnimationFrame(function () {
            _this._updateBrightness();
        });
    };
    return Camera;
}());
exports["default"] = Camera;
