import { Control } from "../../decorators/control";
import { Input , Output,EventEmitter } from "angular2/core";
import { Logger} from "../../providers/logger";

@Control({
    selector: "nxNav",
    templateUrl: "controls/nav/nav.html",
    inputs:["title", "showBack", "ShowMenu"]
})
export class NxNav {
    public constructor(private logger: Logger ){
        this.logger.Notify("NxNav started");
    }
    
    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;
}