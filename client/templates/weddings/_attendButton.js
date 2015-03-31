Template._attendButton.events({
  'click': function (event, template) {
    event.preventDefault();

    if (!Meteor.user()) {
      IonModal.open('signIn');
      return;
    }

    Meteor.call('Weddings.attend', this._id);
  }
});

Template._attendButton.helpers({
  isAttendingClass: function () {
    if (!Meteor.user()) {
      return;
    }
    if(_(Meteor.user().profile.votedProductIds).contains(this._id)) {
      return 'has-voted';
    }
  }
});
