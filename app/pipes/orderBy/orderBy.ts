import { PipeTransform, Pipe } from "@angular/core";
import { Logger } from "../../providers/logger";
var _ = require("underscore");

//import {orderBy} from 'lodash/orderBy';
//var orderBy = require("lodash/orderBy")

// import {
//     StringWrapper,
//     isBlank,
//     isString,
//     isArray,
//     CONST,
//     FunctionWrapper
// }
// from 'angular2/src/facade/lang';

export function isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
}
export function isArray(obj: any): boolean {
    return Array.isArray(obj);
}
export function isString(obj: any): boolean {
    return typeof obj === "string";
}

@Pipe({
    name: 'orderBy',
    pure: true
})
export class OrderByPipe implements PipeTransform {
    constructor(private logger: Logger) {}

    transform(value: any, args: any = []) {
        console.log("orderBy pipe - transform");
        let expression: string = null;
        let ascending: boolean = true;
        
        if (isBlank(args)) return value;
        if (isString(args)){
            expression = args;
        }else{
            expression = args[0];
        }
        if (isArray(args) && args.length > 1){
            ascending = args[1];
        }
        //var descending: boolean = args.length > 1 ? args[1] : false;

        let orderedAsc = _.sortBy(value, expression);
        
        if(ascending) { return orderedAsc; }
        
        return orderedAsc.reverse();
        //let result = descending ? orderedAsc.reverse() : orderedAsc;

        //return result;
    }
}

@Pipe({
    name: "groupBy",
    pure: true
})
export class GroupByPipe {
    constructor(private logger: Logger) {}

    transform(value: any, args: string) {
        console.log("groupBy by pipe - transform");

        if (isBlank(args)) return value;

        
        var expression = args; //args.length > 0 ? args[0] : null;
        
        let grouped = _.chain(value).groupBy(expression).map((value, key) => {
            return {
                key: key,
                items: value
            }
        }).value();
         
        return grouped;
    }
}