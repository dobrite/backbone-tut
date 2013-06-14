var Person = Backbone.Model.extend({
    defaults: {
        name: "John Doe",
        age: 30,
        occupation: "Worker",
    },
});

var PersonView = Backbone.View.extend({
    tagName: 'li',

    initialize: function() {
        console.log(this.model);
    },

    render: function() {
        this.$el.html(this.model.get('name') + ' (' + this.model.get('age') + ' ) - ' + this.model.get('occupation'));
    },
});

var person = new Person();
var personView = new PersonView({model: person});
