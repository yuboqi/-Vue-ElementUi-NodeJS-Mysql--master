//产品信息页面ybq

const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/buyinsurance');


// 购买保险
router.post('/buy', async (ctx, next) => {
	// console.log(ctx.request.body);
	let number = ctx.request.body.number;
	let start_time = ctx.request.body.start_time;
	let end_time = ctx.request.body.end_time;
	let insurance_cost = ctx.request.body.insurance_cost;
	let type_id = ctx.request.body.type_id;
	let cust_id = ctx.request.body.cust_id;
	let root_id = ctx.request.body.root_id;

	let a = await query(
		`INSERT INTO insurance_policies (number,start_time,end_time,insurance_cost,type_id,cust_id,root_id) 
		VALUES ('${number}','${start_time}','${end_time}','${insurance_cost}', '${type_id}','${cust_id}','${root_id}');`
	);
	console.log("--------------------");
	console.log(a);
	if (a.affectedRows == 1) {
		// 更新成功
		//根据id查询数据库,返回前端
		let newA = await query(`SELECT * FROM insurance_policies WHERE cust_id = ${cust_id}`);
		// 格式化数据类型
		var newDataString = JSON.stringify(newA);
		var newResult = JSON.parse(newDataString);
		console.log(newResult);
		// 200代表更新成功
		let data = {
			code: 200,
			data: newResult
		};
		ctx.body = data;
	} else {
		let data = {
			code: 400,
			errorMessage: "购买失败"
		};
		ctx.body = data;
	}
});


//获取用户购买保险信息
router.get('/', async (ctx, next) => {
	// console.log(ctx.request.body);
	let cust_id = ctx.request.query.cust_id;
	//更新数据
	let a = await query(
		`SELECT * FROM insurance_policies WHERE cust_id = ${cust_id}`
	);
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(a);

	if (a.length > 0) {
		// 格式化数据类型
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);

		// 200代表更新成功
		let data = {
			code: 200,
			data: result
		};
		ctx.body = data;
	} else {
		let data = {
			code: 400,
			errorMessage: "无保险信息"
		};
		ctx.body = data;
	}
});




module.exports = router
