import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";

platformNativeScriptDynamic({
    cssFile : "app.css",
    startPageActionBarHidden : true
}).bootstrapModule(AppModule);
