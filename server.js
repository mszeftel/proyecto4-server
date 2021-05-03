const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const expressJwt = require('express-jwt');
const config = require('./config/config');

const regionRoutes = require('./routes/region.routes');
const countryRoutes = require('./routes/country.routes');
const cityRoutes = require('./routes/city.routes');
const accountRoutes = require('./routes/account.routes');
const contactRoutes = require('./routes/contact.routes');
const userRoutes = require('./routes/user.routes');

const rootRouter = express();
const app = express.Router();

rootRouter.use(config.NODE_BASEURL,app);	

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(expressJwt({ secret: config.JWT_KEY, algorithms: ['HS512'] })
	.unless({
		path: [{ url:  `${config.NODE_BASEURL}/health`, methods: ['GET'] },
		{ url: `${config.NODE_BASEURL}/user/login`, methods: ['POST'] },
		{ url: `${config.NODE_BASEURL}/user/self`, methods: ['GET'] },
		]
	})
);

app.get('/health', (req, res) => {
	res.json({ messsage: "Datawarehouse API" })
});

regionRoutes(app);
countryRoutes(app);
cityRoutes(app);
accountRoutes(app);
contactRoutes(app);
userRoutes(app);

const sequelize = new Sequelize(
	`${config.DB_DIALECT}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`
);

sequelize.authenticate()
	.then(() => {
		console.log('Connection to database successful.');
	})
	.catch(error => {
		console.error('Unable to connect to the database:', error);
		process.exit(1);
	})


rootRouter.listen(config.PORT, () => {
	console.log(`Server listening on PORT ${config.PORT}`)
});

