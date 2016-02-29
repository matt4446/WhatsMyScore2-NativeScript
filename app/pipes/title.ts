import { PipeTransform, Pipe } from "angular2/core";
import { Logger } from "../providers/logger"

@Pipe({name: 'Title', pure: true})
export class TitleTransform implements PipeTransform {
   constructor(private logger: Logger)
   {
       this.logger.Notify("title pipe created");
   }
   
   transform(value: any, args: any[] = []) {
       
       let k : string = value;
       k = k.toUpperCase();
       
       return k;
   }
}