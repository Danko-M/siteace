// Routes
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
  	to: "nav"
  });
  this.render('website_list', {
  	to: "main"
  });
});

Router.route('/site/:_id', function () {
  this.render('navbar', {
    to: "nav"
  });  
  this.render('website_single', {
    to: "main",   
    data: function (){
      return Websites.findOne({_id: this.params._id});
    }
  }); 
});

