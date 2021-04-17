const accountService = require('../services/account.services')

module.exports = (app) => {
	app.get('/account', async (req, res) => {
		const accounts = await accountService.getAccounts();

		if (accounts) {
			res.status(200).json(accounts);
		}
		else {
			res.status(404).send('Accounts not found');
		}
	})

	app.post('/account', async (req, res) => {
		try {
			const account = await accountService.newAccount(req.body);

			if (account) {
				res.status(202).json(account);
			}
			else {
				res.status(400).send('Could not create account');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	//Get, Update, Delete
	app.get('/account/:accountId', async (req, res) => {
		try {
			const account = await accountService.getAccountById(req.params.accountId);
			if (account) {
				res.status(200).json(account);
			}
			else {
				throw new Error('Account not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/account/:accountId', async (req, res) => {
		try {
			await accountService.updateAccount(req.params.accountId, req.body);
			res.status(200).send('Account updated');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.delete('/account/:accountId', async (req, res) => {
		try {
			await accountService.deleteAccount(req.params.accountId);
			res.status(200).send('Account deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})
}