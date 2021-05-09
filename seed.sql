USE `datawarehouse`;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`id`, `name`) VALUES
(1, 'Sudamérica '),
(2, 'Norteamérica'),
(4, 'Centroamérica ');

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`, `region_id`) VALUES
(1, 'Argentina', 1),
(2, 'Mexico', 2),
(4, 'Uruguay', 1),
(7, 'Estados Unidos', 2),
(8, 'Chile', 1),
(10, 'Panamá', 4);


--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name`, `country_id`) VALUES
(1, 'Buenos Aires', 1),
(2, 'Tijuana', 2),
(6, 'Córdoba', 1),
(7, 'Montevideo', 4),
(8, 'Canelones', 4),
(9, 'Boston', 7),
(11, 'Santiago de Chile', 8),
(12, 'Panamá', 10);

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `address`, `email`, `phone`, `city_id`) VALUES
(8, 'La montevideana', 'Artigas', 'info@mont.uy', '231312', 7),
(11, 'La mejor', 'Centro del mundo', 'info@lamejor.com', '+54 16618746546', 1),
(12, 'Miau Mouse', 'Montevideo 260', 'consultas@maiumouse', '54114041265', 1),
(13, 'Lactea', '', 'consultas@lectea.com', '56223456932', 11);


--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `lastname`, `position`, `email`, `address`, `interest`, `city_id`, `account_id`) VALUES
(4, 'Johnny', 'Tolengo', 'Empleado', 'asd@gregg.com', '', 25, 7, 8),
(11, 'Mario', 'Castillo', 'CEO', 'asda', '', 0, 2, 11),
(12, 'Niza', 'Siam', 'Jefe de sección ', 'nizasiam@maiumouse.com', '', 100, 1, 12),
(13, 'Morgana', 'Negris', 'Supervisora', 'morgananegris@miaumouse.com', 'Montevideo 260', 50, 1, 12),
(14, 'Saga', 'Tabby', 'Empleada', 'sagatabby@miaumouse.com', 'Montevideo 260', 25, 1, 12),
(15, 'Misha', 'Bovinus', 'Distribuidora', 'mishabovinus@lactea.com', '', 0, 11, 13);



--
-- Volcado de datos para la tabla `contact_channels`
--

INSERT INTO `contact_channels` (`id`, `contact_id`, `type`, `handle`, `preference`) VALUES
(21, 4, 'WhatsApp', '+5461687443', 'Favourite'),
(22, 4, 'Email', 'info@info.com', 'Favourite'),
(23, 4, 'Facebook', 'sdasda', 'Do not disturb'),
(24, 4, 'Phone', 'asdd', 'Favourite'),
(25, 11, 'Twitter', '@marito_castle', 'Favourite');





