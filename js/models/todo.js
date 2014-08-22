// Creates a new class 'Todo', and places it in the app's namespace.
// Each Todo has two attributes, 'title' and 'isCompleted'
Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

// Create some fixture
Todos.Todo.FIXTURES = [
  {
    id: 1,
    title: "Learn Ember.js",
    isCompleted: false
  },
  {
    id: 2,
    title: "Hook it up to an API",
    isCompleted: false
  },
  {
    id: 3,
    title: "Start the ember.js tutorial",
    isCompleted: true
  }
];
