import {AppRoutingService} from './context/router.context';
import { Component } from "@angular/core";
import {Logger} from './providers/logger';
import { PageRoute } from 'nativescript-angular';

@Component({
  selector: "my-app",
  template: `
    <page-router-outlet></page-router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {
  // Your TypeScript logic goes here

    public constructor(private logger: Logger) 
    {
    }
}
