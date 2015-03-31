Template.signIn.events({
  'click [data-action=sign-in]': function (event, template) {
    Meteor.loginWithFacebook({}, function (error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
      }
    });
  }
});
