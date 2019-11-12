// brute force solution
$(document).ready(function() {
  var content = [];
  // GET the users first
  $.get("https://jsonplaceholder.typicode.com/users", function(names) {
    names.map(function(object, index) {
      // See if everything is working
      $(".container").append(
        '<div class="component" id="component' + index + '"></div>'
      );
      $("#component" + index).append(
        '<h3 class="name">' + object.name + "</h3>"
      );
      content[index] = { name: object.name };
      // Get the gender of the user
      $.get(
        "https://api.genderize.io/?name=" + object.name.split(" ")[0],
        function(genderize) {
          content[index].gender = genderize.gender;
          console.log(genderize);
        }
      ).done(function() {
        $("#component" + index).before(
          '<img src="https://joeschmoe.io/api/v1/' +
            (content[index].gender === "male" ? 'josephine"' : 'jacques"') +
            " />"
        );
      });
    });
    // after getting the names:
  }).done(function() {
    // Get the body text of each user
    $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
      content.map(function(obj, index) {
        var lines = data[index].body.split("\n");
        content[index].lines = lines;
        lines.map(function(line) {
          $("#component" + index).append("<p>" + line + "</p>");
        });
      });
    }).done(function() {});
  });
});
