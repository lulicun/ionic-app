'use strict';

app.factory('Config', function() {

  var env = 'local';

  var config = {
    local: {
      apiEndpoint: 'http://localhost:8090/'
    },
    dev: {
      apiEndpoint: 'http://54.174.163.167:8090/'
    },
    prod: {

    }
  }

  return {
    apiEndpoint: function() {
      return config[env].apiEndpoint;
    }
  };
});
