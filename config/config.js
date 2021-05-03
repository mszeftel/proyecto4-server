require('dotenv').config();

module.exports = {
	NODE_BASEURL: process.env.BASEURL || '/DW',
	NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
	PORT: process.env.PORT || 3000,
	JWT_KEY: process.env.JWT_ENV || 'ksdjfaskj2sdfafaf809ksjlkasfjaf',
	DB_HOST: process.env.DB_HOST || '127.0.0.1',
	DB_PORT: process.env.DB_PORT || '3306',
	DB_USER: process.env.DB_USER || 'root',
	DB_PASS: process.env.DB_PASS || '',
	DB_DIALECT: process.env.DB_DIALECT || 'mariadb',
	DB_DATABASE: process.env.DB_DATABASE || 'datawarehouse'
}