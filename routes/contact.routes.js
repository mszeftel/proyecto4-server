const contactService = require('../services/contact.services')

module.exports = (app) => {
	app.get('/contact', async (req, res) => {
		const contacts = await contactService.getContacts(req.query.q,req.query.filter,req.query.limit,req.query.offset);

		if (contacts) {
			res.status(200).json(contacts);
		}
		else {
			res.status(404).send('Contacts not found');
		}
	})

	app.get('/contact/filters', async (req, res) => {
		const filters = await contactService.getContactFilters(req.query.q);

		console.log(filters);

		if (filters) {
			res.status(200).json(filters);
		}
		else {
			res.status(404).send('');
		}
	})

	app.get('/contact/channelOptions', async (req, res) => {
		try {
			const options = await contactService.getChannelOptions();
			res.status(200).json(options);
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.post('/contact', async (req, res) => {
		try {
			const contact = await contactService.newContact(req.body);

			console.log(contact);

			if (contact) {
				res.status(202).json(contact);
			}
			else {
				res.status(400).send('Could not create contact');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	//Get, Update, Delete
	app.get('/contact/:contactId', async (req, res) => {
		try {
			const contact = await contactService.getContactById(req.params.contactId);
			if (contact) {
				res.status(200).json(contact);
			}
			else {
				throw new Error('Contact not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/contact/:contactId', async (req, res) => {
		try {
			const contact = await contactService.updateContact(req.params.contactId, req.body);
			res.status(200).json(contact);
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	
	app.delete('/contact/:contactId', async (req, res) => {
		try {
			await contactService.deleteContact(req.params.contactId);
			res.status(200).send('Contact deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	
}