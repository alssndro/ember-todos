Todos.Router.map(function(){
  // When the app's URL matches '/', render the 'todos' template
  this.resource('todos', { path: '/' }, function(){
    // additional child routes
    this.route('active');
    this.route('completed');
    this.route('all');
  });
});

// Ember favours convention over configuration, so before we created this custom
// route, it provided a default Route, which simply rendered the 'todos' template
Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo){
      return !todo.get('isCompleted');
    });
  },
  // Normally transitioning into a new route changes the template rendered into 
  // the parent {{outlet}}, but in this case we'd like to reuse the existing todos/index template
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo){
      return todo.get('isCompleted');
    });
  },
  // Normally transitioning into a new route changes the template rendered into 
  // the parent {{outlet}}, but in this case we'd like to reuse the existing todos/index template
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
