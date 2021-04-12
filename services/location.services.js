const config = require('../config/config')
const Sequelize = require('sequelize');
const initModels = require('../models/init-models');
const regionRoutes = require('../routes/region.routes');

const sequelize = new Sequelize(
	`${config.DB_DIALECT}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
	{
		logging: false
	}
);

const { Regions, Countries, Cities } = initModels(sequelize);

async function getRegions() {
	const { count, rows } = await Regions.findAndCountAll();
	return rows;
}

async function newRegion(region) {
	try {
		const createdRegion = await Regions.create(
			{ name: region.name }
		);

		return createdRegion;
	}
	catch (e) {
	}
}

async function getRegionById(regionId) {
	const region = await Regions.findOne({
		where: {
			id: regionId
		}
	});

	return region;
}

async function updateRegion(regionId, region) {
	try {
		const oldRegion = await Regions.findOne({
			where: {
				id: regionId
			}
		});

		if (oldRegion) {
			oldRegion.name = region.name;
			oldRegion.save();
			return region;
		}
		else
			throw new Error('Region not found');

	}
	catch (error) {
	}
}

async function deleteRegion(regionId) {
	try {
		const oldRegion = await Regions.findOne({
			where: {
				id: regionId
			}
		});
		if (oldRegion) {
			await oldRegion.destroy();
		}
		else
			throw new Error('Region not found');
	}
	catch (error) {
		throw error;
	}
}

async function getCountries(regionId) {
	try {
		const countries = await Countries.findAndCountAll({
			where: {
				region_id: regionId
			}
		});
		return countries.rows;
	}
	catch (error) {
		throw error;
	}
}

async function newCountry(regionId, country) {
	try {
		const region = await getRegionById(regionId);
		if (!region) {
			throw new Error(`Region ${regionId} does not exist`);
		}
		const createdCountry = await Countries.create({
			name: country.name,
			regionId: regionId
		});

		return createdCountry;
	}
	catch (e) {
		throw e;
	}
}


async function getCities(countryId) {
	try {
		const cities = await Cities.findAndCountAll({
			where: {
				country_id: countryId
			}
		});
		return cities.rows;
	}
	catch (error) {
		throw error;
	}
}

async function newCity(countryId, city) {
	try {
		const country = await getRegionById(countryId);
		if (!country) {
			throw new Error(`Country ${countryId} does not exist`);
		}
		const createdCity = await Cities.create({
			name: city.name,
			countryId: countryId
		});

		return createdCity;
	}
	catch (e) {
		throw e;
	}
}

async function getCountryById(countryId) {
	const country = await Countries.findOne({
		where: {
			id: countryId
		}
	});

	return country;
}

async function updateCountry(countryId, country) {
	try {
		const oldCountry = await Countries.findOne({
			where: {
				id: countryId
			}
		});

		if (oldCountry) {
			oldCountry.name = country.name;
			oldCountry.save();
			return country;
		}
		else
			throw new Error('Country not found');

	}
	catch (error) {
	}
}

async function deleteCountry(countryId) {
	try {
		const oldCountry = await Countries.findOne({
			where: {
				id: countryId
			}
		});
		if (oldCountry) {
			await oldCountry.destroy();
		}
		else
			throw new Error('Country not found');
	}
	catch (error) {
		throw error;
	}
}

async function getCityById(cityId) {
	const city = await Cities.findOne({
		where: {
			id: cityId
		}
	});

	return city;
}

async function updateCity(cityId, city) {
	try {
		const oldCity = await Cities.findOne({
			where: {
				id: cityId
			}
		});

		if (oldCity) {
			oldCity.name = city.name;
			oldCity.save();
			return city;
		}
		else
			throw new Error('City not found');

	}
	catch (error) {
	}
}

async function deleteCity(cityId) {
	try {
		const oldCity = await Cities.findOne({
			where: {
				id: cityId
			}
		});
		if (oldCity) {
			await oldCity.destroy();
		}
		else
			throw new Error('City not found');
	}
	catch (error) {
		throw error;
	}
}

async function getAllCountries() {
	const { count, rows } = await Countries.findAndCountAll();
	return rows;
}

async function getAllCities() {
	const { count, rows } = await Cities.findAndCountAll();
	return rows;
}

module.exports = {
	getRegions, newRegion, getRegionById, updateRegion, deleteRegion,
	getCountries, newCountry, getCities, newCity,
	getAllCountries,getCountryById,updateCountry,deleteCountry,
	getAllCities,getCityById,updateCity,deleteCity,
}