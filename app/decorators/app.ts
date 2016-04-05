import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy } from "angular2/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { HTTP_PROVIDERS } from "angular2/http";
import { nativeScriptBootstrap, bootstrap } from "nativescript-angular/application";
import { Page } from "ui/page";
import {TextView} from 'ui/text-view';
import { bind, provide, Inject, Component } from 'angular2/core';
import { APP_BASE_HREF } from "angular2/router";
import application = require('application');
//import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router/ns-router";


const _reflect: any = Reflect;

export interface IRegisterElement {
    name: string,
    resolver: () => ViewClass
};

export interface IAppConfig {
    registerElements ? : IRegisterElement[],
        directives ? : any[],
        selector: string,
        providers ? : any[],
        template ? : string
}

function start(appComponentType, customProviders) : Promise<any,any> {
    let p = new Promise((resolve, reject) => {

        application.start({
            create: (): Page => {
                let page = new Page();

                let onLoadedHandler = function(args) {
                    page.off('loaded', onLoadedHandler);
                    //profiling.stop('application-start');
                    console.log('Page loaded');

                    //profiling.start('ng-bootstrap');
                    console.log('BOOTSTRAPPING...');
                    bootstrap(appComponentType, customProviders).then((appRef) => {
                        //profiling.stop('ng-bootstrap');
                        console.log('ANGULAR BOOTSTRAP DONE.');

                        resolve(appRef);
                    }, (err) => {
                        console.log('ERROR BOOTSTRAPPING ANGULAR');
                        let errorMessage = err.message + "\n\n" + err.stack;
                        console.log(errorMessage);

                        let view = new TextView();
                        view.text = errorMessage;
                        page.content = view;

                        reject(Error(errorMessage));
                    });
                }

                page.on('loaded', onLoadedHandler);

                return page;
            }
        })

    });

    return p;
}

export function App(config: IAppConfig) {
    return (cls) => {
        console.log("Setup App annotations");

        let registerElements: IRegisterElement[] = config.registerElements ? config.registerElements : [];

        

        // get current annotations
        let annotations = _reflect.getMetadata('annotations', cls) || [];

        config.selector = 'main';
        config.template = `<page-router-outlet></page-router-outlet>`;

        config.providers = config.providers ? config.providers.concat(NS_ROUTER_PROVIDERS, HTTP_PROVIDERS) : [NS_ROUTER_PROVIDERS, HTTP_PROVIDERS];

        config.directives = config.directives ? config.directives.concat(NS_ROUTER_DIRECTIVES) : [NS_ROUTER_DIRECTIVES];

        annotations.push(new Component(config));

        _reflect.defineMetadata('annotations', annotations, cls);
        
        start(cls,config.providers).then(appRef => {
            let injector = appRef.injector;
            let page: Page = injector.get(Page);
            page.actionBarHidden = true;
                  
            registerElements.forEach(element => {
                console.log("Add element: " + element.name);
                registerElement(element.name, element.resolver)
            });  
            
            // let locationStrategy: LocationStrategy = injector.get(LocationStrategy);
            // locationStrategy.
            //router.
            //page.actionBarHidden = true;
            //page.
        });

        return cls;
    }
}