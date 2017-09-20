//引入http模块  mysql模块
const http = require('http');
const mysql = require('mysql');	//第三方模块

//查询字符串，一般是对http请求所带的数据进行解析
//有4个方法 现在用querystring.parse()  字符串转化为一个对象
const querystring = require('querystring');

//利用url.parse()方法，将一个url的字符串地址解析并返回一个url对象
//url.parse方法里有一个pathname属性，利用这个属性判断对应的页面作出不同的操作
const url = require('url');

//连接数据库  createConnection()方法
var connection = mysql.createConnection({

	host:'localhost',
	user:'root',
	password:'',
	database:'outlets'
});

//连接数据库
connection.connect();

//创建服务器 createServer(fn(req,res))
//解析url的专用模块
//request是一个stream流
http.createServer(function(req,res){

	//存放流数据
	var post = '';

	req.on('data',function(chunk){
		//不断写入流数据
		post += chunk;
	});

	//获取数据结束
	req.on('end',function(){

		//获取url的路径名
		var pathname = url.parse(req.url).pathname;

		//获取ports  前端在ajax里传入的数据  是一个对象
		var ports = querystring.parse(post);console.log(ports)

		//设置请求头
		res.setHeader('Access-Control-Allow-Origin','*');

		//判断路径名 作出不同的处理
		switch(pathname){

			//查询全部（查）
			case '/select':
				connection.query('select * from goods',function(error,results,fields){
					if(error) throw error;
					console.log(error)
					//向前端发送请求到的数据，并且转成JSON字符串
					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				break;

			//插入（增）
			case '/insert':

				connection.query(`insert into goods (username,description) values ('${ports.username}','${ports.description}')`,function(error,results,fields){
					if(error) throw error;

					//向前端发送请求到的数据，并且转成JSON字符串
					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				break;

			//删除单个
			case '/delete':
				connection.query(`DELETE FROM goods where id=${ports.userid}`,function(error,results,fields){
					if (error) throw error;

					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				break;

			//查询
			case '/search':
				connection.query(`SELECT * from goods WHERE CONCAT(username,description) like '${ports.searchtext}%'`,function(error,results,fields){
					if (error) throw error;

					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				break;

			//查询当前id的信息（准备修改）
			case '/haveid':
				connection.query(`select * FROM goods where id=${ports.userid}`,function(error,results,fields){
					if (error) throw error;

					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				break;

			//改  username = 字符串
			case '/update':
				connection.query(`UPDATE goods SET username="${ports.username}",description="${ports.description}" WHERE id=${ports.userid}`,function(error,results,fields){
					if (error) throw error;

					res.end(JSON.stringify({
						status:1,
						results
					}))
				});
				
		}
	})

}).listen(8888)

console.log('server start!')

