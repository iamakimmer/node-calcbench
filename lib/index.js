'use strict';

var request = require('request');

function Calcbench(email, password) {

  if (!email) {
    throw new Error('Please provide an email');
  }

	if (!password) {
    throw new Error('Please provide a password');
  }

  var jar = request.jar(); //maintain cookies on sub



  function _makeRequest(options, callback) {
    var baseRequest = request.defaults({
      baseUrl: 'https://www.calcbench.com/api',
      jar: jar,
      json: true,
      headers: { 
      	'content-type' : 'application/json' 
			}
    });

    baseRequest(options, function(error, response, body) {
    	if (error) {
    		return callback(error);
    	}
      if (response.statusCode > 399) {
        callback(error, body);
        return;
      }
      callback(null, body);
    });
  }

  this.login = function(auth, callback) {
    var options = {
      url: 'https://www.calcbench.com/account/LogOnAjax',
      method: 'POST',
      json: true,
      jar: jar,
      body: { 
      	email: auth.email,
      	password: auth.password
      }
    };
    request.post(options, function(error, response, body) {
    	callback(error, response);
    });
  };

  // TODO: what standard do you use for commenting? 

  /**
   * Normalized metrics for comparisons between companies, the data behind the benchmarking page.
   * @param  {options}   query    The term to search for. //TODO: do you specify availble options here?
   * @param  {Function} callback The function to call once the search results
   *  are available.
   * @example
   */
  this.normalizedValues = function(options, callback) {
    var request = {
      url: '/NormalizedValues',
      method: 'POST',
      body: options
    };
    _makeRequest(request, callback);
  };

  /**
	 * Download statements as they are reported by companies in their filings. Calcbench "folds" the statements so you can 
	 *get all reported history with one function call. This is the data behind the Company in Detail page.
  */
  this.asReported = function(options, callback) {
    var request = {
      url: '/asReported',
      method: 'GET',
      qs: options
    };
    _makeRequest(request, callback);
  };

  /**
  	Get breakouts/segments, this is the data behind the breakout page.
  **/
  this.breakouts = function(options, callback) {
    var request = {
      url: '/breakouts',
      method: 'POST',
      body: options
    };
    _makeRequest(request, callback);
  };

  /**
	 * Search for and download footnotes. The data behind the footnote page.
  */
  this.companyFootnotes = function(options, callback) {
    var request = {
      url: '/companyFootnotes',
      method: 'GET',
      qs: options
    };
    _makeRequest(request, callback);
  };

  /**
	 * Get the contents of the footnote. GET to https://www.calcbench.com/api/footnote?networkID={networkID}, 
	 * the networkID is the network id as returned by the footnotes end-point.
  */
  this.footnote = function(options, callback) {
    var request = {
      url: '/footnote',
      method: 'GET',
      qs: options
    };
    _makeRequest(request, callback);
  };  


  /**
	 * Get analytics computed from Calcbench data. This is the data behind the analytics page. 
  */
  this.analytics = function(options, callback) {
    var request = {
      url: '/analytics',
      method: 'POST',
      body: options
    };
    _makeRequest(request, callback);
  }; 
}

module.exports = Calcbench;