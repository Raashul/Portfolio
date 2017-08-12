(function(){
	angular.module('Portfolio')
		.controller('HomeController',[ '$scope', "$rootScope", '$http', '$window',
			function($scope, $rootScope, $http, $window){
			$scope.resume_button = function(){

				console.log('testttt');
				//var generatePdfUrl = "../pdf/Resume.pdf"
				$http.get('api/generatepdf').then(function(data){
					 pdfBlob = new Blob([data],{type:"application/pdf"});
			    url = webkitURL.createObjectURL(pdfBlob);
			    window.open(url);

					// var file = new Blob([data], {type: 'application/pdf'});
     			// var fileURL = URL.createObjectURL(file);
			  	// console.log(file);
			    //data is link to pdf
			    //$window.open(fileURL);
			    });   
			}

			$scope.show_email = function(){
				console.log('check');
				$scope.display_email_form = true;
			}

			$scope.send_email = function(name, message){
				console.log(name);
				console.log(message);
			
				var request = {
					name: name,
					message: message
				};

				console.log(request);

				$http.post('api/sendEmail', request).then(function(response){
					console.log('inside function');
				//response is the Post Information we received
					var name = response.name;
					var message = response.message;

					var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth:{
						user: emailAuth.emailAuth.authEmail,
						pass: emailAuth.emailAuth.authPassword
					}
				});

				var mailOptions ={
					from: '<noreply@gmail.com>',
					to: send_to,
					subject: 'Regarding sale of ' + post.item_name,
					html: '<b>Thank you for using our application</b> <p>Please contact the seller using the given email Address</p>' + post.name + ':         ' + post.email
				};

				transporter.sendMail(mailOptions, function(error, info){

					if(error){
						console.log(error);
					}
					else{
						res.json(mailOptions);
					}

					transporter.close();

				});



				},function(err){
					console.log(err);
				});


			}
	}])


}())