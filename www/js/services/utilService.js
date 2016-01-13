'use strict';

app.factory('UtilService', function($q) {

	var imageCompressScale = 1;
	var imageMaxSize = 400;

	return {
		urlToBase64: function(url) {
			var q = $q.defer();
			var canvas, context, imageData;
			var img = new Image();
			img.onload = function() {
				canvas = document.createElement('canvas');
				if (img.width > imageMaxSize) {
					imageCompressScale = img.width/imageMaxSize;
				}
				canvas.width = img.width/imageCompressScale;
				canvas.height = img.height/imageCompressScale;
				context = canvas.getContext('2d');
				context.drawImage(img, 0, 0, img.width/imageCompressScale, img.height/imageCompressScale);
				try {
					imageData = canvas.toDataURL('image/png');
					q.resolve(imageData);
				}
				catch(e) {
					q.reject(e.message);
				}
			};
			try {
				img.src = url;
			} catch(e) {
				q.reject(e.message);
			}
			return q.promise;
		},
	};
});
