(function(window) {
    'use strict';
    var App = window.App || {};

    //constructor
    //truckId is identifier
    //db holds the customer's email address and coffee order
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }


    //order = {emailAddress: 'x@y.com', coffee: 'coffeeType'}
    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
        //return this;
    };

    Truck.prototype.removeOrder = function(key) {
        this.db.remove(key);
    }
    //removes item from db using custeomer's email add
    //customerId = emailAddress
    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    //Rather than using this.db.get(id) to get the orders,
    //I am passing the indexed array at each iteration of the
    //forEach loop and pass it to the showOrder() function
    //which is already tested as working properly
    Truck.prototype.printOrders = function(printFn) {
      return this.db.getAll().then(function(orders){
        var customerIdArray = Object.keys(orders);

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id, index, arr) {
            console.log(orders[id]);
            if(printFn){
              printFn(orders[id]);
            }

        }.bind(this));
      }.bind(this));
        var newArr = Object.values(this.db.getAll());
        return newArr;
    };



    App.Truck = Truck;
    window.App = App;

})(window);
