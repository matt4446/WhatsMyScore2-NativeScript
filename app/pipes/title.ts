import { PipeTransform, Pipe } from "@angular/core";
import { Logger } from "../providers/logger"

@Pipe({name: 'Title', pure: true})
export class TitleTransform implements PipeTransform {
   constructor(private logger: Logger)
   {
   }
   
   transform(value: string, args: any[] = []) {
       let k = value.toUpperCase();
       
       return k;
   }
}