//To recieve the window object for use inside the function body and retrieves
//the constructors you defines as part of the window.App namespace
(function(window){
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    var webshim = window.webshim;
    var myTruck = new Truck('ncc-1701', remoteDS);

    window.myTruck = myTruck;

    var formHandler = new FormHandler(FORM_SELECTOR);
    var checkList = new CheckList(CHECKLIST_SELECTOR);

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSubmitHandler(function(data) {
        return myTruck.createOrder.call(myTruck, data).then(function(){
        checkList.addRow.call(checkList, data);
      }, function(){
          alert('Server unreachable. Try again later');
      });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail, Validation.ifEmailExists, remoteDS);
    formHandler.coffeeOrderHandler(Validation.decafValidation);
    formHandler.coffeeRangeHandler();

    myTruck.printOrders(checkList.addRow.bind(checkList));

    //webshim.polyfill('forms forms-ext');
    //webshim.setOptions('forms', { addValidators: true, lazyCustomMessages: true });

})(window);
