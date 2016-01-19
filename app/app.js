var application = require("application");
if (application.android) {
    application.onLaunch = function () {
        console.log("Whats My Score - onLaunch");
    };
}
if (application.ios) {
    application.on("launch", function (args) {
        // TODO: It would be nice if this was ios-specific property on the action bar and static property on application.ios.
        //UIApplication.sharedApplication().statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(function () {
            //UIApplication.sharedApplication().keyWindow.backgroundColor = UIColor.blackColor();
        }, 1);
    });
}
application.onUncaughtError = function (error) {
    console.error(error.message);
    console.error(error.nativeError);
};
application.mainModule = "pages/mainPage/mainPage";
application.cssFile = "./app.css";
application.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Img6L1doYXRzTXlTY29yZTIvV2hhdHNNeVNjb3JlTmF0aXZlU2NyaXB0LyIsInNvdXJjZXMiOlsiYXBwL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFPLFdBQVcsV0FBVyxhQUFhLENBQUMsQ0FBQztBQUU1QyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQixXQUFXLENBQUMsUUFBUSxHQUFHO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQSxJQUFJO1FBQ3pCLHFIQUFxSDtRQUNySCxtR0FBbUc7UUFDbkcsVUFBVSxDQUFDO1lBQ1IscUZBQXFGO1FBQ3hGLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFdBQVcsQ0FBQyxlQUFlLEdBQUcsVUFBQyxLQUFLO0lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUNGLFdBQVcsQ0FBQyxVQUFVLEdBQUcseUJBQXlCLENBQUM7QUFDbkQsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7QUFDbEMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDIn0=