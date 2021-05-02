const config = require('../config/config')
const jwt = require('jsonwebtoken');
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
	let queryOptions = { attributes: { exclude: ['password'] } }

	if (q) queryOptions.where = { name: { [Op.like]: `%${q}%` } }

	const rows = await Users.findAll(queryOptions);
	return rows;
}

async function newUser(user) {
	try {
		const duplicatedEmail = await Users.findOne({ where: { email: user.email } });
		if (duplicatedEmail)
			throw new Error('Email already exists');

		const createdUser = await Users.create(
			{
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				password: user.password,
				profile: user.profile
			}
		);

		createdUser.password = '*';

		return createdUser;
	}
	catch (e) {
		throw e;
	}
}

async function getUserById(userId) {
	const user = await Users.findOne({
		attributes: { exclude: ['password'] },
		where: {
			id: userId
		}
	});

	return user;
}

async function updateUser(userId, user) {
	try {
		const duplicatedEmail = await Users.findOne({
			where: { email: user.email, id: { [Op.not]: userId } }
		});
		if (duplicatedEmail)
			throw new Error('Email already exists');

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
			if (user.password) oldUser.password = user.password;
			oldUser.save();
		}
		else
			throw new Error('User not found');

	}
	catch (error) {
		throw error;
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

async function signIn(email, password) {
	//Check credentials
	const user = await Users.findOne({
		where: {
			email: email || '',
			password: password || ''
		}
	});

	console.log(user);

	if (user) {
		const token = jwt.sign({
			id: user.id,
			email: user.email,
			profile: user.profile,
		}, config.JWT_KEY, {
			algorithm: "HS512",
			expiresIn: 12000
		});

		return token;
	}
	else {
		return undefined;
	}
}

async function getUserByToken(token) {
	const decodedUser = jwt.verify(token, config.JWT_KEY);
	const user = await getUserById(decodedUser.id);

	return user;
}

module.exports = {
	getUsers, getUserById, newUser, updateUser, deleteUser, signIn, getUserByToken
}