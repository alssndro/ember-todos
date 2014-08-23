// Creat the new custom component....
Todos.EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

// ....and register it as a helper
Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
