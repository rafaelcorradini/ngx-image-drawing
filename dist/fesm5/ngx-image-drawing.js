import { __spread, __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, TemplateRef, Output, EventEmitter, Component, NgModule } from '@angular/core';
import { fabric } from 'fabric';

var ImageDrawingComponent = /** @class */ (function () {
    function ImageDrawingComponent() {
        this.saveBtnText = 'Save';
        this.cancelBtnText = 'Cancel';
        this.loadingText = 'Loading…';
        this.errorText = 'Error loading %@';
        this.outputMimeType = 'image/jpeg';
        this.outputQuality = 0.8;
        this.onSave = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.currentTool = 'brush';
        this.currentSize = 'medium';
        this.currentColor = 'black';
        this.canUndo = false;
        this.canRedo = false;
        this.isLoading = true;
        this.hasError = false;
        this.errorMessage = '';
        this.stack = [];
    }
    ImageDrawingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var canvas = new fabric.Canvas('canvas', {
            hoverCursor: 'pointer',
            isDrawingMode: true,
        });
        if (this.src !== undefined) {
            var isFirstTry_1 = true;
            var imgEl_1 = new Image();
            imgEl_1.setAttribute('crossOrigin', 'anonymous');
            imgEl_1.src = this.src;
            imgEl_1.onerror = function () {
                // Retry with cors proxy
                if (isFirstTry_1) {
                    imgEl_1.src = 'http://cors-anywhere.herokuapp.com/' + _this.src;
                    isFirstTry_1 = false;
                }
                else {
                    _this.isLoading = false;
                    _this.hasError = true;
                    _this.errorMessage = _this.errorText.replace('%@', _this.src);
                }
            };
            imgEl_1.onload = function () {
                _this.isLoading = false;
                var fabricImg = new fabric.Image(imgEl_1);
                canvas.setBackgroundImage(fabricImg, (function (img) {
                    if (img !== null) {
                        canvas.setWidth(img.width);
                        canvas.setHeight(img.height);
                    }
                }), {
                    crossOrigin: 'anonymous',
                    originX: 'left',
                    originY: 'top'
                });
            };
        }
        canvas.on('path:created', function (e) {
            _this.stack = [];
            _this.setUndoRedo();
        });
        this.canvas = canvas;
        this.selectTool(this.currentTool);
        this.selectColor(this.currentColor);
        this.selectDrawingSize(this.currentSize);
    };
    // Tools
    ImageDrawingComponent.prototype.selectTool = function (tool) {
        this.currentTool = tool;
    };
    ImageDrawingComponent.prototype.selectDrawingSize = function (size) {
        this.currentSize = size;
        if (this.canvas !== null && this.canvas !== undefined) {
            if (size === 'small') {
                this.canvas.freeDrawingBrush.width = 5;
            }
            else if (size === 'medium') {
                this.canvas.freeDrawingBrush.width = 10;
            }
            else if (size === 'large') {
                this.canvas.freeDrawingBrush.width = 20;
            }
        }
    };
    ImageDrawingComponent.prototype.selectColor = function (color) {
        this.currentColor = color;
        if (this.canvas !== null && this.canvas !== undefined) {
            if (color === 'black') {
                this.canvas.freeDrawingBrush.color = '#000';
            }
            else if (color === 'white') {
                this.canvas.freeDrawingBrush.color = '#fff';
            }
            else if (color === 'yellow') {
                this.canvas.freeDrawingBrush.color = '#ffeb3b';
            }
            else if (color === 'red') {
                this.canvas.freeDrawingBrush.color = '#f44336';
            }
            else if (color === 'blue') {
                this.canvas.freeDrawingBrush.color = '#2196f3';
            }
            else if (color === 'green') {
                this.canvas.freeDrawingBrush.color = '#4caf50';
            }
        }
    };
    // Actions
    ImageDrawingComponent.prototype.undo = function () {
        if (this.canUndo) {
            var lastId = this.canvas.getObjects().length - 1;
            var lastObj = this.canvas.getObjects()[lastId];
            this.stack.push(lastObj);
            this.canvas.remove(lastObj);
            this.setUndoRedo();
        }
    };
    ImageDrawingComponent.prototype.redo = function () {
        if (this.canRedo) {
            var firstInStack = this.stack.splice(-1, 1)[0];
            if (firstInStack !== null && firstInStack !== undefined) {
                this.canvas.insertAt(firstInStack, this.canvas.getObjects().length - 1);
            }
            this.setUndoRedo();
        }
    };
    ImageDrawingComponent.prototype.clearCanvas = function () {
        var _a;
        if (this.canvas !== null && this.canvas !== undefined) {
            (_a = this.canvas).remove.apply(_a, __spread(this.canvas.getObjects()));
            this.setUndoRedo();
        }
    };
    ImageDrawingComponent.prototype.saveImage = function () {
        var _this = this;
        this.canvas.getElement().toBlob(function (data) {
            _this.onSave.emit(data);
        }, this.outputMimeType, this.outputQuality);
    };
    ImageDrawingComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    ImageDrawingComponent.prototype.setUndoRedo = function () {
        this.canUndo = this.canvas.getObjects().length > 0;
        this.canRedo = this.stack.length > 0;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ImageDrawingComponent.prototype, "src", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageDrawingComponent.prototype, "saveBtnText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageDrawingComponent.prototype, "cancelBtnText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageDrawingComponent.prototype, "loadingText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageDrawingComponent.prototype, "errorText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], ImageDrawingComponent.prototype, "loadingTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], ImageDrawingComponent.prototype, "errorTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ImageDrawingComponent.prototype, "outputMimeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ImageDrawingComponent.prototype, "outputQuality", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ImageDrawingComponent.prototype, "onSave", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ImageDrawingComponent.prototype, "onCancel", void 0);
    ImageDrawingComponent = __decorate([
        Component({
            selector: 'image-drawing',
            template: "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n\n<div class=\"loading\" *ngIf=\"isLoading\">\n    <ng-container *ngTemplateOutlet=\"loadingTemplate ? loadingTemplate : defaultLoading\"></ng-container>\n</div>\n<div class=\"error\" *ngIf=\"hasError\">\n    <ng-container *ngTemplateOutlet=\"errorTemplate ? errorTemplate : defaultError\"></ng-container>\n</div>\n\n<ng-template #defaultLoading><p>{{ loadingText }}</p></ng-template>\n<ng-template #defaultError><p>{{ errorMessage }}</p></ng-template>\n\n<canvas id=\"canvas\"></canvas>\n<div class=\"toolbar\" *ngIf=\"!isLoading\">\n    <div class=\"tools\">\n        <div class=\"row\">\n            <i class=\"material-icons btn\" [class.selected]=\"currentTool == 'brush'\" (click)=\"selectTool('brush')\" title=\"Pinceau\">brush</i>\n            <span class=\"size small btn\" [class.selected]=\"currentSize == 'small'\" (click)=\"selectDrawingSize('small')\"\n                title=\"Taille: petit\"></span>\n            <span class=\"size medium btn\" [class.selected]=\"currentSize == 'medium'\" (click)=\"selectDrawingSize('medium')\"\n                title=\"Taille: moyen\"></span>\n            <span class=\"size large btn\" [class.selected]=\"currentSize == 'large'\" (click)=\"selectDrawingSize('large')\"\n                title=\"Taille: grand\"></span>\n            <i class=\"material-icons btn\" [class.disabled]=\"!canUndo\" (click)=\"undo()\" title=\"Annuler\">undo</i>\n            <i class=\"material-icons btn\" [class.disabled]=\"!canRedo\" (click)=\"redo()\" title=\"Refaire\">redo</i>\n            <i class=\"material-icons btn\" (click)=\"clearCanvas()\" title=\"Effacer tout\">delete</i>\n        </div>\n        <div class=\"row\">\n            <div class=\"color black\" [class.selected]=\"currentColor == 'black'\" (click)=\"selectColor('black')\" title=\"Noir\"></div>\n            <div class=\"color white\" [class.selected]=\"currentColor == 'white'\" (click)=\"selectColor('white')\" title=\"Blanc\"></div>\n            <div class=\"color yellow\" [class.selected]=\"currentColor == 'yellow'\" (click)=\"selectColor('yellow')\" title=\"Jaune\"></div>\n            <div class=\"color red\" [class.selected]=\"currentColor == 'red'\" (click)=\"selectColor('red')\" title=\"Rouge\"></div>\n            <div class=\"color green\" [class.selected]=\"currentColor == 'green'\" (click)=\"selectColor('green')\" title=\"Vert\"></div>\n            <div class=\"color blue\" [class.selected]=\"currentColor == 'blue'\" (click)=\"selectColor('blue')\" title=\"Bleu\"></div>\n        </div>\n    </div>\n    <div class=\"buttons\">\n        <a href=\"#\" class=\"button btn-primary\" (click)=\"saveImage(); $event.preventDefault();\">{{ saveBtnText }}</a>\n        <a href=\"#\" class=\"button btn-light\" (click)=\"cancel(); $event.preventDefault();\">{{ cancelBtnText }}</a>\n    </div>\n</div>\n",
            styles: [":host{display:flex;flex-direction:column;align-items:center}:host .toolbar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}:host .tools{display:inline-flex;flex-direction:column;padding:20px;margin:10px;background:#fff;border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,.4)}:host .row{display:flex;width:300px;justify-content:space-around;align-items:center}:host .row:first-child{margin-bottom:10px}:host .btn{cursor:pointer}:host .btn.selected{color:#bdbdbd}:host .btn.disabled{cursor:initial;color:#bdbdbd}:host .size{background-color:#000}:host .size.selected{background-color:#bdbdbd}:host .size.small{height:12px;width:12px;border-radius:6px}:host .size.medium{height:16px;width:16px;border-radius:8px}:host .size.large{height:20px;width:20px;border-radius:10px}:host .color{width:28px;height:28px;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}:host .color.selected::after{content:\"\";width:10px;height:10px;background:#000;display:flex;border-radius:5px}:host .color.black{background-color:#000}:host .color.black.selected::after{background:#fff}:host .color.white{border:1px solid #a7a7a7}:host .color.yellow{background-color:#ffeb3b}:host .color.red{background-color:#f44336}:host .color.blue{background-color:#2196f3}:host .color.green{background-color:#4caf50}:host .buttons{margin:10px;display:flex;flex-direction:column}:host .button{cursor:pointer;outline:0;border:none;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;min-width:64px;line-height:36px;padding:3px 16px;border-radius:4px;overflow:visible;transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);margin:10px}:host .button:hover{text-decoration:none!important}:host .button.btn-primary{background-color:#ef5f27;color:#fff}:host .button.btn-primary:hover{background-color:rgba(239,95,39,.8)}:host .button.btn-light{color:#ef5f27}:host .button.btn-light:hover{background-color:rgba(239,95,39,.1)}"]
        }),
        __metadata("design:paramtypes", [])
    ], ImageDrawingComponent);
    return ImageDrawingComponent;
}());

var ImageDrawingModule = /** @class */ (function () {
    function ImageDrawingModule() {
    }
    ImageDrawingModule = __decorate([
        NgModule({
            declarations: [
                ImageDrawingComponent
            ],
            exports: [
                ImageDrawingComponent
            ],
            imports: [
                CommonModule
            ]
        })
    ], ImageDrawingModule);
    return ImageDrawingModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ImageDrawingComponent, ImageDrawingModule };
//# sourceMappingURL=ngx-image-drawing.js.map
