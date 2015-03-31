Meteor.users.before.insert(function (userId, doc) {
  doc.profile.votedProductIds = [];
  doc.profile.attendingWeddingsIds = [];
});

Meteor.users.helpers({
  votedProducts: function () {
    return Products.find({_id: {$in: this.profile.votedProductIds}});
  },
  attendingWeddings: function(){
    return Weddings.find({_id: {$in: this.profile.attendingWeddingsIds}})
  }
});
