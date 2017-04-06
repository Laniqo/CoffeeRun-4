(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@csu\.student$/.test(email);
        },

        ifEmailExists: function(obj) {
            var email = $('[name="emailAddress"]').val();
            var emailExists = false;
            var msg = '';

            console.log('email is ' + email);

            Object.keys(obj).forEach(function(item) {
                if (email === item) {
                    console.log(email + " is the same as " + item)
                    msg = email + ' already Exists! Try a new one!';
                    emailExists = true;
                }

            });

            $('[name="emailAddress"]').get(0).setCustomValidity(msg);

        },

        //if str has 'decaf' and num is greater than 20
        // return false
        decafValidation: function(str, num) {
            if (/\bdecaf\b/.test(str)) {
                console.log('decaf is found');
                if (num < 20) {
                    return false;
                } else {
                    return true;
                }
            }
        }


    };


    App.Validation = Validation;
    window.App = App;
})(window);
