'use strict';

app.directive('ngMatch', function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=ngMatch"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.ngMatch = function(modelValue) {
				var result = modelValue == scope.otherModelValue;
				ngModel.$setValidity('match', result);
				return result;
			};

			scope.$watch("otherModelValue", function(value) {
				ngModel.$validate();
			});
		}
	};
});
