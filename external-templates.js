var Person = Backbone.Model.extend({
    defaults: {
        name: "John Doe",
        age: 30,
        occupation: "Worker",
    },
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

var person = new Person();
var personView = new PersonView({model: person});
