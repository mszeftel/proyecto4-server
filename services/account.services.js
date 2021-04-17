const config = require('../config/config')
const Sequelize = require('sequelize');
const initModels = require('../models/init-models');

const sequelize = new Sequelize(
	`${config.DB_DIALECT}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
	{
		logging: false
	}
);

const { Accounts } = initModels(sequelize);

async function getAccounts() {
	const { count, rows } = await Accounts.findAndCountAll();
	return rows;
}

async function newAccount(account) {
	try {
		const createdAccount = await Accounts.create(
			{
				name: account.name,
				address: account.address,
				email: account.email,
				phone: account.phhone,
				cityId: account.cityId,
			}
		);

		return createdAccount;
	}
	catch (e) {
	}
}

async function getAccountById(accountId) {
	const account = await Accounts.findOne({
		where: {
			id: accountId
		}
	});

	return account;
}

async function updateAccount(accountId, account) {
	try {
		const oldAccount = await Accounts.findOne({
			where: {
				id: accountId
			}
		});

		if (oldAccount) {
			oldAccount.name = account.name;
			oldAccount.address = account.address;
			oldAccount.email = account.email;
			oldAccount.phone = account.phone;
			oldAccount.cityId = account.cityId;
			oldAccount.save();
			return account;
		}
		else
			throw new Error('Account not found');

	}
	catch (error) {
	}
}

async function deleteAccount(accountId) {
	try {
		const oldAccount = await Accounts.findOne({
			where: {
				id: accountId
			}
		});
		if (oldAccount) {
			await oldAccount.destroy();
		}
		else
			throw new Error('Account not found');
	}
	catch (error) {
		throw error;
	}
}

module.exports = {
	getAccounts,getAccountById,newAccount,updateAccount,deleteAccount
}