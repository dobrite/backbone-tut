// Person Model
var Person = Backbone.Model.extend({
    defaults: {
        name: "John Doe",
        age: 30,
        occupation: "Worker",
    },
});

var PeopleCollection = Backbone.Collection.extend({
    model: Person
});

var PersonView = Backbone.View.extend({
    tagName: 'li',

    template: '#personTemplate', //_.template($('#personTemplate').html()),

    initialize: function() {
        this.render();
    },

    render: function() {
      var template = _.template($(this.template).html(), this.model.toJSON());
      this.$el.html( template );
    },
});

var peopleCollection = new PeopleCollection([
  {
    name: 'bill clinton',
    age: 89,
    occupation: 'cheese shop owner',
  },
  {
    name: 'sally',
    age: 42,
    occupation: 'teacher',
  },
  {
    name: 'pepper',
    age: 5,
    occupation: 'dog'
  }
]);

console.log(peopleCollection);
