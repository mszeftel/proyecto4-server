const config = require('../config/config')
const Sequelize = require('sequelize');
const { QueryTypes, Op } = require('sequelize');
const initModels = require('../models/init-models');
const contacts = require('../models/contacts');

const sequelize = new Sequelize(
	`${config.DB_DIALECT}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
	{
		logging: false
	}
);

const { Contacts, ContactChannels, Cities, Countries, Regions, Accounts } = initModels(sequelize);

async function getContacts(q, filters, limit, offset) {
	//Get select and bound to model?
	try {
		const queryObject = {
			limit: Number(limit) || 20,
			offset: Number(offset) || 0,
			include: [
				{ model: ContactChannels, as: "contactChannels"},
				{	model: Cities, as: "city",
					include: [
						{
							model: Countries, as: "country",
							include: [{ model: Regions, as: "region"}]
						}
					]
				},
				{ model: Accounts, as: "account", required: true }
			]
		}

		if (q) {
			queryObject.where = { name: { [Op.like]: `%${q}%` } }
		}	

		if (filters) {
			if (filters.city){
				queryObject.include[1].required = true;
				queryObject.include[1].where = { name: { [Op.in]: [filters.city] } };
				
			}

			if (filters.country){
				queryObject.include[1].include[0].where = { name: { [Op.in]: [filters.country] } };
				queryObject.include[1].required = true;
				queryObject.include[1].include[0].required = true;
			}
				
			if (filters.region){
				queryObject.include[1].include[0].include[0].where = { name: { [Op.in]: [filters.region] } };
				queryObject.include[1].required = true;
				queryObject.include[1].include[0].required = true;
				queryObject.include[1].include[0].include[0].required = true;
			}
				
			if (filters.account){
				queryObject.include[2].where = { name: { [Op.in]: [filters.account] } };
				queryObject.include[2].required = true;
			}
				
		}


		const rows = await Contacts.findAll(queryObject);

		return rows;
	}
	catch (e) {
		console.log(e);
	}
}

async function newContact(contact) {
	try {
		console.log(contact);

		let queryObject = {}

		if (contact.contactChannels && contact.contactChannels.length) {
			queryObject = {
				include: [
					{ model: ContactChannels, as: "contactChannels" },
				]
			}
		}


		const createdContact = await Contacts.create(
			{
				name: contact.name,
				lastname: contact.lastname,
				position: contact.position,
				email: contact.email,
				address: contact.address,
				interest: contact.interest,
				cityId: contact.cityId,
				accountId: contact.accountId,
				contactChannels: contact.contactChannels
			},
			queryObject
		);

		return createdContact;
	}
	catch (e) {
		console.log(e);
	}

}

async function getContactById(contactId) {
	const contact = await Contacts.findOne({
		where: {
			id: contactId
		},
		include: [
			{ model: ContactChannels, as: "contactChannels" },
			{
				model: Cities, as: "city",
				include: [
					{
						model: Countries, as: "country",
						include: [{ model: Regions, as: "region" }]
					}
				]
			},
			{ model: Accounts, as: "account" }
		]
	});

	console.log(JSON.stringify(contact));
	return contact;
}

async function updateContact(contactId, contact) {
	try {
		const oldContact = await Contacts.findOne({
			where: {
				id: contactId
			},
			include: { model: ContactChannels, as: "contactChannels" }
		});

		const updatedContact = await sequelize.transaction(async (t) => {

			if (oldContact) {
				oldContact.name = contact.name;
				oldContact.lastname = contact.lastname;
				oldContact.position = contact.position;
				oldContact.email = contact.email;
				oldContact.address = contact.address;
				oldContact.interest = contact.interest;
				oldContact.cityId = contact.cityId;
				oldContact.accountId = contact.accountId;

				/* Modify channels */
				const origChannels = oldContact.contactChannels;
				const updatedChannels = contact.contactChannels;

				/* Find and destroy deleted channels */
				const deletedChannels = origChannels.filter(chan => !updatedChannels.map(uchan => uchan.id).includes(chan.id));
				deletedChannels.forEach(async dchan => await dchan.destroy());

				/*Find and create new channels */
				const newChannels = updatedChannels.filter(chan => !chan.id);
				newChannels.forEach(async nchan => {
					nchan.contactId = oldContact.id;
					await ContactChannels.create(nchan);
				})

				/*Find and update modified channels */
				const modifiedChannels = updatedChannels.filter(mchan => origChannels.map(ochan => ochan.id).includes(mchan.id));
				modifiedChannels.forEach(async (mchan) => {
					await ContactChannels.update({
						type: mchan.type,
						handle: mchan.handle,
						phone: mchan.phone,
						preference: mchan.preference
					}, {
						where: { id: mchan.id }
					})
				})

				return await oldContact.save();
			}
			else
				throw new Error('Contact not found');
		})

		return updatedContact;

	}
	catch (error) {
	}
}

async function deleteContact(contactId) {
	try {
		const oldContact = await Contacts.findOne({
			where: {
				id: contactId
			}
		});
		if (oldContact) {
			await oldContact.destroy();
		}
		else
			throw new Error('Contact not found');
	}
	catch (error) {
		throw error;
	}
}

async function getContactFilters(q) {
	const filters = [];

	const regions = await sequelize.query(
		`SELECT region.name FROM contacts
		LEFT JOIN cities city ON city.id=contacts.city_id
		LEFT JOIN countries country ON country.id=city.country_id
		LEFT JOIN regions region ON region.id=country.region_id
		WHERE region.name LIKE ? `,
		{
			replacements: [`%${q}%`],
			type: QueryTypes.SELECT
		}
	)
	regions.forEach(r => {
		filters.push({ filter: 'region', query: r.name, filterString: `filter[region]=${r.name}` })
	})

	const countries = await sequelize.query(
		`SELECT country.name FROM contacts
		LEFT JOIN cities city ON city.id=contacts.city_id
		LEFT JOIN countries country ON country.id=city.country_id
		WHERE country.name LIKE ? `,
		{
			replacements: [`%${q}%`],
			type: QueryTypes.SELECT
		}
	)
	countries.forEach(r => {
		filters.push({ filter: 'country', query: r.name, filterString: `filter[country]=${r.name}` })
	})

	const cities = await sequelize.query(
		`SELECT city.name FROM contacts
		LEFT JOIN cities city ON city.id=contacts.city_id
		WHERE city.name LIKE ? `,
		{
			replacements: [`%${q}%`],
			type: QueryTypes.SELECT
		}
	)
	cities.forEach(r => {
		filters.push({ filter: 'city', query: r.name, filterString: `filter[city]=${r.name}` })
	})

	const accounts = await sequelize.query(
		`SELECT account.name FROM contacts
		LEFT JOIN accounts account ON account.id=contacts.account_id
		WHERE account.name LIKE ? `,
		{
			replacements: [`%${q}%`],
			type: QueryTypes.SELECT
		}
	)
	accounts.forEach(r => {
		filters.push({ filter: 'account', query: r.name, filterString: `filter[account]=${r.name}` })
	})

	return filters;
}

async function getChannelOptions() {
	return { type: ContactChannels.rawAttributes.type.values, preference: ContactChannels.rawAttributes.preference.values }
}

module.exports = {
	getContacts, getContactById, newContact, updateContact, deleteContact, getContactFilters, getChannelOptions
}