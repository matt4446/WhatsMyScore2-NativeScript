import { PipeTransform, Pipe } from "@angular/core";
import { Logger } from "../../providers/logger";
var moment  = require("moment");

@Pipe({name: 'DisplayDate', pure: true})
export class DisplayDate implements PipeTransform {
   constructor(private logger: Logger)
   {
   }
   
   transform(value: any, args: any[] = []) {
       var date = moment(value);
       
       return date.format('llll');
   }
}