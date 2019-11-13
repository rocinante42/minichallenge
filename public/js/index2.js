function getUsersAsync() {
  return $.get("https://jsonplaceholder.typicode.com/users");
}
// ajax that returns the possible gender from a given string
function getGenderOfUserAsync(name) {
  return $.get("https://api.genderize.io/?name=" + name.split(" ")[0]);
}
// ajax promise that returns the all the posts from an specific user
function getLinesOfTextAsync(userId) {
  return $.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId);
}
// function that returns an array of html lines.
function setLinesOfUser(userId) {
  return getLinesOfTextAsync(userId).then(function(posts) {
    var lines = [];
    posts.sort(function(a, b) {
      return b.title.length - a.title.length;
    });
    posts.map(function(post) {
      // use list and html instead
      lines.push("<p>" + post.title + "</p>");
    });
    return lines;
  });
}
// It returns an image that represents the profile picture based on gender
function setImageString(gender) {
  return (
    '<img src="https://joeschmoe.io/api/v1/' +
    (gender === "female" ? 'josephine"' : 'jacques"') +
    " />"
  );
}
// Main function
$(document).ready(function() {
  // Returns an array objects that represents users from the api
  getUsersAsync().then(function(users) {
    users.map(function(user, index) {
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
      // create the name html element
      var $img = "";
      // start getting chain data
      getGenderOfUserAsync(user.name)
        .then(function(name) {
          return setImageString(name.gender);
        })
        .then(function(img) {
          $img = img;
          return setLinesOfUser(user.id);
        })
        .then(function(lines) {
          $textContainer.html(lines);
          $name = $("<h3>", { class: "name" }).append(user.name);
          $headingContainer.append($img);
          $headingContainer.append($name);
        })
        .fail(function() {
          aler("Something went wrong!");
        })
        .done(function() {
          $component.append($headingContainer);
          $component.append($textContainer);
          $(".container").append($component);
        });
    }); // end of map function
  }); // end of getNames
}); // end of main function
