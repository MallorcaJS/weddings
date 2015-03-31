Meteor.publish('products', function() {
  return Products.find();
});


Meteor.publish('weddings', function() {
  return Weddings.find({});
});

Meteor.publish('weddingsSearch', function(query, limit) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Weddings.search(query);
});


Meteor.publishComposite('wedding', function(_id) {
  return {
    find: function() {
      return Weddings.find({_id: _id});
    },
    children: [
      {
        find: function(wedding) {
          return Meteor.users.find({_id: wedding.userId});
        }
      },
      {
        find: function(wedding) {
          return Meteor.users.find({_id: wedding.attendeesIds}, {fields: {imageUrl: true}});
        }
      },
      {
        find: function(wedding) {
          return Comments.find({weddingId: wedding._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});


Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});




Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Products.find({_id: {$in: user.profile.votedProductIds}});
        }
      },
      {
        find: function(user){
          return Weddings.find({_id: {$in: user.profile.attendingWeddingsIds}});
        }
      }
    ]
  };
});
