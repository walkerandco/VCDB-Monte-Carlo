var monte = require('../monte.js');
const _ = require('lodash');

exports['getData'] = async function (test) {
	test.expect(3);
	var data = await monte.getData('actors/internal');
	test.ok(data, "Test fails because the returned object was null.");
    test.ok(data.internalCount, "Test fails because the returned object did not have the expected properties.");
	test.ok(data.internalCount>1, "Test fails because internalCount is not a number and it is not greater than 1.");
    test.done();
};

exports['postAggregationQuery'] = async function (test) {
	test.expect(3);
	var postData = {
		match: "{}",
		group: "$timeline.incident.year",
		sort: {count: 1}
	}
	var data = await monte.postAggregationQuery('query', postData);
	test.ok(data, "Test fails because the returned object was null.");
    test.ok(data[0]._id, "Test fails because the returned object does not have the expected properties.");
	test.ok(data[0].count, "Test fails because sub-object does not have the expected properties resulting from aggregation in MongoDB.");
    test.done();
};

exports['computeProbability'] = async function(test) {
	test.expect(3);
	var data = [ { _id: 2000, count: 1 },
				 { _id: 1994, count: 1 },
				 { _id: 1971, count: 1 },
				 { _id: 1998, count: 1 } ];
	var testData = await monte.computeProbability(data);
	test.equal(testData.p[0], 0.25, "Test fails because the testData did not contain the expected probability.");
	test.equal(_.sum(testData.p), 1, "Test fails because the added probabilities did not equal 0.")
	test.ok((testData.keys && testData.values && testData.p), "Test fails because the returned object did not possess the required keys.");
	test.done();
}

exports['doRandom'] = async function(test) {
	test.expect(1);
	test.ok(monte.doRandom(['test1', 'test2', 'test3', 'test4'],[0.25, 0.25, 0.25, 0.25]));
	test.done();
}

exports['configureActor'] = async function(test) {
	test.expect(3);
	var scenario = await monte.configureActor();
	test.ok(scenario, "Test fails because no object was returned.");
	test.ok(scenario.hasOwnProperty('date'), "Test fails because the returned object did not possess an expected key."); 
	test.ok(scenario.actor, "Test fails because a valid actor type was not returned.");
	test.done();	
}

exports['configureScenario'] = async function(test) {
	test.expect(1);
	var type = await monte.configureActor();
	var val = await monte.configureScenario(type.actor, type.date);
	test.ok(val, "Test fails because the return value was null.");
	test.done();
}

exports['runTrials'] = async function(test) {
	test.expect(1);
	test.ok(await monte.runTrials(3), "Test fails because the return value was null.");
	test.done();
}