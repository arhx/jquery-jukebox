// $(document).ready(function() {
$(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    removeOldInfo();

    var textField = $("#artist");
    var searchTerm = textField.val();

    var url = makeUrl(searchTerm);

    if (url) {
      $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          if (songs.length > 0) {
            makeUL();
            for (i = 0; i < songs.length; i++) {
              if (songs[i].via == "youtube") {
                makeSongEmbed(songs[i]);
              } else {
                makeSongAnchor(songs[i]);
              }
            };
          } else {
            apologize();
          };
        }
      });
    } else {
      apologize();
    }
  });

  function makeUrl(searchTerm) {
    if (searchTerm.length > 0) {
      var url = "/search/" + searchTerm;
      return url;
    } else {
      return false;
    }
  }

  function makeSongAnchor(song) {
    makeLI();
    var anchor = $("<a></a>");
    anchor.text(song.title);
    anchor.prop("href", song.url);
    var lastLI = $("li:last-child");

    lastLI.append(anchor);
  }

  function makeSongEmbed(song) {
    makeLI();
    var url = makeEmbedUrl(song.url);
    var iFrame = $("<iframe></iframe>");
    iFrame.prop("src", url);
    var lastLI = $("li:last-child");

    lastLI.append(iFrame);
  }

  function extractYoutubeId(url) {
    var rx = /\\?v=(.*)/;
    var arr = rx.exec(url);
    return arr[1];
  }

  function makeEmbedUrl(url) {
    var id = extractYoutubeId(url);
    var baseUrl = "http://www.youtube.com/embed/";
    var embedUrl = baseUrl + id;
    return embedUrl;
  }

  function removeOldInfo() {
    if ($("body").children(":last-child") != $("form")) {
      $("ul").remove();
      $("p").remove();
    }
  }

  function makeUL() {
    var list = $("<ul></ul>");
    $("form").after(list);
  }

  function makeLI() {
    var listItem = $("<li></li>");
    $("ul").append(listItem);
  }

  function apologize() {
    var p = $("<p></p>");
    p.text("That is not anyone else's jam.");
    $("form").after(p);
  }
});

