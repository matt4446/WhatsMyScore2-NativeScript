import { Component, View, provide } from "angular2/core";
import { NxNav} from "../controls/nav/nav";
import {NxList} from "../controls/list/list";
import {NxListItem} from "../controls/list/list-item";
import {NxHeader} from "../controls/list/header";
import {NxCard} from "../controls/card/card";
import {NxPullToRefresh} from "../controls/pullToRefresh/pullToRefresh";

import {NxDrawer} from "../controls/drawer/drawer";
import {IonIcon,NavIcon} from "../controls/icons/ion-icon";
//import {LoadingService} from "../providers/loadingService/loadingService";
import {NgIf, NgFor} from "angular2/common";
import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {RouteParams} from 'angular2/router';
//providers
import {AppRoutingService} from "../context/router.context";
import {Logger} from "../providers/logger";
//pipes 
import {TitleTransform} from "../pipes/title";
import {DisplayDate} from "../pipes/dates"

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
        
        var coreProviders = [
            provide(AppRoutingService, {
                useFactory : (routeParams, logger) => { return new AppRoutingService(routeParams, logger); },
                deps: [RouteParams, Logger] 
            })
        ];
        
        var coreDirectives = [
            NxDrawer, 
            NxCard, 
            NxPullToRefresh, 
            NxNav, 
            NxList, 
            NxListItem, 
            NxHeader, 
            IonIcon, 
            NgIf, 
            NgFor
        ];
        
        var corePipes = [TitleTransform, DisplayDate];
        
        config.directives = config.directives 
            ? config.directives.concat(coreDirectives) 
            : coreDirectives;
       
        config.providers = config.providers
            ? config.providers.concat(coreProviders)
            : coreProviders;
       
        config.pipes = config.pipes 
            ? config.pipes.concat() 
            : corePipes;
            
            
        
        let component = new Component(componentConfig);

        annotations.push(component);

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}