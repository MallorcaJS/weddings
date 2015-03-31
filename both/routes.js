Router.route('/', {
  name: 'home',
  template: 'weddings'
});

Router.route('/trending',{
  name: 'trending'
});

Router.route('/recent', {
  name: 'recent'
});

Router.route('/products/:_id', {
  name: 'products.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/notifications', {
  name: 'notifications'
});

Router.route('/profile', {
  name: 'profile'
});


Router.route('/weddings', {
  name: 'weddings'
});


Router.route('/weddings/:_id', {
  name: 'weddings.show'
});