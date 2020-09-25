const express = require("express")
const userController = require("../controllers/userController")
const commentController = require("../controllers/commentController")
const productController = require ("../controllers/productController")
const validator = require("../config/validator")
const passport = require("../config/passport")
const orderController = require("../controllers/orderController")
const router = express.Router()



// USER ROUTES
router.route("/user/register")
.post(/*validator.validateUser,*/userController.createUser)

router.route("/user/modifyUser")
.put(passport.authenticate('jwt',{session: false}),userController.editUser)

router.route("/user/getInfoUser")
.get(passport.authenticate('jwt',{session: false}), userController.userInfo)

router.route("/user/login")
.get(passport.authenticate('jwt',{session: false}), userController.decodeUser)
.post(userController.loginUser)

router.route("/user/addWishList")
.put(passport.authenticate('jwt',{session: false}), userController.addToWishlist)

router.route("/user/removeWishList")
.delete(passport.authenticate('jwt',{session: false}), userController.removeToWishlist)





// PRODUCTS ROUTES
router.route("/product/createProduct")
.post( productController.createProduct)

router.route("/product/getProduct/:id")
<<<<<<< HEAD
.get(productController.getProductById)
=======
.post(productController.getProductById)
>>>>>>> Cris

router.route("/product/editProduct")
.put( productController.modifyProduct)

router.route("/product/deleteProduct")
.delete(productController.deleteProduct)

router.route("/product/listProducts")
.get(productController.getAllProducts)


router.route("/product/wishList")
.get(productController.getProductByWishlist)

router.route("/products/:category")
.get(productController.getProductByCat)

// ORDER ROUTES
router.route("/orders")
.get(orderController.getAllOrders)
.post(orderController.createOrder)
// .put(passport.authenticate('jwt', {session: false}), orderController.modifyOrder)

router.route("/orders/:id")
.get(orderController.getOrderById)
.delete(orderController.deleteOrder)
.put(orderController.modifyOrder)


router.route("/orders/user")
.get(passport.authenticate('jwt', {session: false}), orderController.getUserOrder)





// COMNENTS ROUTES

router.route("/comment/:productId")
.get(commentController.getProductComments)

router.route("/comment")
.post(commentController.postComment)
.put(commentController.modifyCommentById)

router.route("/comment/:id")
.delete(commentController.deleteCommentById)





module.exports = router;
