const userService = require('../services/user.services')
const userMiddlewares = require('../middlewares/user.middlewares');

module.exports = (app) => {
	 //Login email and password. Return JWT token if success.
	 app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.signIn(email, password);

    if (token) {
      res.status(200).json({token});
    }
    else {
      res.status(400).json({ error: 'Bad credentials' });
    }
  })

	app.get('/user/self', async (req, res) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      const user = await userService.getUserByToken(token);
      
      if(user){
        res.status(200).json(user);
      }
      else
        throw new Error("User not found");
    }
    catch (error){
      res.status(404).json({error: error.message});
    }
  })

	app.get('/user', userMiddlewares.isAdmin, async (req, res) => {
		const users = await userService.getUsers(req.query.q);

		if (users) {
			res.status(200).json(users);
		}
		else {
			res.status(404).send('Users not found');
		}
	})

	app.post('/user', userMiddlewares.isAdmin, async (req, res) => {
		try {
			const user = await userService.newUser(req.body);

			if (user) {
				res.status(202).json(user);
			}
			else {
				res.status(400).send('Could not create user');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	//Get, Update, Delete
	app.get('/user/:userId', userMiddlewares.isAdmin, async (req, res) => {
		try {
			const user = await userService.getUserById(req.params.userId);
			if (user) {
				res.status(200).json(user);
			}
			else {
				throw new Error('User not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/user/:userId', userMiddlewares.isAdmin, async (req, res) => {
		try {
			await userService.updateUser(req.params.userId, req.body);
			res.status(200).send('User updated');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.delete('/user/:userId', userMiddlewares.isAdmin, async (req, res) => {
		try {
			await userService.deleteUser(req.params.userId);
			res.status(200).send('User deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})
}

