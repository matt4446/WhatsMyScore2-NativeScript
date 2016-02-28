import {nativeScriptBootstrap} from "nativescript-angular/application";
import {bind, provide, Inject, Component} from 'angular2/core';
import {APP_BASE_HREF} from "angular2/router";

import {AppMain } from "./app-main";

//import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router/ns-router";

nativeScriptBootstrap(AppMain, []);
