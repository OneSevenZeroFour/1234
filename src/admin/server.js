var express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();
var multer = require("multer");
//配置上传文件存放的信息
var storage = multer.diskStorage({
	//设置上传文件存放的目录
	destination: function(req, file, cb) {
		cb(null, '../img/oplist')
	},
	//设置上传后文件的名字
	filename: function(req, file, cb) {
		//拼接文件名和文件后缀
		var fileFormat = file.originalname.split(".");
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
	}
});

//往multer去配置这个存放文件的信息
var upload = multer({
	storage: storage
});

//多文件上传
app.post('/profile', upload.any(), function(req, res, next) {
	var ress =[];
	req.files.map(function(item){
		ress.push(item.filename)
	});
	console.log(ress)
	res.append('Access-Control-Allow-Origin','*');
	res.send(ress); 
});


//数据库功能
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'outlets'
});

//连接数据库
connection.connect();

//查询全部
app.post("/select", function(req, res){

	//req.body是ajax传过来的数据
	console.log(req.body)

	connection.query('select * from goods',function(error,results,fields){

		if(error) throw error;
		
		//向前端发送请求到的数据，并且转成JSON字符串
		res.send(JSON.stringify({
			status:1,
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});


//增加商品
app.post("/insert", function(req, res){
	console.log(req.body)
	connection.query(`insert into goods (name,qty,price,our_price) values ('${req.body.name}','${req.body.qty}','${req.body.price}','${req.body.our_price}')`,function(error,results,fields){

		if(error) throw error;
		
		//向前端发送请求到的数据，并且转成JSON字符串
		res.send(JSON.stringify({
			status:'增加成功',
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});

//删除单个
app.post("/delete", function(req, res){

	connection.query(`DELETE FROM goods where id=${req.body.goodsId}`,function(error,results,fields){

		if(error) throw error;
		
		//向前端发送请求到的数据，并且转成JSON字符串
		res.send(JSON.stringify({
			status:1,
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});


//查询 input框关键字
app.post("/search", function(req, res){

	connection.query(`SELECT * from goods WHERE CONCAT(name,qty,price,our_price) like '${req.body.searchtext}%'`,function(error,results,fields){

		if(error) throw error;
		
		//向前端发送请求到的数据，并且转成JSON字符串
		res.send(JSON.stringify({
			status:1,
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});

//查询当前id的信息（查询当前id对应的商品 把内容填充到input里）
app.post("/haveid", function(req, res){

	connection.query(`select * FROM goods where id=${req.body.goodsId}`,function(error,results,fields){

		if(error) throw error;
		
		res.send(JSON.stringify({
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});

//改  username = 字符串
app.post("/update", function(req, res){

	connection.query(`UPDATE goods SET name="${req.body.name}",qty="${req.body.qty}",price="${req.body.price}",our_price="${req.body.our_price}" WHERE id=${req.body.goodsId}`,function(error,results,fields){

		if(error) throw error;
		
		res.send(JSON.stringify({
			status:'数据修改成功',
			results
		}))
	});

	res.setHeader('Access-Control-Allow-Origin','*');
});

//监听端口，并打开服务器
app.listen(12346);
console.log("开启服务器")
