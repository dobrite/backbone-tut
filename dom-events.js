// left off at 4:50

(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };

    App.Models.Task = Backbone.Model.extend({});

    App.Collections.Tasks = Backbone.Collection.extend({
      model: App.Models.Task,
    });

    App.Views.Tasks = Backbone.View.extend({
      tagName: 'ul',

      render: function() {
        this.collection.each(this.addOne, this);
        return this;
      },

      addOne: function(task){
        //create a new child view
        var taskView = new App.Views.Task({ model: task });

        //append to the root element
        this.$el.append(taskView.render().el);
      }
    });

    App.Views.Task = Backbone.View.extend({
      tagName: 'li',

      template: template('taskTemplate'),

      events: {
        'click .edit': 'editTask'

      },

      editTask: function() {
        var newTask = prompt('WHAT?', this.model.get('title'));
        this.model.set('title', newTask.title);
      },

      render: function() {
        var template = this.template(this.model.toJSON());
        this.$el.html( template );
        return this;
      }
    });

    var tasksCollection = new App.Collections.Tasks([
      {
        title: 'Go to the store',
        priority: 4,
      },
      {
        title: 'Go to the beach',
        priority: 3,
      },
      {
        title: 'Go to the movies',
        priority: 5,
      }
    ]);

    var tasksView = new App.Views.Tasks({ collection: tasksCollection });

    $('.tasks').html(tasksView.render().el);
})();
