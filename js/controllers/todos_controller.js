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
  }.property('@each.isCompleted'), // Computed property that relies on all of the items
  // in an array to determine its value (denoted by the special key '@each').
  // This instructs Ember.js to update bindings and fire observers for this computed property when one of the following four events occurs:
  //  - The isCompleted property of any of the objects in the todos array changes.
  //  - An item is added to the array.
  //  - An item is removed from the array.
  //  - The array is changed to a different one.

  // Returns true or false depending if all todos are completed
  allAreDone: function(key, value) { // <-- Define key/value parameters when we might  want to not only get but also SET the value of a property

    // We are simply getting the value of this property, not setting. In this case 
    // it is being used to populate the current value of the checkbox in the template
    if (value === undefined) { 
      return !!this.get('length') && this.isEvery('isCompleted'); 
    } else {
      // The checkbox must have been clicked by the user, since there is a value
      // passed in
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted') // Like the above 'completed' computed property,
  // if the isCompleted property of any todo changes, the allAreDone property will be recomputed.
});
