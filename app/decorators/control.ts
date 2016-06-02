import { Component, ChangeDetectionStrategy } from '@angular/core';
const _reflect: any = Reflect;

export interface IControlConfig {
    selector?: string;
    
    templateUrl?: string;
    template?: string;
    directives?: any[];
    providers?: any[];
    inputs?: any[];
    outputs?: any[];
    pipes?: any[];
    host?: {
        'class' : string 
    },
    styleUrls?: string[];
}
export function Control(config: IControlConfig={})
{
    return (cls) =>
    {
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;

        //componentConfig.changeDetection = ChangeDetectionStrategy.OnPush;
         
        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}

