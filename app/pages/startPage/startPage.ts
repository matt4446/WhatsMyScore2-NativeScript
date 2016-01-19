import {Observable} from "data/observable";
import {Inject, Component, View} from 'angular2/core';


@Component({
    selector: "startPage",
    templateUrl: "startPage.xml"
})
export class startPage 
{
    constructor()
    {
        
    }
}


//var vmModule = require("./main-view-model");
export function pageLoaded(args) {
    var page = args.object;
    var vm = new startPage();
    page.bindingContext = vm;
}

//exports.pageLoaded = pageLoaded;
