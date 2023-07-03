var express = require('express')
var router = express.Router()
var { CartModel, CartOrderModel, AferSaleModel, ProUserModel } = require('../db/model')
var { createToken, decodeToken } = require('../utils/token')
var axios = require('axios')
var multer = require('multer')
var routes = require('../utils/routes')
var getRouterListByRole = require('../utils')
var { insertDataFromTable, findAllDataFromTable, findOneDataFromTable, removeDataFromTable, updateDataFromTable } = require('../db/index')
// 定义的操作数据库的方法




// 添加汽车
router.post('/add', (req, res) => {
    var body = req.body;
    decodeToken(req, res, async ({ phone }) => {
        let author = await findOneDataFromTable({
            model: ProUserModel,
            res,
            query: {
                phone
            },
            next: 1
        })
        body.time = new Date()
        body.author = author
        body.sale = 1
        insertDataFromTable({
            model: CartModel,
            res,
            data: body
        })
    })
})

// 查询汽车列表
router.post("/list", (req, res) => {
    var query = {}
    var body = req.body;
    if (body.brand) {
        query.brand = new RegExp(body.brand)
    }
    if (body.type) {
        query.type = body.type;
    }
    console.log(body);
    if (body.time) {
        query.time = {
            $gte: JSON.parse(body.time)[0],
            $lte: JSON.parse(body.time)[1]
        }
    }
    const sort = {}
    if (body.sort) {
        sort.price = body.sort
    }
    decodeToken(req, res, ({ phone }) => {
        findAllDataFromTable({
            model: CartModel,
            res,
            query: query,
            sort: sort
        })
    })
})
// 删除汽车
router.post("/delete", (req, res) => {
    var body = req.body
    decodeToken(req, res, ({ phone }) => {
        removeDataFromTable({
            model: CartModel,
            res,
            query: {
                _id: body._id   // 唯一的主键 
            },
        })
    })
})
// 修改
router.post("/update", (req, res) => {
    var body = req.body
    if (body.sale) {
        body.sale = +body.sale
    }
    if (body.price) {
        body.price = +body.price
    }
    decodeToken(req, res, ({ phone }) => {
        updateDataFromTable({
            model: CartModel,
            res,
            query: {
                _id: body._id   // 唯一的主键 
            },
            data: body,
        })
    })
})

// 添加订单
router.post('/order/add', (req, res) => {
    var body = req.body;
    decodeToken(req, res, async ({ phone }) => {
        let author = await findOneDataFromTable({
            model: ProUserModel,
            res,
            query: {
                phone
            },
            next: 1
        })
        let order = await findOneDataFromTable({
            model: CartModel,
            res,
            query: {
                _id: body._id
            },
            next: 1
        })
        if (order.sale == 1 && order.num > body.count) {
            body.time = new Date()
            body.author = author
            body.cartId = body._id
            body._id = undefined
            body.total=body.price*body.count
            insertDataFromTable({
                model: CartOrderModel,
                res,
                data: body,
                next: 1
            })
            updateDataFromTable({
                model: CartModel,
                res,
                query: {
                    _id: body.cartId
                },
                data: {
                    num: order.num - body.count
                }
            })
        } else {
            res.json({
                code: 501,
                msg: '当前车辆已经下架或没有库存',
            })
        }
    })
})
// 查询列表
router.post("/order/list", (req, res) => {
    var query = {}
    var body = req.body;
    if (body.brand) {
        query.brand = new RegExp(body.brand)
    }
    if (body.type) {
        query.type = body.type;
    }
    console.log(body);
    if (body.time) {
        query.time = {
            $gte: JSON.parse(body.time)[0],
            $lte: JSON.parse(body.time)[1]
        }
    }
    const sort = {}
    if (body.sort) {
        sort.price = body.sort
    }
    decodeToken(req, res, ({ phone }) => {
        findAllDataFromTable({
            model: CartOrderModel,
            res,
            query: query,
            sort: sort
        })
    })
})
// 删除订单
router.post("/order/delete", (req, res) => {
    var body = req.body
    decodeToken(req, res, ({ phone }) => {
        removeDataFromTable({
            model: CartOrderModel,
            res,
            query: {
                _id: body._id   // 唯一的主键 
            },
        })
    })
})
// 修改订单数量
router.post("/order/update", (req, res) => {
    var body = req.body
    // 只能修改订单中的购买数量 同时查库存
    decodeToken(req, res, async ({ phone }) => {
        let cart = await findOneDataFromTable({
            model: CartModel,
            res,
            query: {
                _id: body.cartId
            },
            next: 1
        })
        let order = await findOneDataFromTable({
            model: CartOrderModel,
            res,
            query: {
                _id: body._id
            },
            next: 1
        })
        if (cart.num > (body.count - order.count)) {
            body.total=body.price*body.count
            updateDataFromTable({
                model: CartOrderModel,
                res,
                query: {
                    _id: body._id   // 唯一的主键 
                },
                data: body,
                next: 1
            })
            updateDataFromTable({
                model: CartModel,
                res,
                query: {
                    _id: body.cartId
                },
                data: {
                    num: cart.num - (body.count - order.count)
                }
            })
        } else {
            res.json({
                code: 501,
                msg: "库存不足"
            })
        }
    })
})

// 添加售后 售后中不能再添加 
router.post('/aftersale/add', (req, res) => {
    var body = req.body;
    decodeToken(req, res, async ({ phone }) => {
        let author = await findOneDataFromTable({
            model: ProUserModel,
            res,
            query: {
                phone
            },
            next: 1
        })
        
        let aftersale = await findAllDataFromTable({
            model: AferSaleModel,
            res,
            query: {
                orderId: body._id
            },
            next: 1
        })
        console.log(aftersale);
        if (aftersale.filter(item => {
            return item.status != 3
        }).length == 0) {
            console.log(1);
            body.orderId = body._id
            body.time = new Date()
            body.author = author
            body.status = 1 //未解决
            body._id = undefined
            insertDataFromTable({
                model: AferSaleModel,
                res,
                data: body
            })
        }
        else {
            res.json({
                code: 501,
                msg: '当前订单已在售后中'
            })
        }
    })
})

// 查询汽车列表
router.post("/aftersale/list", (req, res) => {
    var query = {}
    var body = req.body;
    if (body.brand) {
        query.brand = new RegExp(body.brand)
    }
    if (body.type) {
        query.type = body.type;
    }
    console.log(body);
    if (body.time) {
        query.time = {
            $gte: JSON.parse(body.time)[0],
            $lte: JSON.parse(body.time)[1]
        }
    }
    const sort = {}
    if (body.sort) {
        sort.price = body.sort
    }
    decodeToken(req, res, ({ phone }) => {
        findAllDataFromTable({
            model: AferSaleModel,
            res,
            query: query,
            sort: sort
        })
    })
})
// 删除售后记录
router.post("/aftersale/delete", (req, res) => {
    var body = req.body
    decodeToken(req, res, ({ phone }) => {
        removeDataFromTable({
            model: AferSaleModel,
            res,
            query: {
                _id: body._id   // 唯一的主键 
            },
        })
    })
})
// 修改 只能修改售后状态
router.post("/aftersale/update", (req, res) => {
    var body = req.body
    decodeToken(req, res, ({ phone }) => {
        updateDataFromTable({
            model: AferSaleModel,
            res,
            query: {
                _id: body._id   // 唯一的主键 
            },
            data: {
                status: body.status
            },
        })
    })
})











module.exports = router;