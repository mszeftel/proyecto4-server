const locationService = require('../services/location.services')

module.exports = (app) => {
	app.get('/region', async (req, res) => {
		const regions = await locationService.getRegions();

		if (regions) {
			res.status(200).json(regions);
		}
		else {
			res.status(404).send('Countries not found');
		}
	})

	app.post('/region', async (req, res) => {
		const region = await locationService.newRegion(req.body);
		try {
			if (region) {
				res.status(201).json(region);
			}
			else {
				throw new Error(`Could not create region ${req.body.name}`);
			}
		}
		catch (error) {
			res.status(400).send(error.message );
		}
	})

	app.post('/region', async (req, res) => {
		try {
			const region = await locationService.newRegion(req.body);

			if (region) {
				res.status(201).json(region);
			}
			else {
				throw new Error(`Could not create region ${req.body.name}`);
			}
		}
		catch (error) {
			res.status(400).send(error.message );
		}
	})

	app.get('/region/:regionId', async (req, res) => {
		try {
			const region = await locationService.getRegionById(req.params.regionId);
			if (region) {
				res.status(200).json(region);
			}
			else {
				throw new Error('Region not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.put('/region/:regionId', async (req, res) => {
		try {
			await locationService.updateRegion(req.params.regionId, req.body);
			res.status(200).send('Region updated');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.delete('/region/:regionId', async (req, res) => {
		try {
			await locationService.deleteRegion(req.params.regionId);
			res.status(200).send('Region deleted');
		}
		catch (error) {
			res.status(400).send(error.message);
		}
	})

	app.get('/region/:regionId/country', async (req, res) => {
		try {
			const countries = await locationService.getCountries(req.params.regionId);

			if (countries) {
				res.status(200).json(countries);
			}
			else {
				res.status(404).send('Countries for region not found');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	app.post('/region/:regionId/country', async (req, res) => {
		try {
			const country = await locationService.newCountry(req.params.regionId,req.body);

			if (country) {
				res.status(202).json(country);
			}
			else {
				res.status(400).send('Could not create country');
			}
		}
		catch (error) {
			res.status(400).send(error.message);

		}
	})

	app.get('/region/:regionId/country/:countryId/city', async (req, res) => {
		try {
			const countries = await locationService.getCountries(req.params.regionId);
			if (!countries || !countries.find(_country=>_country.id==req.params.countryId) ){
				throw new Error('Country and Region mismatch');
			}

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

	app.post('/region/:regionId/country/:countryId/city', async (req, res) => {
		try {

			const countries = await locationService.getCountries(req.params.regionId);
			if (!countries || !countries.find(_country=>_country.id==req.params.countryId) ){
				throw new Error('Country and Region mismatch');
			}

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

	app.get('/country', async (req, res) => {
		const regions = await locationService.getAllCountries();

		if (regions) {
			res.status(200).json(regions);
		}
		else {
			res.status(404).send('Countries not found');
		}
	})

	app.get('/city', async (req, res) => {
		const regions = await locationService.getAllCities();

		if (regions) {
			res.status(200).json(regions);
		}
		else {
			res.status(404).send('Countries not found');
		}
	})

}