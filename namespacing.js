(function() {
        window.App = {
            Models: {},
            Collections: {},
            Views: {}
        };

        template = function(id) {
            return $('#' + id).html();
        };

        // Person Model
        App.Models.Person = Backbone.Model.extend({
            defaults: {
                name: "John Doe",
                age: 30,
                occupation: "Worker",
            },
        });

        App.Collections.People = Backbone.Collection.extend({
            model: App.Models.Person
        });

        App.Views.People = Backbone.View.extend({
            tagName: 'ul',

            initialize: function() {
                //console.log(this.collection);
            },

            render: function() {
                this.collection.each(function(person){
                    var personView = new App.Views.Person({ model: person });
                    this.$el.append(personView.render().el);
                }, this);

                return this;
            },
        });

        App.Views.Person = Backbone.View.extend({
            tagName: 'li',

            template: _.template(template('personTemplate')),

            render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
            },
        });

        peopleCollection = new App.Collections.People([
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

        peopleView = new App.Views.People({collection: peopleCollection});
        $(document.body).append(peopleView.render().el);
    }
)();
