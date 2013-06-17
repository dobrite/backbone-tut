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

var PeopleView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
        //console.log(this.collection);
    },

    render: function() {
        this.collection.each(function(person){
            var personView = new PersonView({ model: person });
            this.$el.append(personView.render().el);
        }, this);

        return this;
    },
});

var PersonView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#personTemplate').html()),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
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

var peopleView = new PeopleView({collection: peopleCollection});
$(document.body).append(peopleView.render().el);
