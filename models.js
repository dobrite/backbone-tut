var Person = Backbone.Model.extend({
    defaults: {
        name: "John Doe",
        age: 30,
        occupation: "Worker",
    },

    validate: function(attrs) {
        if (attrs.age < 0){
            return 'booo';
        }
    },

    work: function() {
        return this.get.name + " is working";
    }
});

