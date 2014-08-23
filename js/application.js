// Creates a new Ember App
window.Todos = Ember.Application.create();

// Want to use fixtures
// Adapters are responsible for communicating with a source of data for
// the application (usually a web API, but here we use fixture data
// Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

// Use a fixture adapter that uses localstorage to persist between application
// loads
Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todos-ember-js'
});
