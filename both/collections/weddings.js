Weddings = new Mongo.Collection('weddings');

Weddings.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Weddings.helpers({
  datePosted: function () {
    return moment(this.createdAt).format('M/D');
  },
  dateOfWedding: function(){
    return moment(this.datel).format('dddd DD MMMM YYYY');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  attendees: function () {
    return Meteor.users.find({_id: {$in: this.attendeesIds}}, {fields: {imageUrl: 1, profile: 1}});
  }
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Weddings.search = function(query) {
  if (!query) {
    return;
  }
  return Weddings.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Weddings.attachSchema(new SimpleSchema({
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Wedding Name'
    },
    max: 200
  },
  place: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Wedding Place'
    }
  },
  date: {
    type: Date,
    autoform:{
      'label-type': 'placeholder',
      placeholder: 'When is the wedding?'
    }
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  voterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  attendeesIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numberOfAttendees: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfVotes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfComments: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  createdAt: {
    type: Date
  }
}));
