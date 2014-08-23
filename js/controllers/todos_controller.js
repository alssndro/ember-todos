Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      var title = this.get("newTitle");
      console.log("1 " + title)
      if (!title) { console.log("2 " + title); return false; }
      if (!title.trim()) { console.log("3 " + title);return; }

      // Create the new Todo
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the New Todo text field
      this.set('newTitle', '');

      // Save the model
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true); // Returns instance of EmberArray

      // 'invoke' part of EmberArray API, which invokes a method on EACH object in the Array
      // if the method exists on the object
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },
  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('inflection'),
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),
  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted')
});
