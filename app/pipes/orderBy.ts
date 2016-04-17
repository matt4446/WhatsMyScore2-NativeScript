import { PipeTransform, Pipe } from "angular2/core";
import { Logger } from "../providers/logger";
var _ = require("underscore");
import {
    StringWrapper,
    isBlank,
    isString,
    isArray,
    CONST,
    FunctionWrapper
}
from 'angular2/src/facade/lang';
@Pipe({
    name: 'orderBy',
    pure: true
})
export class OrderByPipe implements PipeTransform {
    constructor(private logger: Logger) {}

    transform(value: any, args: any[] = []) {

        if (isBlank(args)) return value;
        var expression = args.length > 0 ? args[0] : null;
        var descending: boolean = args.length > 1 ? args[1] : false;

        let orderedAsc = _.sortBy(value, expression);
        
        let result = descending ? orderedAsc.reverse() : orderedAsc;

        return result;
    }
}

@Pipe({
    name: "groupBy",
    pure: true
})
export class GroupByPipe {
    constructor(private logger: Logger) {}

    transform(value: any, args: any[] = []) {
        if (isBlank(args)) return value;
        var expression = args.length > 0 ? args[0] : null;
        
        let grouped = _.chain(value).groupBy(expression).map((value, key) => {
            return {
                key: key,
                items: value
            }
        }).value();
         
        return grouped;
    }
}