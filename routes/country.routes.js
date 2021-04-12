const locationService = require('../services/location.services')

module.exports = (app) => {
	app.get('/country', async (req, res) => {
		const countries = await locationService.getAllCountries();

		if (countries) {
			res.status(200).json(countries);
		}
		else {
			res.status(404).send('Countries not found');
		}
	})

	//Get update delete
	app.get('/country/:countryId', async (req, res) => {
		try {
			const country = await locationService.getCountryById(req.params.countryId);
			if (country) {
				res.status(200).json(country);
			}
			else {
				throw new Error('Country not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/country/:countryId', async (req, res) => {
		try {
			await locationService.updateCountry(req.params.countryId, req.body);
			res.status(200).send('Country updated');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.delete('/country/:countryId', async (req, res) => {
		try {
			await locationService.deleteCountry(req.params.countryId);
			res.status(200).send('Country deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	// getCities, addCity
	app.get('/country/:countryId/city', async (req, res) => {
		try {
			const cities = await locationService.getCities(req.params.countryId);

			if (cities) {
				res.status(200).json(cities);
			}
			else {
				res.status(404).send('Cities for country not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	app.post('/country/:countryId/city', async (req, res) => {
		try {
			const city = await locationService.newCity(req.params.countryId,req.body);

			if (city) {
				res.status(202).json(city);
			}
			else {
				res.status(400).send('Could not create city');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

}