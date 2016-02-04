// this is image_share.js
Images = new Mongo.Collection("images");

// set up security on Images collection
Images.allow({
	insert: function(userId, doc) {
		console.log("testing security on image isert");
		if (Meteor.user()) {
			console.log(doc);
			return true;
		}
	},
	remove: function(userId, doc) {
		if (Meteor.user()) {
			if (userId != doc.createdBy) {
				return false;
			} else {
				return true;
			}
		}
	},
	update: function(userId, doc) {
		if (Meteor.user()) {
			return true;
		}
	}
});
