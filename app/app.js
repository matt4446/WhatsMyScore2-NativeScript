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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJhcHAvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRTVDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLFdBQVcsQ0FBQyxRQUFRLEdBQUc7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQixXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBLElBQUk7UUFDekIscUhBQXFIO1FBQ3JILG1HQUFtRztRQUNuRyxVQUFVLENBQUM7WUFDUixxRkFBcUY7UUFDeEYsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsV0FBVyxDQUFDLGVBQWUsR0FBRyxVQUFDLEtBQUs7SUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBQ0YsV0FBVyxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQztBQUNuRCxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMifQ==