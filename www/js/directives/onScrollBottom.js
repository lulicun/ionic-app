'use strict';

app.directive('onScrollTop', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var fn = scope.$eval(attrs.onScrollBottom)
      var clientHeight = element[0].clientHeight
      element.on('scroll', function (e) {
        var el = e.target;
        if ((el.scrollHeight - el.scrollTop) < clientHeight) { // fully scrolled
          scope.$apply(fn);
        }
      });
    }
  };
});
