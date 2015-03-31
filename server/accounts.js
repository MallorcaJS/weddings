Meteor.startup(function() {

  ServiceConfiguration.configurations.remove({
      service: 'facebook'
  });
   
  ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
  });



});

Accounts.onCreateUser(function(options, user) {
  user.email = user.services['facebook'].email;
  facebookId = user.services['facebook'].id;
  user.imageUrl = getFace(facebookId);
  user.profile = options.profile;
  return user;
});


getFace = function(id){
  return HTTP.call("GET","https://graph.facebook.com/v2.2/" + id + "/picture?redirect=false&type=large").data.data.url
}


Accounts.onLogin = function(){
  id = Meteor.user().services['facebook'].id;
  Meteor.wrapAsync(getFace(id));
}