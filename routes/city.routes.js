const locationService = require('../services/location.services')

module.exports = (app) => {
	app.get('/city', async (req, res) => {
		const cities = await locationService.getAllCities();

		if (cities) {
			res.status(200).json(cities);
		}
		else {
			res.status(404).send('Cities not found');
		}
	})

	//Get, Update, Delete
	app.get('/city/:cityId', async (req, res) => {
		try {
			const city = await locationService.getCityById(req.params.cityId);
			if (city) {
				res.status(200).json(city);
			}
			else {
				throw new Error('City not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/city/:cityId', async (req, res) => {
		try {
			await locationService.updateCity(req.params.cityId, req.body);
			res.status(200).send('City updated');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.delete('/city/:cityId', async (req, res) => {
		try {
			await locationService.deleteCity(req.params.cityId);
			res.status(200).send('City deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})
}