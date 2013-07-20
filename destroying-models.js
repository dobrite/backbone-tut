(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };

    App.Models.Task = Backbone.Model.extend({
      validate: function(attrs) {
        if ( ! $.trim(attrs.title) ) {
          return 'invalid';
        }
      }
    });

    App.Collections.Tasks = Backbone.Collection.extend({
      model: App.Models.Task
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

      initialize: function() {
          this.model.on('change', this.render, this);
          //confirmation that the model has been destroyed
          this.model.on('destroy', this.remove, this);
      },

      events: {
        'click .edit': 'editTask',
        'click .delete': 'destroy'
      },

      editTask: function() {
        var newTaskTitle = prompt('WHAT?', this.model.get('title'));
        if ( ! newTaskTitle) return;
        this.model.set({'title': newTaskTitle}, {validate: true});
      },

      destroy: function() {
        this.model.destroy();
      },

      remove: function() {
        this.$el.remove();
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
