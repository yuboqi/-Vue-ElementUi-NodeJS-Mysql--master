//用户注册ybq

const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/signup');

router.get('/', function(ctx, next) {
	ctx.body = '这是用户注册页面'
});


// 用户注册接口
router.post('/', async (ctx, next) => {
	// console.log(ctx.request.body);
	let cust_id = ctx.request.body.cust_id;
	let cust_password = ctx.request.body.cust_password;
	let cust_account = ctx.request.body.cust_account;
	let cust_name = ctx.request.body.cust_name;
	let cust_address = ctx.request.body.cust_address;
	let cust_phone = ctx.request.body.cust_phone;
	let cust_birthday = ctx.request.body.cust_birthday;
	let cust_email = ctx.request.body.cust_email;
	let cust_sex = ctx.request.body.cust_sex;
	//根据用户id值更新数据
	let a = await query(
		`INSERT INTO customer (cust_id,cust_account,cust_password,cust_name, cust_address, cust_phone, cust_birthday, cust_email, cust_sex) 
		VALUES ('${cust_id}','${cust_account}','${cust_password}', '${cust_name}','${cust_address}', '${cust_phone}', '${cust_birthday}', '${cust_email}','${cust_sex}');`
	);
	console.log(a);
	console.log(a.code);
	console.log("---------");
	if (a.affectedRows == 1) {
		// 更新成功
		//根据id查询数据库,返回前端
		let newA = await query(`SELECT * FROM customer WHERE cust_id = ${cust_id}`);
		// 格式化数据类型
		var newDataString = JSON.stringify(newA);
		var newResult = JSON.parse(newDataString);
		console.log(newResult);
		// 200代表更新成功
		let data = {
			code: 200,
			newResult
		};
		ctx.body = data;
	} else {
		let data = {
			code: 400,
			errorMessage: "注册失败"
		};
		ctx.body = data;
	}
});


//查看用户是否存在
router.get('/account', async (ctx, next) => {
	// console.log(ctx.request.body);
	let cust_account = ctx.request.body.cust_account;
	//根据用户id值更新数据
	let a = await query(
		`SELECT * from customer WHERE cust_account = '${cust_account}'`
	);
	console.log(a.length);

	if (a.length == 0) {
		// 更新成功
		// 200代表更新成功
		let data = {
			code: 200,
		};
		ctx.body = data;
	} else {
		let data = {
			code: 400,
			errorMessage: "用户已存在"
		};
		ctx.body = data;
	}
});




module.exports = router
