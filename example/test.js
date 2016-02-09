'use strict';

var CalcBench = require('../lib/index');


var calcBenchClient = new CalcBench('email', 'password');


calcBenchClient.login({email: 'email', password: 'password'}, function(err, data, body) {
	if (!body) {
		throw new Error('Could not authenticate.');
	}

	calcBenchClient.normalizedValues({
  	company_identifiers: ['msft'],
  	metrics: ['revenue'],
  	start_year: 2014,
  	start_period: 0,
  	end_year: 2015,
  	end_period: 0
	}, function(err, body) {
		console.log('normalizedValues', body);
	});

	calcBenchClient.asReported({
  	companyIdentifier: 'msft',
  	statementType: 'income',
  	periodType: 'annual',
  	allPeriods: false,
  	descendingDates: true
	}, function(err, body) {
		console.log('asReported', body);
	});	

	calcBenchClient.breakouts({
		'pageParameters': {'metrics': ['operatingSegmentRevenue']},  
		'periodParameters': {year: 2013, period: 0, end_year: 2014, end_period: 0},  
		'companiesParameters': {'entireUniverse': false, 'companyIdentifiers': ['msft']}
  }, function(err, body) {
  	console.log('breakouts', body);
  });

	
	calcBenchClient.companyFootnotes({
		companyIdentifier: 'msft',
		period: 0,
		year: 2014
	}, function(err, body) {
		console.log('companyFootnotes', body);
	});
	
	calcBenchClient.footnote({
		network_id: 25975227
	}, function(err, body) {
		console.log('footnote', body);
	});

	calcBenchClient.analytics({
		ticker: 'msft',
		calendaryear: 2014,
		calendarperiod: 0
	}, function(err, body) {
		console.log('analytics', body);
	});

});