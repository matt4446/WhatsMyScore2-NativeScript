import frame = require("ui/frame");
import application = require("application");

if(application.android) {
    application.onLaunch = () => {
        console.log("Whats My Score - onLaunch");
    };
}

if (application.ios) {
    application.on("launch", args => {
        // TODO: It would be nice if this was ios-specific property on the action bar and static property on application.ios.
        //UIApplication.sharedApplication().statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(() => {
           //UIApplication.sharedApplication().keyWindow.backgroundColor = UIColor.blackColor();
        }, 1);
    });
}

application.onUncaughtError = (error) => {
    console.error(error.message);
    console.error(error.nativeError);
};
application.mainModule = "pages/mainPage/mainPage";
application.cssFile = "./app.css";
application.start();