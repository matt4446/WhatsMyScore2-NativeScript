import { PipeTransform, Pipe } from "angular2/core";

@Pipe({name: 'Title', pure: true})
export class TitleTransform implements PipeTransform {
   transform(value: any, args: any[] = []) {
       let k : string = value;
       k.toUpperCase();
       
       return k;
   }
}