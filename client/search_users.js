Template.search_users.events = {
    'keyup #search-query': function(e) {
        var $target = $(e.target),
            value = $target.val();

        Session.set('searchQuery', value);
    }
};
