require('cloud/app.js');


// Use cloud code to retrieve profile data in server end
Parse.Cloud.define("facebookProfile", function(request, response) {
  // Important! useMasterKey to access authData information
  Parse.Cloud.useMasterKey();

  new Parse.Query(Parse.User).get(request.params.user_id).then(function(user) {
    var authData = user.get("authData");

    // Quit early for users who aren't linked with Facebook
    if (authData === undefined || authData.facebook === undefined) {
      response.success(null);
       return;
    }

    return Parse.Cloud.httpRequest({
      method: "GET",
      url: "https://graph.facebook.com/me",
      params: {
        access_token: authData.facebook.access_token,
        fields: "name",
      },
    });

  }).then(function(json) {
    response.success(json.data);

  // Promises will let you bubble up any error, similar to a catch statement
  }, function(error) {
    response.error(error);
  });
});