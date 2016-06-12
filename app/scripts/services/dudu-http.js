'use strict';

/**
 * @ngdoc service
 * @name dataduduR3App.duduHttp
 * @description
 * # duduHttp
 * Service in the dataduduR3App.
 */
angular.module('dataduduR3App')
.service('duduHttp', function ($resource, config) {
  return $resource(config.END_POINT+'/:controller/:_action/:item/:id/:_type/:type_id', {
    id: '@_id',
    controller: 'duduhttp'
  },{
    /**
     * List My DuduHTTP

     To list my DuduHTTP, send an HTTP GET to http://api.datadudu.cn/duduhttp
     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     */
    list: {
      method: 'GET'
    },
    /**
     * View a DuduHTTP by ID

     To view a DuduHTTP, send an HTTP GET to http://api.datadudu.cn/duduhttp/HTTP_ID

     Replace HTTP_ID to your DuduHTTP http_id



     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     */
    get: {
      method: 'GET'
    },
    /**
     * Create a DuduHTTP

     To create a DuduHTTP, send an HTTP POST to http://api.datadudu.cn/duduhttp


     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:

     http_name (string): name of this DuduHTTP
     method  (string) – choose between [GET, POST, PUT, DELETE] (required)
     URL (string) –Enter the address of the website you are requesting data from or writing data to starting with either http:// or https://. (required)
     auth_username(string): HTTP Auth Username ,If your URL requires authentication, enter the username for authentication to access private channels or websites. (optional)
     auth_password (string): HTTP Auth Password ,If your URL requires authentication, enter the password for authentication to access private channels or websites. (optional)
     host (string): If your DuduHTTP request requires a host address, enter the domain name here. For example, api.datadudu.cn(optional)
     content_type (string): Enter the MIME or form type of the request content. For example, application/x-www-form-urlencoded (optional)
     headers (JSON): if your DuduHTTP request requires custom headers, enter the information here. You must specify the name of the header and a value.  (optional)
     Example value:

     [{"name":"headerName1","value":"headerValue1"},{"name":" headerName2","value":" headerValue2"}]

     body (string): Enter the message you want to include in your request.
     */
    createDuduHttp: {
      method: 'POST',
      params: {
        _json: true
      }
    },
    /**
     * Update a DuduHTTP

     To update a DuduHTTP, send an HTTP PUT to http://api.datadudu.cn/duduhttp/HTTP_ID

     Replace HTTP_ID to your DuduHTTP http_id



     Valid request parameters:
     account_key or token_id (string) –account_key  or token_id for internal use, obtained through login API. (required)
     JSON Body FIELDS:
     http_name (string): name of this DuduHTTP
     method  (string) – choose between [GET, POST, PUT, DELETE] (required)
     URL (string) –Enter the address of the website you are requesting data from or writing data to starting with either http:// or https://. (required)
     auth_username(string): HTTP Auth Username ,If your URL requires authentication, enter the username for authentication to access private channels or websites. (optional)
     auth_password (string): HTTP Auth Password ,If your URL requires authentication, enter the password for authentication to access private channels or websites. (optional)
     host (string): If your DuduHTTP request requires a host address, enter the domain name here. For example, api.datadudu.cn(optional)
     content_type (string): Enter the MIME or form type of the request content. For example, application/x-www-form-urlencoded (optional)
     headers (JSON): if your DuduHTTP request requires custom headers, enter the information here. You must specify the name of the header and a value.  (optional)
     Example value:
     [{"name":"headerName1","value":"headerValue1"},{"name":" headerName2","value":" headerValue2"}]
     body (string): Enter the message you want to include in your request.
     */
    updateDuduHttp: {
      method: 'put',
      params: {
        _json: true
      }
    },
    /**
     * Delete a DuduHTTP

     To delete a DuduHTTP, send an HTTP DELETE to http://api.datadudu.cn/duduhttp/HTTP_ID

     Replace HTTP_ID to your DuduHTTP http_id



     Valid request parameters:
     account_key or token_id (string) – account_key  or token_id for internal use, obtained through login API. (required)
     */
    deleteDuduHttp: {
      method: 'delete',
      params: {
        _json: true
      }
    }

  });
});
