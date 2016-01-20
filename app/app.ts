import 'reflect-metadata';
import {App} from "./decorators/app";
import {Page} from "./decorators/page";
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import frame = require("ui/frame");
import application = require("application");

application.onUncaughtError = (error) => {
    console.error(error.message);
    console.error(error.nativeError);
};

application.mainModule = "mainPage";
application.start();