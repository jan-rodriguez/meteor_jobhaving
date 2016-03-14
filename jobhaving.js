Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  // No div
  // $(document).ready(function() {
  //   const no_div = $("#no");
  //   const no_height = no_div.height();
  //   const no_width = no_div.width();

  //   $(document).on('mousemove', function(e){
  //     no_div.css({
  //       left:  e.clientX - (no_width/2),
  //       top:   e.clientY - (no_height/2)
  //     });
  //   });
  // });

  Template.body.helpers({
    messages: function () {
      return Messages.find({});
    }
  });

  Template.chatroom.events({
    "submit .new-person": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;
      var now = new Date();
      var hour = now.getHours() + (now.getTimezoneOffset() / 60);
      var minute = now.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = now.getSeconds();
      var createdAt = hour+":"+minute+"."+second;

      // Insert a task into the collection
      Messages.insert({
        text,
        createdAt
      });

      // Clear form
      event.target.text.value = "";
    },
  });
}

else if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
