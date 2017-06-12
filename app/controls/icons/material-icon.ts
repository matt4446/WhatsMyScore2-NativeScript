import {Directive} from "@angular/core";

@Directive({
  selector: "[material-icon]",
  host: {
    "class": "material-icons"
  }
})
export class MaterialIcon {
}