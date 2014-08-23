// Controllers decorate models with display logic.
//
// In general, the controller has properties itself, that represent things that
// are not persisted to the server.
//
// e.g imagine a BlogPost model with properties title, date, author.
// These properties can be displayed in the template using {{title}} etc.
// A vanilla controller simply acts as a proxy for the model properties.
// The template knows nothing about the model, only its controller.
// We could add a feature that toggles the display of the BlogPost text.
// We *could* store this as a property of the model, but really it is strictly
// a display concern, so put it on the controller instead.
// Now logic related to the data model is separated from presentation (also easier to unit test).
//
// Coupling
// Templates get their properties form controllers, which decorate a model.
// This means templates know about controllers, and controllers know about models.
// But the reverse is not true.
// A model knows nothing about which controllers (if any) decorate it, and controllers
// do not know which views are presenting its properties.
// Templates don't need to know about the model directly since all its properties
// come from its controller.
//
// A controller gets the model it represents from its route handler
//
// For convenience, Ember.js provides controllers that proxy properties from 
// their models so that you can say {{name}} in your template rather than {{model.name}}. 
// An Ember.ArrayController proxies properties from an Array, and an Ember.ObjectController
// proxies properties from an object.
//
// In cases like below with 'isCompleted', where the controller AND the model have 
// properties of the same name, the controller property is obviously used.
// 
Todos.TodoController = Ember.ObjectController.extend({
  // The isCompleted property is called from the template to display the current state of the todo
  isCompleted: function(key, value) { // key is the property name, in this case 'isCompleted'
    var model = this.get('model'); // returns the actual model

    // If value is undefined, this property is being used as a getter, so just
    // return the property
    // Else, we must want to set the property, so do that instead
    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property is being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'), // Denotes a computed property, which basically means we 
  // can declare a function as a property. Then we can use it the same way as any other
  // normal, static property
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
      },
      removeTodo: function() {
        var todo = this.get('model');
        todo.deleteRecord();
        todo.save();
    }
  },
  isEditing: false
});
