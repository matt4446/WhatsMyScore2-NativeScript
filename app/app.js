var application = require("application");
if (application.android) {
    application.onLaunch = function (intent) {
        console.log("onLaunch");
        application.android.onActivityStarted = function (activity) {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(null);
            }
        };
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
application.mainModule = "pages/startPage";
// application.mainModule = "profile-main";
application.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQU8sV0FBVyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRTVDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxNQUFNO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLFFBQVE7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQixXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBLElBQUk7UUFDekIscUhBQXFIO1FBQ3JILG1HQUFtRztRQUNuRyxVQUFVLENBQUM7WUFDUixxRkFBcUY7UUFDeEYsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsV0FBVyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQywyQ0FBMkM7QUFDM0MsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDIn0=