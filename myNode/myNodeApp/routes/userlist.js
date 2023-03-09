//权限管理

const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/userlist');



//获取用户列表
router.get('/', async (ctx, next) => {
	// console.log(ctx.request.body);
	//更新数据

	//获取root和customer表中的数据的sql语句
	let a = await query(
		`SELECT * FROM root;`
	);
	let b = await query(
		`SELECT * FROM customer;`
	);
	console.log(a);
	console.log(b);

	if (a.length > 0 && b.length > 0) {
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
		var dataString2 = JSON.stringify(b);
		var result2 = JSON.parse(dataString2);

		console.log(result);
		console.log(result2);

		// 200代表更新成功
		let data = {
			code: 200,
			root: result,
			customer: result2
		};
		ctx.body = data;
	} else if(a.length > 0 && b.length == 0){
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
		console.log(result);
		// 200代表更新成功
		let data = {
			code: 200,
			root: result,
			customer: []
		};
		ctx.body = data;
	}else if(a.length == 0 && b.length > 0){
		var dataString2 = JSON.stringify(b);
		var result2 = JSON.parse(dataString2);
		console.log(result2);
		// 200代表更新成功
		let data = {
			code: 200,
			root: [],
			customer: result2
		};
		ctx.body = data;
}else{
		let data = {
			code: 400,
			errorMessage: "获取失败"
		};
		ctx.body = data;
	}
}
);

//保险员查看自己手下的客户
router.get('/user', async (ctx, next) => {
	let root_id = ctx.request.query.root_id;
	//更新数据

	//获取root和customer表中的数据的sql语句
	let b = await query(
		`SELECT cust_id FROM insurance_policies WHERE root_id = ${root_id}`
	);
	// console.log(b);
	//格式化数据
	var dataString2 = JSON.stringify(b);
	var result2 = JSON.parse(dataString2);
	console.log(result2);
	//对于cust_id进行去重
	var arr = [];
	for (var i = 0; i < result2.length; i++) {
		if (arr.indexOf(result2[i].cust_id) == -1) {
			arr.push(result2[i].cust_id);
		}
	}
	//对于arr进行遍历，获取每个cust_id对应的customer表中的数据
	var result3 = [];
	for (var i = 0; i < arr.length; i++) {
		let c = await query(
			`SELECT * FROM customer WHERE cust_id = ${arr[i]}`
		);
		var dataString3 = JSON.stringify(c);
		var result4 = JSON.parse(dataString3);
		result3.push(result4[0]);
	}
	console.log(result3);
	if (result3.length > 0) {
		// 200代表更新成功
		let data = {
			code: 200,
			customer: result3
		};
		ctx.body = data;
	} else {
		let data = {
			code: 400,
			errorMessage: "获取失败"
		};
		ctx.body = data;
	}
}
);





module.exports = router
