"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var dialogs_1 = require("ui/dialogs");
var page_1 = require("../../decorators/page");
var logger_1 = require("../../providers/logger");
var start_nav_1 = require("../nav/start.nav");
var StartPage = (function () {
    function StartPage(logger) {
        this.logger = logger;
        this.logger.Notify("Start Page - constructor hit");
    }
    StartPage.prototype.ngOnInit = function () {
    };
    StartPage.prototype.incomplete = function (args) {
        dialogs_1.alert("Its not made yet");
    };
    StartPage = __decorate([
        page_1.Page({
            selector: "start",
            //I've moved directives to Page decorator .. 
            templateUrl: "pages/start/page.html",
            directives: [start_nav_1.StartNav]
        }), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], StartPage);
    return StartPage;
}());
exports.StartPage = StartPage;
//# sourceMappingURL=startPage.js.map