const config = require('../config/config')
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const initModels = require('../models/init-models');

const sequelize = new Sequelize(
	`${config.DB_DIALECT}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
	{
		logging: false
	}
);

const { Users } = initModels(sequelize);

async function getUsers(q) {
	let queryOptions = {attributes: {exclude: ['password']}}

	if (q) queryOptions.where = { name: { [Op.like]: `%${q}%` } }

	const rows = await Users.findAll(queryOptions);
	return rows;
}

async function newUser(user) {
	try {
		const createdUser = await Users.create(
			{
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				password: user.password,
				profile: user.profile
			}
		);
		
		createdUser.password='*';

		return createdUser;
	}
	catch (e) {
	}
}

async function getUserById(userId) {
	const user = await Users.findOne({
		attributes: {exclude: ['password']},
		where: {
			id: userId
		}
	});

	return user;
}

async function updateUser(userId, user) {
	try {
		const oldUser = await Users.findOne({
			where: {
				id: userId
			}
		});

		if (oldUser) {
			oldUser.name = user.name;
			oldUser.lastname = user.lastname;
			oldUser.email = user.email;
			oldUser.profile = user.profile;
			if( user.password ) oldUser.password = user.password;			
			oldUser.save();
		}
		else
			throw new Error('User not found');

	}
	catch (error) {
	}
}

async function deleteUser(userId) {
	try {
		const oldUser = await Users.findOne({
			where: {
				id: userId
			}
		});
		if (oldUser) {
			await oldUser.destroy();
		}
		else
			throw new Error('User not found');
	}
	catch (error) {
		throw error;
	}
}

module.exports = {
	getUsers, getUserById, newUser, updateUser, deleteUser
}