//权限管理

const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/role');



//权限管理
router.put('/update', async (ctx, next) => {
	// console.log(ctx.request.body);
	let root_id = ctx.request.body.root_id;
	let role = ctx.request.body.role;
	//更新数据
	let a = await query(
		`UPDATE root SET role = '${role}' WHERE root_id = ${root_id};`
	);
	console.log(a);

	if (a.affectedRows == 1) {
		// 更新成功

		//根据id查询数据库,返回前端
		let newA = await query(`SELECT * FROM root WHERE root_id = ${root_id}`);
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
			errorMessage: "修改失败"
		};
		ctx.body = data;
	}
});




module.exports = router
