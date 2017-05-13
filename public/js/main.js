'use strict';

var main = window.main || {};

main.ga = window.ga || function () {};

$(document).ready(function () {
  var Observable = window.Rx.Observable;

  var CSRF_HEADER = 'X-CSRF-Token';

  var setCSRFToken = function setCSRFToken(securityToken) {
    jQuery.ajaxPrefilter(function (options, _, xhr) {
      if (!xhr.crossDomain) {
        xhr.setRequestHeader(CSRF_HEADER, securityToken);
      }
    });
  };

  setCSRFToken($('meta[name="csrf-token"]').attr('content'));

  $('img').on('error', function () {
    $(this).unbind('error').attr('src', 'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png');
  });

  $.each($('.sr-only'), function (i, span) {
    if ($(span).text() === ' Complete') {
      $(span).parents('p').addClass('manip-hidden');
    }
  });

  function addAlert() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'alert-info';

    return $('.flashMessage').append($('\n      <div class=\'alert ' + type + '\'>\n        <button class=\'close\' type=\'button\', data-dismiss=\'alert\'>\n          <span class=\'ion-close-circled\' />\n        </Button>\n        <div>' + message + '</div>\n      </div>\n    '));
  }

  function toggleNightMode() {
    if (!main.userId) {
      return addAlert('You must be logged in to use our themes.');
    }
    var iframe$ = document.getElementById('map-aside-frame');
    var body$ = $('body');
    if (iframe$) {
      iframe$.src = iframe$.src;
    }
    body$.hide();
    var updateThemeTo = void 0;
    if (body$.hasClass('night')) {
      body$.removeClass('night');
      updateThemeTo = 'default';
    } else {
      body$.addClass('night');
      updateThemeTo = 'night';
    }
    body$.fadeIn('100');
    var options = {
      url: '/api/users/' + main.userId + '/update-theme',
      type: 'POST',
      data: { theme: updateThemeTo },
      dataType: 'json'
    };
    return $.ajax(options).done(function () {
      return console.log('theme updated successfully');
    }).fail(function (err) {
      var message = void 0;
      try {
        message = JSON.parse(err.responseText).error.message;
      } catch (error) {
        return null;
      }
      if (!message) {
        return null;
      }
      return addAlert(message);
    });
  }

  Observable.merge(Observable.fromEvent($('#night-mode'), 'click'), Observable.create(function (observer) {
    window.Mousetrap.bind('g t n', function () {
      return observer.onNext();
    });
  })).debounce(500).subscribe(toggleNightMode, function (err) {
    return console.error(err);
  });

  // Hot Keys
  window.Mousetrap.bind('g n n', function () {
    // Next Challenge
    window.location = '/challenges/next-challenge';
  });
  window.Mousetrap.bind('g n m', function () {
    // Map
    window.location = '/map';
  });
  window.Mousetrap.bind('g n a', function () {
    // About
    window.location = '/about';
  });
  window.Mousetrap.bind('g n s', function () {
    // Shop
    window.location = '/shop';
  });
  window.Mousetrap.bind('g n o', function () {
    // Settings
    window.location = '/settings';
  });
  window.Mousetrap.bind('g n r', function () {
    // Repo
    window.location = 'https://github.com/freecodecamp/freecodecamp/';
  });

  (function getFlyer() {
    var flyerKey = '__flyerId__';
    $.ajax({
      url: '/api/flyers/findOne',
      method: 'GET',
      dataType: 'JSON',
      data: { filter: { order: 'id DESC' } }
    })
    // log error
    .fail(function (err) {
      return console.error(err);
    }).done(function (flyer) {
      var lastFlyerId = localStorage.getItem(flyerKey);
      if (!flyer || !flyer.isActive || lastFlyerId === flyer.id) {
        return;
      }
      $('#dismiss-bill').on('click', function () {
        localStorage.setItem(flyerKey, flyer.id);
      });
      $('#bill-content').html(flyer.message);
      $('#bill-board').fadeIn();
    });
  })();
});