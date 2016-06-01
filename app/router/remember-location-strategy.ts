import application = require("application");
import appSettings = require("application-settings");

import { LocationStrategy } from '@angular/common';
import { NgZone, ApplicationRef, Inject, forwardRef } from '@angular/core';

import { topmost } from "ui/frame";
import {   } from "nativescript-angular/router";

interface LocationState {
    state: any,
    title: string,
    url: string,
    queryParams: string,
    isPageNavigation: boolean
}

const key : string = "NSRememberLocationStrategy.Route";
//clone of, but remembers path on application refresh
//https://github.com/NativeScript/nativescript-angular/blob/master/nativescript-angular/router/ns-location-strategy.ts
export class NSRememberLocationStrategy extends LocationStrategy {
    private states = new Array<LocationState>();
    private popStateCallbacks = new Array<(_: any) => any>();

    private _isPageNavigationgBack = false;
    private _isPageNavigatingForward: boolean = false;

    constructor(){
        super();
        
        if(appSettings.hasKey(key)){
            let v = appSettings.getString(key);
            let previousState = JSON.parse(v);
            console.log("NSRememberLocationStrategy appSettings: " + v);
            this.states.push(previousState);
        }
    }
    
    private storeCurrentStateForRefresh(route: {}){
        let v = JSON.stringify(route);
        console.log("NSRememberLocationStrategy.storeCurrentStateForRefresh(): " + v);
        appSettings.setString(key, v);
        
    }

    path(): string {
        console.log("NSRememberLocationStrategy.path()");
        let state = this.peekState();
        return state ? state.url : "/";
    }

    prepareExternalUrl(internal: string): string {
        console.log("NSRememberLocationStrategy.prepareExternalUrl() internal: " + internal);
        return internal;
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`NSRememberLocationStrategy.pushState state: ${state}, title: ${title}, url: ${url}, queryParams: ${queryParams}`);

        let isNewPage = this._isPageNavigatingForward;
        this._isPageNavigatingForward = false;

        let stateValues = {
            state: state,
            title: title,
            url: url,
            queryParams: queryParams,
            isPageNavigation: isNewPage
        };

        this.states.push(stateValues);
        this.storeCurrentStateForRefresh(stateValues);
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`NSRememberLocationStrategy.replaceState state: ${state}, title: ${title}, url: ${url}, queryParams: ${queryParams}`);
        throw new Error("Not implemented");
    }

    forward(): void {
        console.log("NSRememberLocationStrategy.forward");
        throw new Error("Not implemented");
    }

    back(): void {
        if (this._isPageNavigationgBack) {
            // We are navigating to the previous page 
            // clear the stack until we get to a page navigation state
            let state = this.states.pop();
            let count = 1;
            while (!state.isPageNavigation) {
                state = this.states.pop();
                count++;
            }
            console.log("NSRememberLocationStrategy.back() while navigating back. States popped: " + count)
            this.callPopState(state, true);
        } else {
            let state = this.peekState();
            if (state.isPageNavigation) {
                // This was a page navigation - so navigate through frame.
                console.log("NSRememberLocationStrategy.back() while not navigating back but top state is page - will call frame.goback()")
                topmost().goBack();
            } else {
                // Nested navigation - just pop the state
                console.log("NSRememberLocationStrategy.back() while not navigating back but top state is not page - just pop")
                this.callPopState(this.states.pop(), true);
            }
        }

    }

    onPopState(fn: (_: any) => any): void {
        console.log("NSRememberLocationStrategy.onPopState");
        this.popStateCallbacks.push(fn);
    }

    getBaseHref(): string {
        console.log("NSRememberLocationStrategy.getBaseHref()");
        return "";
    }

    private callPopState(state: LocationState, pop: boolean = true) {
        var change = { url: state.url, pop: pop };
        for (var fn of this.popStateCallbacks) {
            fn(change);
        }
    }

    private peekState(): LocationState {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    }

    // Methods for syncing with page navigation in PageRouterOutlet
    public beginBackPageNavigation() {
        console.log("NSLocationStrategy.startGoBack()");
        if (this._isPageNavigationgBack) {
            throw new Error("Calling startGoBack while going back.")
        }
        this._isPageNavigationgBack = true;
    }

    public finishBackPageNavigation() {
        console.log("NSLocationStrategy.finishBackPageNavigation()");
        if (!this._isPageNavigationgBack) {
            throw new Error("Calling endGoBack while not going back.")
        }
        this._isPageNavigationgBack = false;
    }

    public isPageNavigatingBack() {
        return this._isPageNavigationgBack;
    }

    public navigateToNewPage() {
        console.log("NSLocationStrategy.navigateToNewPage()");
        if (this._isPageNavigatingForward) {
            throw new Error("Calling navigateToNewPage while already navigating to new page.")
        }
        this._isPageNavigatingForward = true;
    }
}