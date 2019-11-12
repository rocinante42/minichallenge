// brute force solution
$(document).ready(function() {
  // GET the users first
  $.get("https://jsonplaceholder.typicode.com/users", function(names) {
    names.map(function(obj, index) {
      //create component div
      var $component = $("<div>", {
        id: "component" + index,
        class: "component"
      });
      // Create the text container component:
      var $textContainer = $("<div>", {
        id: "textContainer" + index,
        class: "textContainer"
      });
      //create the container for the img and the name:
      var $headingContainer = $("<div>", {
        id: "componentHeader" + index,
        class: "headerContainer"
      });
      // create the html element that will contain the user name:
      var $name = $("<h3>", { class: "name" });
      //Load the name
      $name.append(obj.name);
      // attach the name inside the heading container
      $headingContainer.append($name);
      // Get the gender of the user
      //default gender
      var gender = "male";
      $.get(
        "https://api.genderize.io/?name=" + obj.name.split(" ")[0],
        function(genderize) {
          gender = genderize.gender;
        }
      )
        // If successful, attach the img html element to the heading container:
        .done(function() {
          //get the image depending of the user's gender with ternary operator
          $headingContainer.append(
            '<img src="https://joeschmoe.io/api/v1/' +
              (gender === "female" ? 'josephine"' : 'jacques"') +
              " />"
          );
        })
        // In case of error while calling the API, assign a default gender:
        .fail(function(error) {
          console.log("whooops!");
          $headingContainer.append(
            '<img src="https://joeschmoe.io/api/v1/jacques" />'
          );
        });
      // Get the text for each user:
      $.get(
        //pass params as objects not inside the url
        "https://jsonplaceholder.typicode.com/posts?userId=" + obj.id,
        function(data) {
          data.sort(function(a, b) {
            return b.title.length - a.title.length;
          });
          data.map(function(post) {
            // use list and html instead
            $textContainer.append("<p>" + post.title + "</p>");
          });
        }
      )
        .done(function() {
          $component.append($headingContainer);
          $component.append($textContainer);
          $(".container").append($component);
        })
        .fail(function() {
          $textContainer.append("There was an error loading this resource.");
          $component.append($headingContainer);
          $component.append($textContainer);
          $(".container").append($component);
        });
      // close $get for text
    });
    // close map function for each user
  }).fail(function() {
    $(".container").html(
      '<div class="error">There was an error loading your resources</div>'
    );
  });
  // close $get for users.
});
//end of function.
