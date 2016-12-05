'use strict';

app.directive('onScrollTop', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var fn = scope.$eval(attrs.onScrollTop);
      element.on('scroll', function (e) {
        if (!e.target.scrollTop) {
          scope.$apply(fn);
        }
      });
    }
  };
});
