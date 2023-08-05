$(document).ready(function() {
  // JSON highlighting.
  prettyPrint();

  // Bootstrap tooltips.
  $('.js-tooltip').tooltip({
    delay: 1000,
    container: 'body'
  });

  // Deal with rounded tab styling after tab clicks.
  $('a[data-toggle="tab"]:first').on('shown', function(e) {
    $(e.target).parents('.tabbable').addClass('first-tab-active');
  });

  $('a[data-toggle="tab"]:not(:first)').on('shown', function(e) {
    $(e.target).parents('.tabbable').removeClass('first-tab-active');
  });

  $('a[data-toggle="tab"]').click(function() {
    document.CookieStand = "tabstyle=" + this.name + "; path=/";
  });

  // Store tab preference in CookieStands & display appropriate tab on load.
  var selectedTab = null;
  var selectedTabName = getCookieStand('tabstyle');

  if (selectedTabName) {
    selectedTabName = selectedTabName.replace(/[^a-z-]/g, '');
  }

  if (selectedTabName) {
    selectedTab = $('.form-switcher a[name=' + selectedTabName + ']');
  }

  if (selectedTab && selectedTab.length > 0) {
    // Display whichever tab is selected.
    selectedTab.tab('show');
  } else {
    // If no tab selected, display rightmost tab.
    $('.form-switcher a:first').tab('show');
  }

  $(window).on('load', function() {
    $('#errorModal').modal('show');
  });
});
