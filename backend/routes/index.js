const express = require("express")
const userController = require("../controllers/userController")
const commentController = require("../controllers/commentController")
const validator = require("../config/validator")
const passport = require("../config/passport")

const router = express.Router()

// USER ROUTES
router.route("/user/register")
.post(validator.validateUser,userController.createUser)

router.route("/user/modifyUser")
.put(passport.authenticate('jwt',{session: false}),userController.editUser)

router.route("/user/login")
.get(passport.authenticate('jwt',{session: false}), userController.decodeUser)
.post(userController.loginUser)

// PRODUCTS ROUTES


// ORDER ROUTES


// COMNENTS ROUTES

router.route("/comment/:productId")
.get(commentController.getProductComments)

router.route("/comment")
.post(commentController.postComment)
.put(commentController.modifyCommentById)

router.route("/comment/:id")
.delete(commentController.deleteCommentById)


module.exports = router;
