var express = require('express');
var app = express();
var mysql=require('mysql');
var nodemailer = require('nodemailer');
var path=require('path');
app.use('/static', express.static(path.join(__dirname, 'static')))
var bodyparser=require('body-parser');
var jwt=require('jsonwebtoken');
var bcrypt = require('bcrypt');	
app.set('view engine', 'pug');
app.set('views','./views');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var urlencodedParser=bodyparser.urlencoded({extended:false})
app.use(urlencodedParser);
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
}); 


var con = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "upside",             //database name
  connectionLimit: 100
});


app.get('/sign', function (req, res) {
   res.render("sign");
})

app.post('/process', function(req,res){
	response={
		fn: req.body.first_name,
		ln: req.body.last_name,
		pas: req.body.pasword,
		mob: req.body.mobile_no,
		mail: req.body.mail_id,
	};
	var first_name=response.fn;
	var last_name=response.ln;
	var password=response.pas;
	var mobile=response.mob;
	var mail_id=response.mail;	
	var hash= bcrypt.hashSync(password,2);
	

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
var epass=encrypt(password);
	
	var sql="INSERT INTO entry VALUES('','"+first_name+"','"+last_name+"','"+hash+"','"+mail_id+"','"+mobile+"','"+epass+"','')";
	con.query(sql,function(err,result){
		if(err) throw err;
		
	});
	 res.sendFile( __dirname + "/" + "login.html" );
})

app.get('/dash',function(req,res){	


if(global.mailid==undefined){
	 res.sendFile( __dirname + "/" + "login.html" );
}
else{
var mail=global.mailid;

var sqln="SELECT * FROM entry WHERE Mail_id='"+mail+"'";
con.query(sqln,function(err,result){
	if(err) throw err;
	else{
		if(result.length>0){
		fn=result[0].First_name,
		ln=result[0].Last_name,
		mobile=result[0].Mobile
		}
	}
	var sqld="SELECT Token FROM token WHERE Mail_id='"+mail+"'";
	con.query(sqld,function(err,result){
		if(err) throw err;
		else{
			if(result.length>0){
				token=result[0].Token;
				res.render("dash",{"fn":fn,"ln":ln,"mobile":mobile,"mail":mail});
			}
		}
		});
	});	
}
})

app.post('/forgot',function(req,res){
	res.render('forgot');
})
app.get('/forgot',function(req,res){
	if(global.forgot==1)
	res.render('forgot');
else
	res.redirect( "/login.html" );
})
app.post('/forgot_pass',urlencodedParser,function(req,res){
	response={
		Fmail: req.body.mail_id,
	};
	var forgotmail=response.Fmail;
	var sqlm="SELECT * FROM entry WHERE Mail_id='"+forgotmail+"'";
	con.query(sqlm,function(err,result){
		if(err) throw err;
		else{
			if(result.length>0){
				 Gname=result[0].First_name;
				 encryptkey=result[0].Crypted;
			
			function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


var depass=decrypt(encryptkey);
var sqlde="UPDATE entry SET Decrypted='"+depass+"' WHERE Mail_id='"+forgotmail+"'";
con.query(sqlde,function(err,fun){
	if(err) throw err;
	
});


var sender=nodemailer.createTransport({
		service: 'gmail',
		auth:{
			user: 'concordia2k18@gmail.com',
			pass: 'concordia@2018'
		}
	});
	var send={
		from: 'concordia2k18@gmail.com',
		to: forgotmail,
		subject: 'password',
		text: "The encrypted key:"+encryptkey
	};
	sender.sendMail(send,function(error,info){
		if(error){
			throw error
		}
		else{
			console.log('Email sent: ' + info.response);
		}
	});
	res.render('changepass');
			}
			else{
				global.forgot=1;
				res.redirect("/forgot");
			}
		}
	});
	
	})	
app.post('/logout',function(req,res){
var sqll="DELETE FROM token WHERE Mail_id='"+mailid+"'";
con.query(sqll,function(err,result){
	if(err)throw err;
	
	global.mailid=undefined;
	
	 res.redirect( "/login.html" );
	})
});
app.post('/signup',function(req,res){
	res.render('sign')
})
app.get('/changepass',function(req,res){
	res.redirect('/changepass');
})
app.get('/signup.html',function(req,res){
	if(global.mailid==undefined)
	res.sendFile( __dirname + "/" + "login.html" );
else
	res.redirect('/dash');
})
app.get('/login.html',function(req,res){
	if(global.mailid==undefined)
	res.sendFile( __dirname + "/" + "login.html" );
else
	res.redirect('/dash');
})
app.post('/logon',urlencodedParser,function(req,res){
	response={
		ui: req.body.userd,
		passwrd: req.body.pass,
	};
	var user=response.ui;
	var passw=response.passwrd;
	
var sql="SELECT * FROM entry WHERE Mail_id='"+user+"' OR Mobile='"+user+"' ";
con.query(sql,function(err,result){
	if(err) 
	{throw err}
	else
	{
		if(result.length>0){
		var hash1= bcrypt.hashSync(passw,2);
		
			var person={
				'Fn':result[0].First_name,
				'Ln':result[0].Last_name,
				'Password':result[0].Password,
				'Mail_id':result[0].Mail_id
			}
			if(bcrypt.compareSync(passw,person.Password)){
				
				var jwt_id=result[0].id;
				var token=jwt.sign({id:jwt_id,Mail_id:result[0].Mail_id,Fname:result[0].First_name},"Upside_Down");
				
				var sqlt="INSERT INTO token VALUES('','"+token+"','"+result[0].Mail_id+"')";
				con.query(sqlt,function(err,result){
					if(err) throw(err);
					
					global.mailid=person.Mail_id;
					res.redirect("/dash");
					
				});
			}
			else{
				first=person.Fn;
				last=person.Ln;
				
				res.render("wrong",{"first":first,"last":last});
			}
			
		}
			
	else
		res.send("Wrong!");
		
	}
	
});	
})

app.post('/changep',urlencodedParser,function(req,res){
	response={
		chmail: req.body.mail_id,
		encryptKey1: req.body.encrypt,
		cpass: req.body.cpass,
		crpass: req.body.crpass
	};
	var change_mail=response.chmail;
	var enckey=response.encryptKey1;
	var copass=response.cpass;
	var repass=response.crpass;
	var sqlchange="SELECT * FROM entry WHERE Mail_id='"+change_mail+"'";
	con.query(sqlchange,function(err,result){
		if(err) throw err;
		else{
			if(result.length>0){
				crypt=result[0].Crypted;
				if(enckey==crypt){
						var hash2= bcrypt.hashSync(copass,2);
					var sqlpass="UPDATE entry SET Password='"+hash2+"' WHERE Mail_id='"+change_mail+"'";
					con.query(sqlpass,function(err,result){
						if(err) throw(err);
					
						res.redirect( "/login.html" );
					});
				}
			}
			else{
				res.redirect('/changepass');
			}
		}
	});
})



app.listen(5701);