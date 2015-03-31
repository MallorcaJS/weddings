Meteor.methods({
  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  },

  'Weddings.attend': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.attendingWeddingsIds).include(_id)) {
      return;
    }

    Weddings.update({_id: _id}, {$inc: {numberOfAttendees: 1}, $addToSet: {attendeesIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.attendingWeddingsIds': _id}});
  },

  'Weddings.remove': function(id){
    if (!Meteor.user()){
      return;
    }
    Weddings.remove(id);
  }
});
