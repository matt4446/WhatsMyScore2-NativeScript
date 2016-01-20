import {Component} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";

@Page({
    selector: "region",
	templateUrl: "pages/regionPage/regionPage.html"
})
export class RegionPage 
{
    constructor(private logger: Logger)
    {
        this.logger.Notify("region page loaded");
    }
}

