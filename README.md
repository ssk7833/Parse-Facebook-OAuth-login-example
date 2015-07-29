# Parse-Facebook-OAuth-login-example
This is a simple OAuth login to Facebook in Parse CloudCode and hosting. It shows how to login with Facebook and retrieve data with Facebook Graph API by using [parse-facebook-user-session](https://github.com/ParsePlatform/parse-facebook-user-session).

You can check out the demo at [loginexample.parseapp.com](https://loginexample.parseapp.com/).

Setup
-----

1. Created a new app on Parse. Please check [quickstart hosting](https://www.parse.com/apps/quickstart#hosting).

2. Type `parse new` in the directory where this
README resides, authenticate with your Parse credentials,
and choose the app name you created.

3. Delete `public/index.html`

4. Edit `cloud/app.js` and specify your `clientId` and `appSecret` with your Facebook App.

5. Type `parse deploy`. This deploys your app to Parse.

6. Now, we'll need to configure the url where you can
reach your app. Go to your app's setting page and set
a unique subdomain for your Web Hosting url.

7. Go to Facebook Developers and assign the Site URL to yoursubdomain.parseapp.com.

8. Go to yoursubdomain.parseapp.com and view your copy of example!
