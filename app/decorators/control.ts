import { Component, ChangeDetectionStrategy } from 'angular2/core';

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
    
    templateUrl?: string;
    template?: string;
    directives?: any[];
    providers?: any[];
    inputs?: any[];
    outputs?: any[];
}

export function Control(config: IPageConfig={})
{
    return (cls) =>
    {
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;

        componentConfig.changeDetection = ChangeDetectionStrategy.OnPush;
        //componentConfig.selector = 'main';
        
        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}