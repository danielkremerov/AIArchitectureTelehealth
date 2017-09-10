'use strict'
var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');

AWS.config.update({
	region: "eu-west-1",
	//https://localhost:3000,
	endpoint: "https://dynamodb.eu-west-1.amazonaws.com"
});
var storage = (function() {
	var dynamodb = new AWS.DynamoDB.DocumentClient();
	return {
		save: function(reading, session, callback) {
			var params = {
				TableName: 'reading',
				Item: {
					userId: session.user.userId,
					noteId: uuidv4,
					content: reading,
					createdAt: new Date().getTime(),
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(color);
			})
		},
		getReading: function(session, callback) {
			var params = {
				TableName: 'reading',
				Key: {
					UserId: session.user.userId,
				}
			};
			dynamodb.get(params, function(err, data) {
				callback(data.Item.content);
			});
		}
	}
})();
module.exports = storage;