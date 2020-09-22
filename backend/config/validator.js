const Joi = require('@hapi/joi');

const validator = {
	validateUser: (req, res, next) => {
		const schema = Joi.object({
			firstName: Joi.string().trim().min(3).max(20).required(),
			lastName: Joi.string().trim().min(3).max(20).required(),
			mail: Joi.string().trim().email().required(),
			pass: Joi.string().trim().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/, 'password').required()
		})
		const validation = schema.validate(req.body, { abortEarly: false })
		
		if(validation.error !== undefined){
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	},
	validateProduct: (req, res, next) =>{
		const schema = Joi.object({
			//...
		})
		const validation = schema.validate(req.body, { abortEarly: false })
		
		if(validation.error !== undefined){
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	}
}

module.exports = validator;
