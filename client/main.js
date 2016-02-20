// Routes
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
  	to: "nav"
  });
  this.render('website_form', {
  	to: "form"
  });
  this.render('website_list', {
  	to: "websites"
  });
});

Router.route('/nav', function () {
  this.render('navbar', {
  	to: "nav"
  });  
});

Router.route('/form', function () {
  this.render('navbar', {
  	to: "nav"
  });  
  this.render('website_form', {
  	to: "form"
  }); 
});

Router.route('/site/:_id', function () {
  this.render('navbar', {
  	to: "nav"
  });  
  this.render('website_single', {
  	to: "websites", 	
		data: function (){
			return Websites.findOne({_id: this.params._id});
		}
  }); 
});



// Accounts config
///
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});


/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {votes: -1}});
	}
});


Template.website_item.helpers({	
	addedOn:function () {
		var parsedDate = this.createdOn;
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return 	parsedDate.getDate()	+ " " + 
						monthNames[parsedDate.getMonth()]	+ " " + 
						parsedDate.getFullYear();
	}
});

/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		if (Meteor.user()){
			Websites.update({_id: website_id}, {$inc: {votes: 1}});
		} else {
			alert('Please Sign in to vote');
		}
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);

		// put the code in here to remove a vote from a website!
		if (Meteor.user()){
			Websites.update({_id: website_id}, {$inc: {votes: -1}});
		} else {
			alert('Please Sign in to vote');
		}
		return false;// prevent the button from reloading the page
	}
})

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){

		// here is an example of how to get the url out of the form:
		var newUrl = event.target.url.value;
		var newTitle = event.target.title.value;
		var newDescription = event.target.description.value;
		
		//  put your website saving code in here!	
		if (Meteor.user()){
	    Websites.insert({
	      title: newTitle, 
	      url: newUrl, 
	      description: newDescription,
	      createdOn:new Date(),
	      createdBy:Meteor.user()._id
	    });
    }

		return false;// stop the form submit from reloading the page

	}
});