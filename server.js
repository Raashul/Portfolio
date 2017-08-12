var express 						= require('express');
var bodyParser					= require('body-parser');
var fs 									= require('fs-extra');
var nodemailer				 	= require('nodemailer');
var emailAuth 					=   require('./app/config/auth.js');
var app 								= express();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());


app.use('/app', express.static(__dirname + "/app"))
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/server', express.static(__dirname + '/server'));

app.get('/', function(req, res){

	res.sendfile('./index.html');

})

app.get('/api/generatepdf', function(req, res){
	console.log('server');

	fs.readFile('./app/pdf/Resume.pdf',function(err,data){
    if(err){
    	console.log('error');
    	console.log(err)
    }
    if (statusCode >= 100 && statusCode < 600)
  res.status(statusCode);
else
  res.status(500);
    res.send(data,{binary:true});
});

	// var data = fs.readFile('./app/pdf/Resume.pdf');
	// res.contentType("application/pdf");
	// res.send(data);
})

app.post('/api/sendEmail', function(req, res){
	var name 		= req.body.name;
	var message	= req.body.message;

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user: emailAuth.emailAuth.authEmail,
			pass: emailAuth.emailAuth.authPassword
		}
	});

	var mailOptions ={
		from: 'emailAuth.emailAuth.authEmail',
		to: emailAuth.emailAuth.sendto,
		subject: 'From: ' + name,
		html: message
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

});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", 
  	this.address().port, app.settings.env);
});


