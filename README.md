# node-calcbench
nodejs calcbench api from https://www.calcbench.com/home/api, in progress

TODO: write documentation of all api methods
TODO: write tests

*Node client for the [**Calcbench API**](https://www.calcbench.com/home/api).*

##Installation

```
$ npm install --save node-genius
```

##Usage

```JavaScript
// Instantiate a Genius instance:
var CalcBench = require('../lib/index');
var calcBenchClient = new CalcBench('email', 'password');
calcBenchClient.login({email: 'email', password: 'password'}); //TODO push this up

##Examples
```JavaScript

// Normalized metrics for comparisons between companies, the data behind the benchmarking page. 
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


// Download statements as they are reported by companies in their filings. Calcbench "folds" the statements so you can get all reported // history with one function call. This is the data behind the Company in Detail page. 
calcBenchClient.asReported({
	companyIdentifier: 'msft',
	statementType: 'income',
	periodType: 'annual',
	allPeriods: false,
	descendingDates: true
}, function(err, body) {
	console.log('asReported', body);
});	

// Update an annotation.
calcBenchClient.breakouts({
	'pageParameters': {'metrics': ['operatingSegmentRevenue']},  
	'periodParameters': {year: 2013, period: 0, end_year: 2014, end_period: 0},  
	'companiesParameters': {'entireUniverse': false, 'companyIdentifiers': ['msft']}
}, function(err, body) {
	console.log('breakouts', body);
});

// Get breakouts/segments, this is the data behind the breakout page. 
calcBenchClient.companyFootnotes({
	companyIdentifier: 'msft',
	period: 0,
	year: 2014
}, function(err, body) {
	console.log('companyFootnotes', body);
});

// Search for and download footnotes.
calcBenchClient.footnote({
	network_id: 25975227
}, function(err, body) {
	console.log('footnote', body);
});

// Get analytics computed from Calcbench data. This is the data behind the analytics page. 
calcBenchClient.analytics({
	ticker: 'msft',
	calendaryear: 2014,
	calendarperiod: 0
}, function(err, body) {
	console.log('analytics', body);
});

```