Template.appLayout.rendered = function () {
  Session.set('currentTab', 'trending');
};

Template.appLayout.events({
  'click [data-action=share-product]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Product',
      buttons: [
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Tweet!');
        }
        if (index === 1) {
          console.log('Email!');
        }
        return true;
      }
    });
  },
  'click [data-action=remove-wedding]': function(event,template){
    IonActionSheet.show({
      titleText: 'Delete Wedding',
      buttons:[
        { text: '<i class="icon ion-remove"></i> Delete' }
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index){
        id = Weddings.findOne()._id;
        Meteor.call('Weddings.remove', id, function(error,result){
          if (error) {return console.log(error);}
          else {
            IonActionSheet.close();
            Router.go('weddings')
          }
        });
      }
    });
  }
});
