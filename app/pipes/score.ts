import { PipeTransform, Pipe } from "@angular/core";
import { Logger } from "../providers/logger";

@Pipe({name: 'FormScore', pure: true})
export class FormScoreFormatter implements PipeTransform {
   transform(value: any, args: any[] = []) {
        return parseFloat(value).toFixed(2);
   }
}

@Pipe({name: 'TotalScore', pure: true})
export class ScoreFormatter implements PipeTransform {

   transform(value: any, args: any[] = []) {
        return parseFloat(value).toFixed(3);
   }
}