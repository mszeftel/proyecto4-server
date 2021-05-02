const userServices = require('../services/user.services.js');

exports.isAdmin = async (req,res,next) => {
	try{
		const token = req.headers.authorization.split(' ')[1];
		const user= await userServices.getUserByToken(token);
		
		if(user.profile=='admin'){
			next();
		}
		else
			throw new Error('Error');
	}
	catch(error){
		res.status(403).json({error: 'Forbidden'});
	}
}