// Creates a new Ember App
window.Todos = Ember.Application.create();

// Want to use fixtures
// Adapters are responsible for communicating with a source of data for
// the application (usually a web API, but here we use fixture data
Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
