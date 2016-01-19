import 'reflect-metadata';
import {Component} from 'angular2/core';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';

//import { StartPage } from "../startPage/startPage";


@Component({
    selector: "main",
    template:  `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
</StackLayout>
`
})
export class MainPage
{
    public Message: string = "Hi";
}

export function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = "";

    console.log('BOOTSTRAPPING...');

    nativeScriptBootstrap(MainPage, []).then((appRef) => {
        console.log('ANGULAR BOOTSTRAP DONE.');
    }, (err) =>{
        console.log('ERROR BOOTSTRAPPING ANGULAR');
        let errorMessage = err.message + "\n\n" + err.stack;
        console.log(errorMessage);

        let view = new TextView();
        view.text = errorMessage;
        topmost().currentPage.content = view;
    });
}