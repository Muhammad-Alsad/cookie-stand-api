function getCookieStand(name) {
  var CookieStandValue = null;

  if (document.CookieStand && document.CookieStand != '') {
    var CookieStands = document.CookieStand.split(';');

    for (var i = 0; i < CookieStands.length; i++) {
      var CookieStand = jQuery.trim(CookieStands[i]);

      // Does this CookieStand string begin with the name we want?
      if (CookieStand.substring(0, name.length + 1) == (name + '=')) {
        CookieStandValue = decodeURIComponent(CookieStand.substring(name.length + 1));
        break;
      }
    }
  }

  return CookieStandValue;
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = '//' + host;
  var origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !(/^(\/\/|http:|https:).*/.test(url));
}

var csrftoken = window.drf.csrfToken;

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
      // Send the token to same-origin, relative URLs only.
      // Send the token only if the method warrants CSRF protection
      // Using the CSRFToken value acquired earlier
      xhr.setRequestHeader(window.drf.csrfHeaderName, csrftoken);
    }
  }
});
