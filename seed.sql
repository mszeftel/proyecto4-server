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

-- Dumping data for table datawarehouse.accounts: ~1 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
REPLACE INTO `accounts` (`id`, `name`, `address`, `email`, `phone`, `city_id`) VALUES
	(8, 'La montevideana', 'Artigas', 'info@mont.uy', '231312', 7),
	(11, 'La mejor', 'Centro del mundo', 'info@lamejor.com', '+54 16618746546', 1);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping data for table datawarehouse.cities: ~6 rows (approximately)
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
REPLACE INTO `cities` (`id`, `name`, `country_id`) VALUES
	(1, 'Buenos Aires', 1),
	(2, 'Tijuana', 2),
	(6, 'Córdoba', 1),
	(7, 'Montevideo', 4),
	(8, 'Canelones', 4),
	(9, 'Boston', 7);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;

-- Dumping data for table datawarehouse.contacts: ~3 rows (approximately)
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
REPLACE INTO `contacts` (`id`, `name`, `lastname`, `position`, `email`, `address`, `interest`, `city_id`, `account_id`) VALUES
	(4, 'Johnny', 'Tolengo', 'Empleado', 'asd@gregg.com', '', 25, 7, 8),
	(11, 'Prueba', 'Test', 'CEO', 'asda', 'undefined', 0, NULL, 11);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Dumping data for table datawarehouse.contact_channels: ~4 rows (approximately)
/*!40000 ALTER TABLE `contact_channels` DISABLE KEYS */;
REPLACE INTO `contact_channels` (`id`, `contact_id`, `type`, `handle`, `preference`) VALUES
	(21, 4, 'WhatsApp', '+5461687443', 'Favourite'),
	(22, 4, 'Email', 'info@info.com', 'Favourite'),
	(23, 4, 'Facebook', 'sdasda', 'Do not disturb'),
	(24, 4, 'Phone', 'asdd', 'Favourite');
/*!40000 ALTER TABLE `contact_channels` ENABLE KEYS */;

-- Dumping data for table datawarehouse.countries: ~6 rows (approximately)
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
REPLACE INTO `countries` (`id`, `name`, `region_id`) VALUES
	(1, 'Argentina', 1),
	(2, 'Mexico', 2),
	(4, 'Uruguay', 1),
	(7, 'Estados Unidos', 2),
	(8, 'Chile', 1);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;

-- Dumping data for table datawarehouse.regions: ~3 rows (approximately)
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
REPLACE INTO `regions` (`id`, `name`) VALUES
	(1, 'Sudamérica '),
	(2, 'Norteamérica'),
	(4, 'Centroamérica ');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;

-- Dumping data for table datawarehouse.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
