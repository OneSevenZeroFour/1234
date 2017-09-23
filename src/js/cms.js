var mysql = require('mysql');
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'outlets'
})
connection.connect();
http.createServer(function(req,res){
	var post = '';
	req.on('data',function(chunk){
		post+=chunk;
	})
	req.on('end',function(){	
		res.setHeader("Access-Control-Allow-Origin","*");
		var path = url.parse(req.url).pathname;
		var state = path;
		var posts = querystring.parse(post);
		//console.log(posts.id);
		//console.log(state);
		switch(path){
			case "/select":
				connection.query('SELECT * FROM goods',function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					var total = results.length;
					//console.log(posts.qty,posts.page)
					var result = results.splice(posts.qty*(posts.page-1),posts.qty);
					res.end(JSON.stringify({
						total:total,
						result
					}));
				})
				break;
			case "/insert":
				connection.query(`insert into goods (name,qty,price,imgurl,our_price) values ("${posts.name}","${posts.qty}","${posts.price}","${posts.imgurl}","${posts.our_price}")`,function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					res.end(JSON.stringify(results));
				})
				break;
			case "/delete":
				connection.query(`DELETE FROM goods where id="${posts.id}"`,function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					res.end(JSON.stringify(results));
				})
				break;
			case "/update":
				connection.query(`update goods set name="${posts.name}",qty="${posts.qty}",price="${posts.price}",imgurl="${posts.imgurl}",our_price="${posts.our_price}" where id="${posts.id}"`,function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					res.end(JSON.stringify(results));
				})
				break;
			case "/up":
				connection.query(`update goods set html='${posts.res}' where id='${posts.id}'`,function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					res.end(JSON.stringify(results));
				})
				break;
			case "/html":
				connection.query(`SELECT * FROM goods where id='${posts.id}'`,function(error,results,fields){
					if(error) throw error;
					//console.log('The solution is:',results);
					res.end(JSON.stringify(results));
				})
				break;
			case "/search":
				if(posts.txt=='所有类别'){
					connection.query('SELECT * FROM goods',function(error,results,fields){
						if(error) throw error;
						//console.log('The solution is:',results);
						res.end(JSON.stringify(results));
					})
				}else{	
					connection.query(`SELECT * FROM goods where ${posts.txt} LIKE '%${posts.val}%'`,function(error,results,fields){
						if(error) throw error;
						//console.log('The solution is:',results);
						res.end(JSON.stringify(results));
					})
				}
				break;
		}
	})
	//connection.end();
}).listen(4321);