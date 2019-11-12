// brute force solution
$(document).ready(function() {
  var content = [];
  // GET the users first
  $.get("https://jsonplaceholder.typicode.com/users", function(names) {
    names.map(function(obj, index) {
      //create each component div
      $(".container").append(
        '<div class="component" id="component' + index + '"></div>'
      );
      //create the container for the img and the name
      $("#component" + index).append(
        '<div class="header" id="componentHeader' +
          index +
          '"></div><div class="text" id="componentText' +
          index +
          '" /> '
      );
      $("#componentHeader" + index).append(
        '<h3 class="name">' + obj.name + "</h3>"
      );
      content[index] = { name: obj.name, userId: obj.id };
      $("#componentHeader" + index).append(
        '<img src="https://joeschmoe.io/api/v1/jacques" />'
      );
      // Get the gender of the user
      $.get(
        "https://api.genderize.io/?name=" + obj.name.split(" ")[0],
        function(genderize) {
          content[index].gender = genderize.gender;
        }
      ).done(function() {
        //get the image depending of the user's gender
        $("#componentHeader" + index).append(
          '<img src="https://joeschmoe.io/api/v1/' +
            (content[index].gender === "female" ? 'josephine"' : 'jacques"') +
            " />"
        );
      });

      // See if everything is working
      $.get(
        //pass params as objects not inside the url
        "https://jsonplaceholder.typicode.com/posts?userId=" + obj.id,
        function(data) {
          data.sort(function(a, b) {
            return b.title.length - a.title.length;
          });
          data.map(function(post) {
            // use list and html instead
            $("#componentText" + index).append("<p>" + post.title + "</p>");
          });
        }
      );
    });
    // after getting the names:
  });
});
