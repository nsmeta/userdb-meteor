Users = new Meteor.Collection("users");

if(Meteor.is_client) {
    Meteor.subscribe("users");

    Template.all_users.users = function () {
        var query = Session.get('searchQuery') || '';
            searchByQuery = (query !== '');
        if(searchByQuery) {
            return Users.find({firstname: query}, {sort: {email: 1}});
        }
        return Users.find({}, {sort: {email: 1}});
    };
    Template.all_users.active_is = function (status) {
        return this.active === status;
    };
    Template.all_users.active_isnt = function (status) {
        return this.active !== status;
    };


    Template.all_users.events = {
        'change .activate-checkbox': function(e) {
            var $target = $(e.target),
                docid = $target.attr('docid'),
                isActive = $target.is(':checked');

            Users.update({'_id': docid}, {'$set':
                {
                    active: (isActive ? "yes" : "no")
                }
            });
        },

        'click .delete-user': function(e) {
            var $target = $(e.target),
                docid = $target.attr('docid');
            e.preventDefault();

            Users.remove({'_id': docid});
        }
    };
}

if(Meteor.is_server) {
    Meteor.startup(function () {
        Meteor.publish("users", function () {
            return Users.find({}, {fields: {password: false}});
        });
    });
}
