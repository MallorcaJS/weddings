Template.weddings.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('weddings');
  }.bind(this));
};

Template.weddings.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.weddings.helpers({
  weddings: function () {
    return Weddings.find({}, {sort: {createdAt: -1, name: -1}});
  }
});
