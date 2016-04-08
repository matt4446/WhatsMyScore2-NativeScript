// import {Injectable} from 'angular2/core';

// import {LoadingIndicator} from "nativescript-loading-indicator";

// // declare module "number-picker" {
// //     import view = require("ui/core/view");
// //     import dependencyObservable = require("ui/core/dependency-observable");
    
// //     export class NumberPicker extends view.View {
// //         // static (prototype) properties
// //         public static valueProperty: dependencyObservable.Property;

// //         // instance properties
// //         value: number;

// //         android: android.widget.NumberPicker;
// //         ios: UIStepper;
// //     }
// // } 

// /**
//  * loadingIndicator
//  */
// @Injectable()
// export class LoadingService {
//     private loader : any = new LoadingIndicator();

//     constructor() {

//     }

//     public show() {

//         var options = {
//             message: 'Loading...',
//             progress: 0.65,
//             android: {
//                 indeterminate: true,
//                 cancelable: false,
//                 max: 100,
//                 progressNumberFormat: "%1d/%2d",
//                 progressPercentFormat: 0.53,
//                 progressStyle: 1,
//                 secondaryProgress: 1
//             },
//             ios: {
//                 //details: "Additional detail note!",
//                 square: false,
//                 margin: 10,
//                 dimBackground: true,
//                 color: "#4B9ED6",
//                 //mode: // see iOS specific options below
//             }
//         };

//         loader.show(options); // options is optional
//     }
//     public hide() {
//         loader.hide();

//     }
// }