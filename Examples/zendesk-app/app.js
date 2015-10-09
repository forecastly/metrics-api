(function(){

  var CM_BASE             = "https://api.chartmogul.com/v1/",
      CM_CUSTOMER         = "customers/",
      CM_CUSTOMER_SEARCH  = "search?order=-customer-since&email=";


  var customer, user, subscriptions, subscriptionsFetched, activitiesFetched, activities, password, username, customerEmail, customerName, customerLocation, customerId, customerSince, start, stringArray;
  var emailList = [];
  function findLocation(customer) {
    if (customer.address.state) {
      return customer.address.state + ", " + customer.address.country; }
    else if (customer.address.country) { return customer.address.country; }
    else { return "Not found"; }
  }

  function formatActivityType(type) {
    if (type === "new_biz") { return "New Business"; }
    else { return capitalizeFirst(type); }
  }

  function orderByID(arrayOfObjects) {
    arrayOfObjects.sort(function(a, b){
        return a.id < b.id;
      });
  }

  function formatToCurrency(n) {
    n = n.toString();
    start = n.substring(0,n.length-2);
    if (start.length < 1) { return 0; }
    else { return start.replace(/(\d)(?=(\d{3})+$)/g, '$1,'); }
  }

  function timeChange(data) {
    return data.slice(0,-15);
    // For British date format add: .split("-").reverse().join(".");
  }

  function capitalizeFirst(string) {
    string = string.split("");
    stringArray = string[0].toUpperCase() + string.slice(1,string.length).join("");
    return stringArray;
  }

  function ChartMogulApp(app) {
    this.app = app;
    username = app.setting('token');
    password = app.setting('apiKey');
  }

  function CMRequest(path, options) {

    options = options || {};
    return _.extend({
      type: 'GET',
      url: CM_BASE + path,
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + this.btoa(username + ":" + password)
      },
      xhrFields: {
        withCredentials: true
      }
    }, options);
  }

  return {

    defaultState: 'loading',

    requests: {
      fetchCustomer: function(customerEmail) {
        if (emailList.indexOf(customerEmail) > -1) {
          return;
        }
        else {
          emailList.push(customerEmail);
          return CMRequest(CM_CUSTOMER + CM_CUSTOMER_SEARCH + customerEmail);
        }
      },
      fetchActivities: function(customerId) {
        return CMRequest(CM_CUSTOMER + customerId + '/activities');
      },
      fetchSubscriptions: function(customerId) {
        return CMRequest(CM_CUSTOMER + customerId + '/subscriptions');
      },
    },

    events: {

      'app.activated': function() {
        this.app = new ChartMogulApp(this);

        customerEmail = this.ticket().requester().email();
        customerName  = this.ticket().requester().name;
        user = { "email": customerEmail, "name": customerName };

        if (customerEmail) {
          this.ajax('fetchCustomer', customerEmail);
        }
        else {
          this.switchTo('fail', { user: user } );
        }
      },

      'fetchCustomer.done': function(customers) {
        customer        = customers.entries[0];
        customerSince   = timeChange(customer["customer-since"]);
        customerId      = customer.id;
        customerLocation= findLocation(customer);
        this.trigger('getActivities');

        user = {
          "company":                customer.name,
          "customer-since":         customerSince,
          "location":               customerLocation,
          "arr":                    formatToCurrency(customer.arr),
          "email":                  customer.email,
          "mrr":                    formatToCurrency(customer.mrr),
          "status":                 customer.status,
          "address":                customer.address,
          "billing-system-type":    customer["billing-system-type"],
          "billing-system-url":     customer["billing-system-url"],
          "chartmogul-url":         customer["chartmogul-url"],
          "currency":               customer["currency-sign"],
        };
      },

      'fetchCustomer.fail': function(data) {
        if (data.status === 404) {
          this.switchTo('fail', { user: user } );
        }
        else {
          this.switchTo('error', { user: user } );
        }
      },

      'getActivities': function() {
        this.ajax('fetchActivities', customerId);
        this.ajax('fetchSubscriptions', customerId);
      },

      'fetchActivities.done': function(data) {
        activities  = data.entries;
        user.events = [];

        for (var i = 0; i < 5; i++ ) {
          console.log(activities[i]);
          if (i > activities.length -1) { break; }
          user.events.push({
            "mrr":  formatToCurrency(activities[i]["activity-mrr"]),
            "date": timeChange(activities[i].date),
            "type": formatActivityType(activities[i].type),
            "id": activities[i].id.toString(),
            "currency": activities[i]["currency-sign"],
          });
        }
        orderByID(user.events);
        activitiesFetched = true;
        this.trigger('readyState');
      },

      'fetchActivities.fail': function() {
        activitiesFetched = true;
        this.trigger('readyState');
      },

      'fetchSubscriptions.done': function(data) {

        subscriptions = data.entries;

        user.subs = [];
        for (var i = 0; i < 5; i++ ) {
          if (i > subscriptions.length -1) { break; }
          user.subs.push({
            "id":       subscriptions[i].id.toString(),
            "quantity": subscriptions[i].quantity,
            "plan":     subscriptions[i].plan,
            "status":   capitalizeFirst(subscriptions[i].status),
            "mrr":      formatToCurrency(subscriptions[i].mrr),
            "currency":  subscriptions[i]["currency-sign"],
          });
        }
        orderByID(user.subs);
        subscriptionsFetched = true;
        this.trigger('readyState');
      },

      'fetchSubscriptions.fail': function() {
        subscriptionsFetched = true;
        this.trigger('readyState');
      },

      'readyState': function() {
        if (subscriptionsFetched && activitiesFetched) {
          this.switchTo('CM_APP', { user: user });
        }
      },
    }
  };
}());