Template.weddingsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('wedding', Router.current().params._id);
  }.bind(this));
};

Template.weddingsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.weddingsShow.helpers({
  wedding: function () {
    return Weddings.findOne({_id: Router.current().params._id});
  },

  comments: function () {
    return Comments.find({weddingId: Router.current().params._id}, {sort: {createdAt: -1}});
  }
});

Template.weddingsShow.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {weddingId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }

});
