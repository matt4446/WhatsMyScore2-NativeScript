import 'reflect-metadata';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import frame = require("ui/frame");
import application = require("application");

application.onUncaughtError = (error) => {
    console.error(error.message);
    console.error(error.nativeError);
};

application.mainModule = "app";
application.start();