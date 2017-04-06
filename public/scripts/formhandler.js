(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    var i;
    var exists = {
        val: false
    }

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No Selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        //More code to go here

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);

            fn(data).then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    }

    FormHandler.prototype.addInputHandler = function(fn, exists, obj) {
        //console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var x;
            var message = '';
            var res;

            //if function is valid sample@csu.student
            if (fn(emailAddress)) {
                //event.target.setCustomValidity('');
                obj.getAll(exists);

            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    }

    FormHandler.prototype.coffeeOrderHandler = function(fn) {

        var order;
        var msg = '';
        var val;

        //coffee order handler
        this.$formElement.on('input change', '[name="coffee"]', function(event) {
            order = event.target.value;

            if (fn(order, val)) {
                msg = 'Cannot have an order of ' + order + ' with strength ' + val;
                event.target.setCustomValidity(msg);
            } else {
                event.target.setCustomValidity('');
            }
        });

        this.$formElement.on('input change', '#strengthLevel', function(event) {
            event.preventDefault();
            val = event.target.value;
            console.log(val);

            if (fn(order, val)) {
                msg = 'Cannot have an order of ' + order + ' with strength ' + val;
                $('[name="coffee"]').get(0).setCustomValidity(msg);
            } else {
                $('[name="coffee"]').get(0).setCustomValidity('');
            }

        });

    }

    //coffee strength handler
    FormHandler.prototype.coffeeRangeHandler = function() {
        this.$formElement.on('input change', '#strengthLevel', function(event) {
            event.preventDefault();
            //console.log($(this).val());

        });
    }



    App.FormHandler = FormHandler;
    window.App = App;


})(window);
