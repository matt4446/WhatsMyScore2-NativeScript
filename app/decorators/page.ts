import { Component, View } from "angular2/core";
import {NxNav} from "../controls/nav/nav";
import {NxList} from "../controls/list/list";
import {NxListItem} from "../controls/list/list-item";
import {NxHeader} from "../controls/list/header";
import {NxCard} from "../controls/card/card";
import {NxDrawer} from "../controls/drawer/drawer";
import {IonIcon,NavIcon} from "../controls/icons/ion-icon";
import {NgIf, NgFor} from "angular2/common";
import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {topmost} from "ui/frame";
import {ActionItem} from "ui/action-bar";

const _reflect: any = Reflect;

/*
<Page xmlns="http://www.nativescript.org/tns.xsd" loaded="pageLoaded">
  <StackLayout>
    <Label text="Loading..." cssClass="title"/>
  </StackLayout>
</Page>
*/

export interface IPageConfig {
    selector?: string;
    //onLoaded? : (args: EventData) => void;
    //onNavigatingTo? : (arg: EventData) => void;
    template?: string;
    templateUrl?: string;
    //template?: string;
    directives?: any[];
    providers?: any[];
    pipes?: any[];
}

export function Page(config: IPageConfig={})
{
    return (cls) =>
    {
        
        
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;
        
        var providers = [];
        var nxDirectives = [NxDrawer, NxCard, NxNav, NxList, NxListItem, NxHeader, IonIcon, NgIf, NgFor];
        
        config.directives = config.directives 
            ? config.directives.concat(nxDirectives) 
            : nxDirectives;
       
        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}