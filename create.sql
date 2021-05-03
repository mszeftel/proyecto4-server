-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table datawarehouse.regions
CREATE TABLE IF NOT EXISTS `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table datawarehouse.regions: ~3 rows (approximately)
DELETE FROM `regions`;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` (`id`, `name`) VALUES
	(1, 'Sudamérica '),
	(2, 'Norteamérica'),
	(4, 'Centroamérica ');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;


-- Dumping structure for table datawarehouse.countries
CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_countries_regions` (`region_id`),
  CONSTRAINT `FK_countries_regions` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table datawarehouse.countries: ~5 rows (approximately)
DELETE FROM `countries`;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` (`id`, `name`, `region_id`) VALUES
	(1, 'Argentina', 1),
	(2, 'Mexico', 2),
	(4, 'Uruguay', 1),
	(7, 'Estados Unidos', 2),
	(8, 'Chile', 1);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;


-- Dumping structure for table datawarehouse.cities
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_countries_regions` (`country_id`) USING BTREE,
  CONSTRAINT `FK_cities_countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table datawarehouse.cities: ~6 rows (approximately)
DELETE FROM `cities`;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` (`id`, `name`, `country_id`) VALUES
	(1, 'Buenos Aires', 1),
	(2, 'Tijuana', 2),
	(6, 'Córdoba', 1),
	(7, 'Montevideo', 4),
	(8, 'Canelones', 4),
	(9, 'Boston', 7);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;

-- Dumping structure for table datawarehouse.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__cities` (`city_id`),
  CONSTRAINT `FK__cities` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table datawarehouse.accounts: ~2 rows (approximately)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `name`, `address`, `email`, `phone`, `city_id`) VALUES
	(8, 'La montevideana', 'Artigas', 'info@mont.uy', '231312', 7),
	(11, 'La mejor', 'Centro del mundo', 'info@lamejor.com', '+54 16618746546', 1);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;



-- Dumping structure for table datawarehouse.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `interest` tinyint(4) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_contacts_cities` (`city_id`),
  KEY `FK_contacts_accounts` (`account_id`),
  CONSTRAINT `FK_contacts_accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_contacts_cities` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table datawarehouse.contacts: ~2 rows (approximately)
DELETE FROM `contacts`;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` (`id`, `name`, `lastname`, `position`, `email`, `address`, `interest`, `city_id`, `account_id`) VALUES
	(4, 'Johnny', 'Tolengo', 'Empleado', 'asd@gregg.com', '', 25, 7, 8),
	(11, 'Prueba', 'Test', 'CEO', 'asda', '', 0, 2, 11);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Dumping structure for table datawarehouse.contact_channels
CREATE TABLE IF NOT EXISTS `contact_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `type` enum('Phone','WhatsApp','Email','Facebook','Twitter','Instagram') NOT NULL,
  `handle` varchar(50) DEFAULT '',
  `preference` enum('No preference','Favourite','Do not disturb') NOT NULL DEFAULT 'No preference',
  PRIMARY KEY (`id`),
  KEY `FK__contacts` (`contact_id`),
  CONSTRAINT `FK__contacts` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- Dumping data for table datawarehouse.contact_channels: ~4 rows (approximately)
DELETE FROM `contact_channels`;
/*!40000 ALTER TABLE `contact_channels` DISABLE KEYS */;
INSERT INTO `contact_channels` (`id`, `contact_id`, `type`, `handle`, `preference`) VALUES
	(21, 4, 'WhatsApp', '+5461687443', 'Favourite'),
	(22, 4, 'Email', 'info@info.com', 'Favourite'),
	(23, 4, 'Facebook', 'sdasda', 'Do not disturb'),
	(24, 4, 'Phone', 'asdd', 'Favourite');
/*!40000 ALTER TABLE `contact_channels` ENABLE KEYS */;



-- Dumping structure for table datawarehouse.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `profile` enum('admin','basic') NOT NULL DEFAULT 'basic',
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table datawarehouse.users: ~2 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `profile`, `password`) VALUES
	(1, 'admin', 'admin', 'admin@dw.com', 'admin', 'admin'),
	(2, 'guest', 'User', 'guest@email.com', 'basic', 'guesty');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
