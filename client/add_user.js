function showAddUserForm() {
    $('#create-user-form').show(100);
    $('#add-user-button').hide();
    $('#userEmail').focus();
}

function hideAddUserForm() {
    $('#create-user-form').hide(100);
    $('#add-user-button').show();
}

Template.add_user.events = {
    'click #add-user-button': function (e) {
        e.preventDefault();
        showAddUserForm();
    },

    'click #user-cancel': function (e) {
        e.preventDefault();
        hideAddUserForm();
    },

    'submit #create-user-form': function (e) {
        var email = $('#userEmail').val(),
            firstName = $('#userFirstname').val(),
            lastName = $('#userLastname').val(),
            isActive = $('#userActive').is(':checked');

        e.preventDefault();
        Users.insert({
            email: email,
            firstname: firstName,
            lastname: lastName,
            active: (isActive ? "yes" : "no")
        });
        hideAddUserForm();
    }
};
