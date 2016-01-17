import {Observable} from "data/observable"
// var observable = require("data/observable");
// var HelloWorldModel = (function (_super) {
//     __extends(HelloWorldModel, _super);
//     function HelloWorldModel() {
//         _super.call(this);
//         this.counter = 42;
//         this.set("message", this.counter + " taps left");
//     }
//     HelloWorldModel.prototype.tapAction = function () {
//         this.counter--;
//         if (this.counter <= 0) {
//             this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
//         }
//         else {
//             this.set("message", this.counter + " taps left");
//         }
//     };
//     return HelloWorldModel;
// })(observable.Observable);
// exports.HelloWorldModel = HelloWorldModel;
// exports.mainViewModel = new HelloWorldModel();

export class MainPageViewModel extends Observable
{
    constructor()
    {
        super();       
    }
    
    public tapAction()
    {
        this.set
    }
}

//var vmModule = require("./main-view-model");
function pageLoaded(args) {
    var page = args.object;
    var vm = new MainPageViewModel();
    page.bindingContext =vm;
}
exports.pageLoaded = pageLoaded;
