-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-01-2026 a las 15:51:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce_spa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `address_users`
--

CREATE TABLE `address_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(250) NOT NULL,
  `full_surname` varchar(250) DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `county_region` varchar(50) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `address_users`
--

INSERT INTO `address_users` (`id`, `user_id`, `full_name`, `full_surname`, `company_name`, `county_region`, `direccion`, `city`, `zip_code`, `phone`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'JOSEssss', 'CODE', NULL, 'PERU', 'LIMA, SAN BORJA', 'LIMA', '04560', '999999999', 'josecode@gmail.com', '2023-01-26 07:11:44', '2023-01-26 07:32:16', NULL),
(2, 2, 'RAULssssrrrrr', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-26 07:33:04', '2023-01-30 06:58:22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_shops`
--

CREATE TABLE `cart_shops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `type_discount` tinyint(1) UNSIGNED DEFAULT NULL COMMENT '1 es porcentaje y 2 es moneda',
  `discount` double DEFAULT NULL,
  `cantidad` double NOT NULL,
  `product_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_color_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `code_cupon` varchar(50) DEFAULT NULL,
  `code_discount` varchar(50) DEFAULT NULL,
  `precio_unitario` double NOT NULL,
  `subtotal` double NOT NULL,
  `total` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart_shops`
--

INSERT INTO `cart_shops` (`id`, `user_id`, `product_id`, `type_discount`, `discount`, `cantidad`, `product_size_id`, `product_color_size_id`, `code_cupon`, `code_discount`, `precio_unitario`, `subtotal`, `total`, `created_at`, `updated_at`) VALUES
(22, 2, 14, NULL, NULL, 1, NULL, NULL, NULL, NULL, 767, 767, 767, '2023-02-03 05:05:11', '2023-02-03 05:05:11'),
(23, 2, 6, NULL, NULL, 1, 1, 1, NULL, NULL, 120, 120, 120, '2023-02-03 05:05:22', '2023-02-03 05:05:22'),
(24, 2, 3, NULL, NULL, 1, NULL, NULL, NULL, NULL, 5350, 5350, 5350, '2023-02-04 05:56:17', '2023-02-04 05:56:17'),
(26, 2, 9, NULL, NULL, 1, NULL, NULL, NULL, NULL, 95, 95, 95, '2023-02-04 07:25:24', '2023-02-04 07:25:24'),
(27, 2, 4, NULL, NULL, 1, NULL, NULL, NULL, NULL, 6500, 6500, 6500, '2023-02-04 07:28:43', '2023-02-04 07:28:43'),
(28, 13, 12, NULL, NULL, 1, NULL, NULL, NULL, NULL, 3450, 3450, 3450, '2025-11-28 01:13:04', '2025-11-28 01:13:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `icono` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `imagen`, `icono`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ZAPATOS', 'categorias/gAg26l3s5GiLJTqx3C68Em2aNCSTtTMz4kjPoiIM.jpg', 'las la-shoe-prints', '2023-01-08 07:04:16', '2023-01-19 12:57:57', '2023-01-19 12:57:57'),
(2, 'CELULARES', 'categorias/m6UxosbN5bBg877NLsuxacBxLs0kN3cLFfrixaOl.jpg', 'las la-plug', '2023-01-08 07:06:14', '2023-01-11 05:59:21', NULL),
(3, 'TELEFONO', 'categorias/gL3h5LED1HY8jR4rBDBdFj5mQemdhjp5nLcePJZe.jpg', '43DASDAS', '2023-01-09 05:54:37', '2023-01-09 10:55:24', '2023-01-09 05:56:07'),
(4, 'TELEFONO', 'categorias/Pmp8mKEQ3XnuslTZVxxv3fBhlbhzdet9B7gtW9RI.jpg', 'las la-mobile', '2023-01-09 06:03:10', '2023-01-09 11:09:16', '2023-01-09 11:09:16'),
(5, 'TV', 'categorias/ktq6wM9f4x9vlozYHOZKHpsNNGrE7KLvKAYapf8Y.jpg', 'las la-desktop', '2023-01-11 05:59:04', '2023-01-11 05:59:04', NULL),
(6, 'LAPTOP', 'categorias/B9LK9wc8UkWAszvqLFp9IClzkcznenc2EkxwEx4c.jpg', 'las la-desktop', '2023-01-11 06:00:06', '2023-01-11 06:00:06', NULL),
(7, 'POLOS', 'categorias/DFte3sxtvxCmxQSgvwTrFVXSv3lQ204OT3HVCOq6.webp', 'las la-female', '2023-01-14 08:26:20', '2023-02-04 06:36:18', NULL),
(8, 'ELECTRONICOS', NULL, 'las la-plug', '2023-02-04 06:37:54', '2023-02-04 07:41:30', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

CREATE TABLE `cupones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(250) NOT NULL,
  `type_discount` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 por porcentaje y 2 por moneda',
  `discount` double NOT NULL,
  `type_count` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 es ilimitado y 2 es limitado',
  `num_use` double NOT NULL DEFAULT 0,
  `products` varchar(250) DEFAULT NULL,
  `categories` varchar(250) DEFAULT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es activo y 2 des',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cupones`
--

INSERT INTO `cupones` (`id`, `code`, `type_discount`, `discount`, `type_count`, `num_use`, `products`, `categories`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'DESCUENTO2023', 1, 30, 1, 0, '5,4', NULL, 1, '2023-01-16 07:27:29', '2023-01-16 07:27:29', NULL),
(2, 'DESCUENTOVERANO2023', 2, 45, 2, 50, NULL, '7,6,5', 2, '2023-01-16 07:29:12', '2023-01-16 08:54:58', NULL),
(3, 'VERANO2023', 1, 45, 1, 0, NULL, '6', 1, '2023-01-16 07:33:27', '2023-01-16 08:54:51', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(250) NOT NULL,
  `type_discount` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 por porcentaje y 2 por moneda',
  `discount` double NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es activo y 2 des',
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `type` tinyint(1) UNSIGNED NOT NULL COMMENT '1 es producto y 2 es categoria',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `discounts`
--

INSERT INTO `discounts` (`id`, `code`, `type_discount`, `discount`, `state`, `start_date`, `end_date`, `type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, '63c8d39ebd232', 1, 40, 1, '2023-01-18 05:00:00', '2023-01-20 05:00:00', 1, '2023-01-19 05:22:38', '2023-01-19 06:15:11', NULL),
(5, '63c8d41b8b55d', 1, 50, 1, '2023-02-01 05:00:00', '2023-02-04 05:00:00', 1, '2023-01-19 05:24:43', '2023-02-02 06:01:03', NULL),
(6, '63db51e5563d7', 1, 20, 1, '2023-02-01 05:00:00', '2023-02-04 05:00:00', 2, '2023-02-02 06:02:13', '2023-02-02 06:26:13', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discount_categories`
--

CREATE TABLE `discount_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `discount_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `discount_categories`
--

INSERT INTO `discount_categories` (`id`, `discount_id`, `categorie_id`, `created_at`, `updated_at`) VALUES
(3, 6, 6, '2023-02-02 06:26:13', '2023-02-02 06:26:13'),
(4, 6, 5, '2023-02-02 06:26:13', '2023-02-02 06:26:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discount_products`
--

CREATE TABLE `discount_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `discount_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `discount_products`
--

INSERT INTO `discount_products` (`id`, `discount_id`, `product_id`, `created_at`, `updated_at`) VALUES
(5, 4, 5, '2023-01-19 06:15:11', '2023-01-19 06:15:11'),
(6, 4, 4, '2023-01-19 06:15:11', '2023-01-19 06:15:11'),
(9, 5, 3, '2023-02-02 06:01:03', '2023-02-02 06:01:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `price_soles` double NOT NULL,
  `price_usd` double NOT NULL,
  `tags` text DEFAULT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `resumen` text NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 en demo , 2 publico , 3 bloqueado',
  `imagen` varchar(250) NOT NULL,
  `stock` double DEFAULT NULL,
  `type_inventario` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `categorie_id`, `title`, `slug`, `sku`, `price_soles`, `price_usd`, `tags`, `description`, `resumen`, `state`, `imagen`, `stock`, `type_inventario`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 6, 'Laptop Acer Aspire 3 CI5 1235U 8GB 256GB SSD 15.6', 'laptop-acer-aspire-3-ci5-1235u-8gb-256gb-ssd-156', 'A315-59G-514E', 5350, 1550, NULL, '<ul>\r\n<li><span id=\"descAttributeName_1_10_-2018_3074457345618335230\">Modelo:</span><span id=\"descAttributeValue_1_10_-2018_3074457345618335230\">A315-59G-514E</span></li>\r\n<li><span id=\"descAttributeName_2_10_-2018_3074457345618335230\">Tipo:</span><span id=\"descAttributeValue_2_10_-2018_3074457345618335230\">Aspire 3</span></li>\r\n<li><span id=\"descAttributeName_3_10_-2018_3074457345618335230\">Color:</span><span id=\"descAttributeValue_3_10_-2018_3074457345618335230\">Pure Silver</span></li>\r\n<li><span id=\"descAttributeName_4_10_-2018_3074457345618335230\">Marca de procesador:</span><span id=\"descAttributeValue_4_10_-2018_3074457345618335230\">INTEL</span></li>\r\n<li><span id=\"descAttributeName_5_10_-2018_3074457345618335230\">Procesador:</span><span id=\"descAttributeValue_5_10_-2018_3074457345618335230\">CI5-1235U</span></li>\r\n<li><span id=\"descAttributeName_6_10_-2018_3074457345618335230\">Generaci&oacute;n:</span><span id=\"descAttributeValue_6_10_-2018_3074457345618335230\">12va generaci&oacute;n</span></li>\r\n<li><span id=\"descAttributeName_7_10_-2018_3074457345618335230\">Velocidad de procesador:</span><span id=\"descAttributeValue_7_10_-2018_3074457345618335230\">3,3Ghz</span></li>\r\n<li><span id=\"descAttributeName_8_10_-2018_3074457345618335230\">Velocidad m&aacute;xima (km/h):</span><span id=\"descAttributeValue_8_10_-2018_3074457345618335230\">4,4Ghz</span></li>\r\n<li><span id=\"descAttributeName_9_10_-2018_3074457345618335230\">N&uacute;cleos de procesador:</span><span id=\"descAttributeValue_9_10_-2018_3074457345618335230\">10 n&uacute;cleos</span></li>\r\n<li><span id=\"descAttributeName_10_10_-2018_3074457345618335230\">Memoria RAM:</span><span id=\"descAttributeValue_10_10_-2018_3074457345618335230\">8GB</span></li>\r\n<li><span id=\"descAttributeName_11_10_-2018_3074457345618335230\">Capacidad:</span><span id=\"descAttributeValue_11_10_-2018_3074457345618335230\">256GB SSD</span></li>\r\n<li><span id=\"descAttributeName_12_10_-2018_3074457345618335230\">Permite segunda unidad:</span><span id=\"descAttributeValue_12_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_13_10_-2018_3074457345618335230\">Permite reemplazo:</span><span id=\"descAttributeValue_13_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_14_10_-2018_3074457345618335230\">Tipo de gr&aacute;ficos:</span><span id=\"descAttributeValue_14_10_-2018_3074457345618335230\">DEDICADO</span></li>\r\n<li><span id=\"descAttributeName_15_10_-2018_3074457345618335230\">Tarjeta Gr&aacute;fica Integrada:</span><span id=\"descAttributeValue_15_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_16_10_-2018_3074457345618335230\">Tarjeta Gr&aacute;fica Dedicada:</span><span id=\"descAttributeValue_16_10_-2018_3074457345618335230\">NVIDIA GFORCE MX550 2GB</span></li>\r\n<li><span id=\"descAttributeName_17_10_-2018_3074457345618335230\">Memoria Gr&aacute;fica:</span><span id=\"descAttributeValue_17_10_-2018_3074457345618335230\">2 GB</span></li>\r\n<li><span id=\"descAttributeName_18_10_-2018_3074457345618335230\">Tama&ntilde;o de pantalla:</span><span id=\"descAttributeValue_18_10_-2018_3074457345618335230\">15.6\"</span></li>\r\n</ul>', 'Ahora podrás disfrutar más de tus videojuegos con la Laptop Aspire 3 CI5 1235U un portátil sumamente potente que brinda la velocidad que buscabas. Tiene un excelente desempeño gracias a su procesador Intel.', 2, 'productos/Z1sFh7mamWS00x9a0z753FAKprxHZbeKhkk2luYI.jpg', 10, 1, '2023-01-11 06:11:55', '2023-01-16 09:08:00', NULL),
(4, 6, 'Laptop Acer Swift 3 CI5 1135G7 8GB 512GB SSD 14\"FHD IPS', 'laptop-acer-swift-3-ci5-1135g7-8gb-512gb-ssd-14fhd-ips', 'SF314-511-579K', 6500, 2000, NULL, '<ul>\r\n<li><span id=\"descAttributeName_24_10_-2018_3074457345618335230\">Profundidad:</span><span id=\"descAttributeValue_24_10_-2018_3074457345618335230\">25.0 cm</span></li>\r\n<li><span id=\"descAttributeName_25_10_-2018_3074457345618335230\">Peso (kg):</span><span id=\"descAttributeValue_25_10_-2018_3074457345618335230\">1.9 Kg</span></li>\r\n<li><span id=\"descAttributeName_26_10_-2018_3074457345618335230\">Wi-Fi:</span><span id=\"descAttributeValue_26_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_27_10_-2018_3074457345618335230\">Puertos HDMI:</span><span id=\"descAttributeValue_27_10_-2018_3074457345618335230\">si</span></li>\r\n<li><span id=\"descAttributeName_28_10_-2018_3074457345618335230\">Puertos USB:</span><span id=\"descAttributeValue_28_10_-2018_3074457345618335230\">2</span></li>\r\n<li><span id=\"descAttributeName_29_10_-2018_3074457345618335230\">Entrada micr&oacute;fono:</span><span id=\"descAttributeValue_29_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_30_10_-2018_3074457345618335230\">Puerto de red:</span><span id=\"descAttributeValue_30_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_31_10_-2018_3074457345618335230\">Bluetooth:</span><span id=\"descAttributeValue_31_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_32_10_-2018_3074457345618335230\">Sistema operativo:</span><span id=\"descAttributeValue_32_10_-2018_3074457345618335230\">Windows 11</span></li>\r\n<li><span id=\"descAttributeName_33_10_-2018_3074457345618335230\">Teclado iluminado:</span><span id=\"descAttributeValue_33_10_-2018_3074457345618335230\">No</span></li>\r\n<li><span id=\"descAttributeName_34_10_-2018_3074457345618335230\">Teclado n&uacute;merico:</span><span id=\"descAttributeValue_34_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_35_10_-2018_3074457345618335230\">C&aacute;mara web:</span><span id=\"descAttributeValue_35_10_-2018_3074457345618335230\">Si</span></li>\r\n</ul>', 'Sus 8GB de memoria RAM y su 256GB de capacidad son suficientes para almacenar todo lo que deseas sin volver lenta tu laptop. Tiene una pantalla de 15.6” Full HD que ofrece imágenes nítidas de colores vivos que te harán vivir una experiencia diferente. Además, su sonido envolvente le dará más realismo.', 2, 'productos/sGUBtueWYrEmZFUo0l2mV7QRUTNVr15hpYVXdKKn.jpg', 11, 1, '2023-01-11 06:14:38', '2023-01-16 09:08:14', NULL),
(5, 5, 'TV LG UHD 50\" 4k Smart ThinQ AI 50UQ7500PSF (2022)', 'tv-lg-uhd-50-4k-smart-thinq-ai-50uq7500psf-2022', '50UQ7500PSF', 5340, 2450, 'TV,SMART,50 PULGADAS,50UQ7500PSF', '<ul>\r\n<li><span id=\"descAttributeName_1_10_-2018_3074457345618335230\">Modelo:</span><span id=\"descAttributeValue_1_10_-2018_3074457345618335230\">HYLED5520A4KM</span></li>\r\n<li><span id=\"descAttributeName_2_10_-2018_3074457345618335230\">Alto:</span><span id=\"descAttributeValue_2_10_-2018_3074457345618335230\">78.5</span></li>\r\n<li><span id=\"descAttributeName_3_10_-2018_3074457345618335230\">Ancho:</span><span id=\"descAttributeValue_3_10_-2018_3074457345618335230\">132</span></li>\r\n<li><span id=\"descAttributeName_4_10_-2018_3074457345618335230\">Profundidad:</span><span id=\"descAttributeValue_4_10_-2018_3074457345618335230\">12.6</span></li>\r\n<li><span id=\"descAttributeName_5_10_-2018_3074457345618335230\">Garant&iacute;a:</span><span id=\"descAttributeValue_5_10_-2018_3074457345618335230\">12 Meses</span></li>\r\n<li><span id=\"descAttributeName_6_10_-2018_3074457345618335230\">Puertos USB:</span><span id=\"descAttributeValue_6_10_-2018_3074457345618335230\">2</span></li>\r\n<li><span id=\"descAttributeName_7_10_-2018_3074457345618335230\">Wi-Fi:</span><span id=\"descAttributeValue_7_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_8_10_-2018_3074457345618335230\">Puerto Ethernet:</span><span id=\"descAttributeValue_8_10_-2018_3074457345618335230\">Si</span></li>\r\n<li><span id=\"descAttributeName_9_10_-2018_3074457345618335230\">Puertos HDMI:</span><span id=\"descAttributeValue_9_10_-2018_3074457345618335230\">5</span></li>\r\n</ul>', 'Te presentamos el nuevo televisor Hyundai con asistente de voz Google Assistant y sistema operativo o?cial Android TV desarrollado por Google.', 2, 'productos/YPrzJrmgbbgiiqIkVFusYILA9z7kfLVLKUa7IeX9.jpg', 25, 1, '2023-01-12 06:52:38', '2023-01-16 09:08:30', NULL),
(6, 7, 'Polo shirt  Cheetah Crew : S M', 'polo-shirt-cheetah-crew-s-m', '3D4SW', 120, 60, 'POLOS,AZUL,PILLING', '<p><br />Nuestro Polo combina un estilo casual y cl&aacute;sico a la vez.&nbsp;<br />Esta prenda te har&aacute; permanecer c&oacute;modo y sin perder la elegancia desde la&nbsp;<br />oficina hasta la cena.</p>', 'Nuestro Polo combina un estilo casual y clásico a la vez. \r\nEsta prenda te hará permanecer cómodo y sin perder la elegancia desde la \r\noficina hasta la cena.', 2, 'productos/0cprHXPzEOvppKVtjE8WrOLpS3p2Wjdl13FDo0HN.webp', NULL, 2, '2023-01-14 08:27:46', '2023-01-19 08:49:34', NULL),
(7, 7, 'Polera Mujer All Star Full Zipper : M', 'polera-mujer-all-star-full-zipper-m', 'CNVHO21WFZ3', 300, 140, 'Star ,Full Zipper ,Polera', '<div class=\"titulo\">Detalles:</div>\r\n<ul>\r\n<li>Capucha con cord&oacute;n para un ajuste c&oacute;modo</li>\r\n<li>Pu&ntilde;os y dobladillo acanalados para adaptar el ajuste</li>\r\n<li>Dos bolsillos delanteros</li>\r\n<li>Cremallera de longitud completa</li>\r\n<li>280g. 80% algod&oacute;n, 20% polyester</li>\r\n</ul>', 'Sudadera con diseños únicos y auténticos que agregan un toque de actitud, esta prenda básica está confeccionada a base de algodón suave con cuello redondo y puños acanalados en un estilo clásico de manga larga', 2, 'productos/bqivYdnh5sd7AN3fT9jEAAUbK8r9h29KjNFc5uRe.jpg', 13, 1, '2023-01-19 07:57:47', '2023-01-19 07:57:47', NULL),
(8, 7, 'Polera Hombre Star Chevron Cheetah Crew : S', 'polera-hombre-star-chevron-cheetah-crew-s', 'CNVHO21MCREW3', 95, 35, 'Cheetah ,Star ,Crew', '<div class=\"titulo\">Detalles:</div>\n<ul>\n<li>Pu&ntilde;os y dobladillo inferior el&aacute;sticos</li>\n<li>Logo de la marca Converse</li>\n<li>80% algod&oacute;n, 20% polyester</li>\n</ul>', 'Sudadera con diseños únicos y auténticos que agregan un toque de actitud, esta prenda básica está confeccionada a base de algodón suave con cuello redondo y puños acanalados en un estilo clásico de manga larga.', 2, 'productos/cZxpGW75HiRr3BaL95aTVrBYgzYj8jlcq37Aqoh5.jpg', 11, 1, '2023-01-19 08:01:06', '2023-01-19 08:01:06', NULL),
(9, 7, 'Polerón Hombre Letter New : M', 'poleron-hombre-letter-new-m', 'LS220050N', 95, 55, 'Letter ,Hombre', '<div class=\"titulo\">Detalles:</div>\n<ul>\n<li>Colecci&oacute;n: Ropa Lifestyle</li>\n<li>Composici&oacute;n: 60% Algod&oacute;n 40% Poli&eacute;ster</li>\n<li>Tipo de Producto: Polera con capucha</li>\n<li>FIT: Regular</li>\n<li>Marca: Fila</li>\n<li>Modelo: Hombre</li>\n</ul>', 'Muestra tu estilo con Fila, este modelo está confeccionado en una polera afelpada, tejido cómodo y con un buen tacto en la piel. La capucha también sirve como protección adicional contra el frío. Perfecta para cualquier ocasión.', 2, 'productos/hyodnyHS5xBS8pVJQK3c8o9vlnKCUN0nvXlqzHIN.webp', 16, 1, '2023-01-19 08:02:15', '2023-01-19 08:02:15', NULL),
(10, 5, 'TV LG UHD 65\" 4k Smart ThinQ AI 65UP7760PSB', 'tv-lg-uhd-65-4k-smart-thinq-ai-65up7760psb', '65UP7760PSB', 2350, 150, 'UN50AU7090GXPE ,peliculas ,series', '<p><strong>Caracter&iacute;sticas:</strong></p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>Modelo: UN50AU7090GXPE.</li>\r\n<li>Pantalla ULTRA HD de 50\".</li>\r\n<li>Sistema Operativo Tizen.</li>\r\n<li>Procesador: Crystal Processor 4K.</li>\r\n<li>Dimensiones: Alto 72.3cm - Ancho 111.2cm - Largo 25.1cm</li>\r\n</ul>', '¡Disfruta de tus programas, peliculas y series favoritas! Déjate atrapar por la excelente calidad de imágenes y nitidez del nuevo Smart Tv UN50AU7090GXPE de Samsung.', 2, 'productos/0few79Jy7nTEoWBa4OgzRoUFT9NLqbAPJj2uBieU.jpg', 12, 1, '2023-01-19 08:04:21', '2023-01-19 08:04:21', NULL),
(11, 5, 'TV LG UHD 55\" 4K SMART THINQ AI 75UP7760PSB (2022)', 'tv-lg-uhd-55-4k-smart-thinq-ai-75up7760psb-2022', '75UP7760PSB', 2560, 450, 'THINQ,75UP7760PSB ,UHD', '<p><strong>Caracter&iacute;sticas:</strong></p>\n<ul>\n<li>Modelo: UN50AU7090GXPE.</li>\n<li>Pantalla ULTRA HD de 50\".</li>\n<li>Sistema Operativo Tizen.</li>\n<li>Procesador: Crystal Processor 4K.</li>\n<li>Dimensiones: Alto 72.3cm - Ancho 111.2cm - Largo 25.1cm</li>\n</ul>', '¡Disfruta de tus programas, peliculas y series favoritas! Déjate atrapar por la excelente calidad de imágenes y nitidez del nuevo Smart Tv UN50AU7090GXPE de Samsung.', 2, 'productos/anUq9k49B3JZujIQDeerdXrt68Z7ofRKO48J3Uyq.jpg', 14, 1, '2023-01-19 08:06:27', '2023-01-19 08:06:27', NULL),
(12, 6, 'HP Laptop 15-dy5010la. 15.6\". Windows 11 Home. Intel Core™ i7. 12GB RAM. 512GB SSD. HD. Natural silver', 'hp-laptop-15-dy5010la-156-windows-11-home-intel-core-i7-12gb-ram-512gb-ssd-hd-natural-silver', '15-DY5010LA', 3450, 1560, 'Windows 11 ,Laptop 15,HP', '<p>Procesador: AMD Athlon&trade; Gold 3150U / 2.40 GHz hasta 3.30 GHz, cach&eacute; 4M<br />Memoria ram: 12GB DDR4<br />Almacenamiento: 1TB HDD + SSD 512GB M.2<br />Pantalla: 15,6\" HD (1366x768) TN 220nits antirreflejo<br />Video: Gr&aacute;ficos AMD Radeon integrados / 2GB de video dedicado AMD Radeon<br />WiFi 802.11ac, Bluetooth&reg; 5.0<br />C&aacute;mara: C&aacute;mara 720p</p>', 'Laptop Nueva Lenovo V15- 15.6\'\' AMD Athlon 2.40 Ghz. 12GB RAM DDR4 HDD 1TB + SSD 512 M.2 Año 2022', 2, 'productos/0gL1Hz9ZFDL14x7Nsjm1n8LCflwwbhEUMTjPaopd.jpg', 16, 1, '2023-01-19 08:08:25', '2023-01-19 08:08:25', NULL),
(13, 2, 'Nokia G10 64GB Blue Granite White', 'nokia-g10-64gb-blue-granite-white', 'NOKIA G10', 750, 175, 'redmi,9a,led', '<p>El celular Xiaomi Redmi Note 11S posee un elegante y moderno dise&ntilde;o, suave al tacto posterior gracias a su cobertura de policarbonato y su peso de apenas 179g. Asimismo, posee un hermoso acabado con brillos met&aacute;licos en tres colores distintivos, los cuales aportan elegancia y frescura al dise&ntilde;o.&nbsp;</p>', 'El nuevo Xiaomi Redmi Note 11S es un equipo de gama media que ahora está disponible en Tienda Claro Online.', 2, 'productos/2Ng7Ta42ZUq8IWSCnJxKxNBDI2nhh9mUQBkq1tV8.jpg', 2, 1, '2023-01-19 08:12:40', '2023-01-19 08:49:58', NULL),
(14, 2, 'Xiaomi Redmi 9A 2GB 32GB Granite Gray', 'xiaomi-redmi-9a-2gb-32gb-granite-gray', '37566XM', 767, 354, 'RAM de 6GB,90Hz ,Helio G96', '<h3><strong>Dise&ntilde;o del Xiaomi Redmi Note 11S</strong></h3>\r\n<p>El celular Xiaomi Redmi Note 11S posee un elegante y moderno dise&ntilde;o, suave al tacto posterior gracias a su cobertura de policarbonato y su peso de apenas 179g. Asimismo, posee un hermoso acabado con brillos met&aacute;licos en tres colores distintivos, los cuales aportan elegancia y frescura al dise&ntilde;o.&nbsp;</p>\r\n<p>En cuanto a la distribuci&oacute;n de los botones, el Redmi Note 11S posee estos en el costado derecho, lo cual hace f&aacute;cil su agarre y uso. Del mismo modo, incorpora tecnolog&iacute;as como la IP53 para protecci&oacute;n contra salpicaduras de agua y polvo tanto para la pantalla como para los altavoces y puertos de carga.</p>\r\n<h3><strong>Software &amp; Hardware del Xiaomi Redmi Note 11S</strong></h3>\r\n<p>Sobre su pantalla, el Redmi Note 11S trabaja con una pantalla de&nbsp;<strong>6.43 pulgadas FHD+ Dot Display</strong>, una tasa de refresco de 90Hz, una tasa de muestro t&aacute;ctil de 180Hz, una resoluci&oacute;n de 2400x1080px y brillo de hasta 1000 nits, lo cual nos deja ver claramente que la resoluci&oacute;n gr&aacute;fica de este smartphone es &oacute;ptima si hablamos de reproducci&oacute;n de contenido audiovisual y determinados juegos que no requieran una excesiva carga de recursos.</p>\r\n<p>Esto se ve complementado con su procesador&nbsp;<strong>MediaTek Helio G96 de ocho n&uacute;cleos de 2.05GHz,&nbsp;</strong>GPU ARM Mali-G57 MC2, tecnolog&iacute;a LiquidCool,&nbsp;<strong>memoria RAM de 6GB y memoria de almacenamiento interno de 128GB.</strong>&nbsp;Gracias a esto, el Redmi Note 11S mantiene una gran experiencia para animaciones m&aacute;s suaves, desplazamiento entre aplicativos sin retardo y una capacidad para registrar toques en la pantalla t&aacute;ctil de forma m&aacute;s precisa.</p>', 'Así también, destaca en este celular el uso del procesador MediaTek Helio G96 y su aprovechamiento con una tasa de refresco de 90Hz y memoria RAM de 6GB .', 2, 'productos/bd2LDpum5TGQQHFpk0eEXyxf1SSqgYpiGVxeQPZP.jpg', 17, 1, '2023-01-19 08:14:07', '2023-01-19 08:14:07', NULL),
(15, 2, 'Motorola E22i 2GB 64GB - Drack Grove Single', 'motorola-e22i-2gb-64gb-drack-grove-single', 'Motorola E22i 2GB 64GB - Drack Grove Single', 780, 345, 'Xiaomi , Redmi , Note', '<h3><strong>C&aacute;mara del Xiaomi Redmi Note 11S</strong></h3>\r\n<p>El Xiaomi Redmi Note 11S posee una cu&aacute;druple c&aacute;mara posterior que es una de las m&aacute;s elogiadas del 2022 en gama media. Para comenzar, posee un sensor retroalimentado con inteligencia artificial, el cual emplea a la perfecci&oacute;n su c<strong>&aacute;mara trasera principal de 108 mpx con sensor de lente f/1.52</strong>, un ultra gran angular de 8mpx de sensor f/2.2, una c&aacute;mara macro de 2mpx de sensor f/2.4 y una c&aacute;mara de profundidad de 2 mpx con sensor de f/2.4. Esto provoca una gran calidad en tomas fotogr&aacute;ficas con gran atenci&oacute;n al detalle, alta resoluci&oacute;n, colores vivos y un notorio balance de blancos que permite realizar tomas en espacios de poca iluminaci&oacute;n.</p>\r\n<p>Asimismo, tiene una c&aacute;mara frontal de 16 mpx, la cual aprovecha al m&aacute;ximo el modo retrato para enfoque y difuminado, brindando este efecto de c&aacute;mara profesional.</p>\r\n<h3><strong>Bater&iacute;a del Xiaomi Redmi Note 11S</strong></h3>\r\n<p>En cuanto a su bater&iacute;a, el smartphone&nbsp;<strong>Xiaomi Redmi Note 11S</strong>&nbsp;trabaja con una bater&iacute;a de 5000mAh, lo cual garantiza su alto rendimiento para todo tipo de tareas. Del mismo modo, cuenta con una opci&oacute;n de carga r&aacute;pida Pro de 33W, lo cual permite que en un tiempo exacto de 58 minutos este dispositivo pueda pasar de 0 a 100%.&nbsp;</p>', 'El nuevo Xiaomi Redmi Note 11S es un equipo de gama media que ahora está disponible en Tienda Claro Online. Destacado por su cámara trasera de 108mpx', 2, 'productos/HxnNNfankRrrJBxF6zF0rY1S1nPeoHVqCg7qOmHj.jpg', 18, 1, '2023-01-19 08:15:18', '2023-01-19 08:15:18', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_colors`
--

CREATE TABLE `product_colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `code` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_colors`
--

INSERT INTO `product_colors` (`id`, `name`, `code`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'NEGRO', '#000', NULL, NULL, NULL),
(2, 'BLANCO', '#fff', NULL, NULL, NULL),
(3, 'ROJO', '#FD3D57', NULL, NULL, NULL),
(4, 'MORADO', '#ere44', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_color_sizes`
--

CREATE TABLE `product_color_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_color_id` bigint(20) UNSIGNED NOT NULL,
  `product_size_id` bigint(20) UNSIGNED NOT NULL,
  `stock` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_color_sizes`
--

INSERT INTO `product_color_sizes` (`id`, `product_color_id`, `product_size_id`, `stock`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 1, 26, '2023-01-14 05:12:56', '2023-01-14 12:37:19', NULL),
(2, 2, 1, 25, '2023-01-14 05:16:05', '2023-01-14 05:16:05', NULL),
(3, 2, 2, 3, '2023-01-14 05:22:33', '2023-01-14 05:22:33', NULL),
(4, 3, 2, 5, '2023-01-14 06:07:01', '2023-01-14 06:07:01', NULL),
(5, 3, 3, 12, '2023-01-14 07:51:15', '2023-01-14 07:51:15', NULL),
(6, 1, 2, 6, '2023-01-14 08:09:36', '2023-01-14 08:09:36', NULL),
(7, 3, 4, 20, '2023-01-14 08:11:00', '2023-01-14 08:11:00', NULL),
(8, 1, 4, 6, '2023-01-14 08:11:33', '2023-01-14 08:11:33', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `type` varchar(35) NOT NULL,
  `size` varchar(50) NOT NULL,
  `file_name` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `imagen`, `type`, `size`, `file_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'productos/moxNWHm8ZbNlWExrs0mpBEx8VPjQ7LZQe3OmemYg.jpg', 'jpg', '218306', 'A315-59G-514E_1.jpg', '2023-01-11 06:11:55', '2023-01-11 06:11:55', NULL),
(2, 3, 'productos/XoZulVcQsy2kZ091JAI86mPffQPtpmgX95G8veh4.jpg', 'jpg', '152439', 'A315-59G-514E_2.jpg', '2023-01-11 06:11:55', '2023-01-11 06:11:55', NULL),
(3, 3, 'productos/zxa5akv3qyWuDtQg8wJPf1LF28y0JBqI0XoWA9Qj.jpg', 'jpg', '148288', '15-DY5010LA_1ABC.jpg', '2023-01-11 06:11:55', '2023-01-11 06:11:55', NULL),
(4, 3, 'productos/HPFJKiyVyWWubXd9keIGGE2u6wyhkSQJIUoPmURU.jpg', 'jpg', '214624', 'SF314-511-579K_2.jpg', '2023-01-11 06:11:55', '2023-01-11 06:11:55', NULL),
(5, 4, 'productos/8oFFguMtrxX9pkmFpegX4rwAtjwaviTY6CRpZXHk.jpg', 'jpg', '127864', 'FX516PC-HN558W_4.jpg', '2023-01-11 06:14:38', '2023-01-11 06:14:38', NULL),
(6, 4, 'productos/lIkYtoOLAVHyatOUwlTuTtukF2FRY6k97NAIH23J.jpg', 'jpg', '172237', 'FX516PC-HN558W_5.jpg', '2023-01-11 06:14:38', '2023-01-11 06:14:38', NULL),
(7, 4, 'productos/9xrpmRtZ937ozzPSAZ5Fi2NrxwV1pihTngQt62Mz.jpg', 'jpg', '152439', 'A315-59G-514E_2.jpg', '2023-01-11 06:14:38', '2023-01-11 06:14:38', NULL),
(8, 4, 'productos/jrq7UkytZJPcTUxhYs7oUaMpiJ3jugbhGNIrNdtR.jpg', 'jpg', '148288', '15-DY5010LA_1ABC.jpg', '2023-01-11 06:14:38', '2023-01-11 06:14:38', NULL),
(9, 5, 'productos/HG5ARZ6gbtUER6r5lUTVVieZKI1LKczoSzizgMjh.jpg', 'jpg', '369314', 'UN55AU7090G_8.jpg', '2023-01-12 06:52:38', '2023-01-12 13:41:54', '2023-01-12 13:41:54'),
(10, 5, 'productos/K7H08x2OScUEK5a8dUXUjo69WE71KysF6bo5kaSu.jpg', 'jpg', '355403', 'UN65AU7090G_10.jpg', '2023-01-12 06:52:38', '2023-01-12 06:52:38', NULL),
(11, 5, 'productos/pgR78FYzcsjy2FbfFvPcqld4z0moZADFLOAEgl2Q.jpg', 'jpg', '338900', '50UQ7500PSF_3.jpg', '2023-01-12 06:52:38', '2023-01-12 06:52:38', NULL),
(12, 5, 'productos/E28oEGvz21smWqsgtHpKebBlc6eFbdWlgp2V3tnF.jpg', 'jpg', '193830', 'UN55AU7090G_3.jpg', '2023-01-12 06:52:38', '2023-01-12 06:52:38', NULL),
(13, 5, 'productos/1IZBwDZaSXDR9aPbYdZ5a7NMoKRdg4OGnJk1gTCT.jpg', 'jpg', '172943', 'UN55AU7090G_1.jpg', '2023-01-12 08:38:47', '2023-01-12 08:38:47', NULL),
(14, 6, 'productos/uQ7qPiEUAQIBRsXsMgEiFNauLBqiHfbQn1qmUYKf.webp', 'webp', '40508', 'Unbranded_0021_PoloShirt_5_2048x.webp', '2023-01-14 08:27:46', '2023-01-14 08:27:46', NULL),
(15, 6, 'productos/QDI4lHGp8KtssPxCBnkiMIqMW2nL7izsZ1oFKmfB.webp', 'webp', '22570', 'Unbranded_0004_PoloShirt_Back_5_600x.webp', '2023-01-14 08:27:46', '2023-01-14 08:27:46', NULL),
(16, 6, 'productos/axmbdrrALxsaJwphsqk8TwEBRA2RloEk6SyAZek3.webp', 'webp', '28454', 'Unbranded__0017_PoloShirt_2_600x.webp', '2023-01-14 08:27:46', '2023-01-14 08:27:46', NULL),
(17, 6, 'productos/SHrH0Xl0DG1yevfCbzXzm4dvCe7YZn8oyBaeIA66.webp', 'webp', '16660', 'TELASPolos-17_c22ba8d1-5983-4d9b-9710-ce17d0f8c7d5_600x.webp', '2023-01-14 08:27:46', '2023-01-14 08:27:46', NULL),
(18, 7, 'productos/dJcrwZCxWIABFI8iYu27wC96Q2jjosIy2jihcHBj.jpg', 'jpg', '32597', 'CNVHO21WFZ3-001_3.jpg', '2023-01-19 07:57:47', '2023-01-19 07:57:47', NULL),
(19, 7, 'productos/XZS4RT5D5d43g8vE72QkfzduMoU743uLnEScZgYK.jpg', 'jpg', '43048', 'CNVHO21WFZ3-001_4.jpg', '2023-01-19 07:57:47', '2023-01-19 07:57:47', NULL),
(20, 7, 'productos/Sz82lvUd8UGnFIQeO3dhNJRRUvUt9BFdj0yyFgsr.jpg', 'jpg', '19428', 'CNVHO21WFZ3-001_1.jpg', '2023-01-19 07:57:47', '2023-01-19 07:57:47', NULL),
(21, 7, 'productos/oS3B6B3yWh9qbMydFsKcDKpWuIGOMcibYBRBVcPl.jpg', 'jpg', '17895', 'CNVHO21WFZ3-001_2.jpg', '2023-01-19 07:57:47', '2023-01-19 07:57:47', NULL),
(22, 8, 'productos/Qp24RQq3ljfwRDgzXNZp6ZK5IAJeMNUFaSQ6iBLW.jpg', 'jpg', '20940', 'CNVHO21MCREW3-001_3.jpg', '2023-01-19 08:01:06', '2023-01-19 08:01:06', NULL),
(23, 8, 'productos/b9Mk7e3G5bHLbTJvItklKoA3syhkqIFdJWbT22ED.jpg', 'jpg', '17611', 'CNVHO21MCREW3-001_2.jpg', '2023-01-19 08:01:06', '2023-01-19 08:01:06', NULL),
(24, 8, 'productos/oTQyxTw4Jj8RCkMWFK08gb4BIjulyL5aJzMwgH3P.jpg', 'jpg', '20010', 'CNVHO21MCREW3-001_1.jpg', '2023-01-19 08:01:06', '2023-01-19 08:01:06', NULL),
(25, 9, 'productos/KTAmuYfyrJoVWsj7VqPvcBC7Iy7n8x5AKeEGwAo9.webp', 'webp', '31384', 'LS220050N-312_1.webp', '2023-01-19 08:02:15', '2023-01-19 08:02:15', NULL),
(26, 9, 'productos/7pBV4pUlUjdDaepUDcnM0Hq8kP4twELlr0d68mkw.webp', 'webp', '29916', 'LS220050N-312_2.webp', '2023-01-19 08:02:15', '2023-01-19 08:02:15', NULL),
(27, 9, 'productos/7U48GbZqxx9EPngCTZVTGLygjjtfwxZgBAS6g0PY.webp', 'webp', '22896', 'LS220050N-312_3.webp', '2023-01-19 08:02:15', '2023-01-19 08:02:15', NULL),
(28, 10, 'productos/DIuJ3F1XuzgAuqGqGdoiVbRs3UIdZtCorDDPY564.jpg', 'jpg', '84213', 'UN50AU7090GXPE_2.jpg', '2023-01-19 08:04:21', '2023-01-19 08:04:21', NULL),
(29, 10, 'productos/uy8sGMR9J5leZagNp7m1ufonQo8re2zG3jBxtUP2.jpg', 'jpg', '369314', 'UN55AU7090G_8.jpg', '2023-01-19 08:04:21', '2023-01-19 08:04:21', NULL),
(30, 10, 'productos/NyeBlHKvz3WoHOX0BJtkbCvR3wpVi91PiPOE6EdB.jpg', 'jpg', '193830', 'UN55AU7090G_3.jpg', '2023-01-19 08:04:21', '2023-01-19 08:04:21', NULL),
(31, 11, 'productos/PeqSWCqQUM0j76Irz4ExBFo9CyxRfmhu6xm7r28J.jpg', 'jpg', '336284', 'UN55AU7090G_10.jpg', '2023-01-19 08:06:27', '2023-01-19 08:06:27', NULL),
(32, 11, 'productos/GVnbsBzL22al2bHSV13xf7BI0FE1fpDFEw3yhFvu.jpg', 'jpg', '403051', 'UN55AU7090G_11.jpg', '2023-01-19 08:06:27', '2023-01-19 08:06:27', NULL),
(33, 11, 'productos/81dm6w4QOqKWwT5XySgdHWNRWXcHHg2DM0zIOS91.jpg', 'jpg', '361240', 'UN65AU7090G_3.jpg', '2023-01-19 08:06:27', '2023-01-19 08:06:27', NULL),
(34, 12, 'productos/ChmZWHSdh50ESsoBMvWPV5UXUA6uvuZNjd5CXPR4.jpg', 'jpg', '167126', 'FX516PC-HN558W_2.jpg', '2023-01-19 08:08:25', '2023-01-19 08:08:25', NULL),
(35, 12, 'productos/mG8QZYaOKTZwiAr2jy7Sgyb3L3R22lYjJKKG2Cod.jpg', 'jpg', '127864', 'FX516PC-HN558W_4.jpg', '2023-01-19 08:08:25', '2023-01-19 08:08:25', NULL),
(36, 12, 'productos/c0u5htf71mVyJTpds1GAn367gWOa8FzxRdcApK0T.jpg', 'jpg', '172237', 'FX516PC-HN558W_5.jpg', '2023-01-19 08:08:25', '2023-01-19 08:08:25', NULL),
(37, 13, 'productos/zO9jOzy2Ci57rEmMxI1O8YtSQNiGo95Gc0LmPXnH.jpg', 'jpg', '41879', '37566XM_2.jpg', '2023-01-19 08:12:40', '2023-01-19 08:12:40', NULL),
(38, 13, 'productos/8XJGz3CYo7W3RIrxN8HWZmOI3azYOHtDjJ6zMbsr.jpg', 'jpg', '43180', '37566XM_3.jpg', '2023-01-19 08:12:40', '2023-01-19 08:12:40', NULL),
(39, 13, 'productos/2QsOt5YEjW8nKfoYtxR01EpukrR9aCHCefeFrf90.jpg', 'jpg', '96759', 'A77AZUL_3.jpg', '2023-01-19 08:12:40', '2023-01-19 08:12:40', NULL),
(40, 14, 'productos/aAZD5goEooDlPaPeDSjyz3gjoKkCXS4Xu23W87CQ.jpg', 'jpg', '134442', 'EDGE30NEONG_1.jpg', '2023-01-19 08:14:07', '2023-01-19 08:14:07', NULL),
(41, 14, 'productos/UTrcPkpJJzLYFaKXqV7zCBgiDlvHCDlXvtB4VZe2.jpg', 'jpg', '140917', 'NOKIAG10SSBLU_2.jpg', '2023-01-19 08:14:07', '2023-01-19 08:14:07', NULL),
(42, 14, 'productos/a2W50XZsiT5rPEastCipCMBWuhR9DbzC8uBCfzHG.jpg', 'jpg', '212041', 'NOKIAG10SSBLU_1.jpg', '2023-01-19 08:14:07', '2023-01-19 08:14:07', NULL),
(43, 15, 'productos/TFhTEf7A7FiChCqEmQ4rXYY4kXTLi11Tbye2Cz2G.jpg', 'jpg', '147297', 'MOTOE22IGRAY_2.jpg', '2023-01-19 08:15:18', '2023-01-19 08:15:18', NULL),
(44, 15, 'productos/npZJuuWdZI24G954GkiY1tUIh8E0isHgbEOrqCTJ.jpg', 'jpg', '127884', 'MOTOE22IGRAY_1.jpg', '2023-01-19 08:15:18', '2023-01-19 08:15:18', NULL),
(45, 15, 'productos/F0nTrC0NBwMe710Sy8bss788SRkgXZeLfPFvAcgV.jpg', 'jpg', '97360', 'MOTOE22IGRAY_3.jpg', '2023-01-19 08:15:18', '2023-01-19 08:15:18', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 6, 'XL', '2023-01-14 05:12:56', '2023-01-14 12:03:59', NULL),
(2, 6, 'XS', '2023-01-14 05:22:33', '2023-01-14 05:22:33', NULL),
(3, 6, 'SM', '2023-01-14 07:51:15', '2023-01-14 07:51:15', NULL),
(4, 6, 'MD', '2023-01-14 08:11:00', '2023-01-14 08:11:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sale_detail_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `rating` tinyint(1) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `sale_detail_id`, `message`, `rating`, `created_at`, `updated_at`) VALUES
(1, 10, 2, 16, 'dasdasdasdasdasdklasjdkljaskdjaskld\ndaskljdklasjdklasjdklasjldssssssssssssssssssssssssssadddddddddddddddddddddddddddddddddddddddddddddddddd', 4, '2023-01-31 06:58:18', '2023-02-01 03:42:46'),
(2, 3, 2, 15, 'dasdasdklaskldjaskljdklasjd\nklaskldjaskldjklasjd', 5, '2023-02-01 03:46:33', '2023-02-01 03:46:33'),
(3, 10, 2, 14, 'dasdaskodjaskldjklasd\njhdaskjhdkajshdkjashjkdsa', 3, '2023-02-01 04:59:01', '2023-02-01 04:59:01'),
(4, 6, 2, 10, 'fsadfasdfsdafasd', 3, '2023-02-01 06:45:48', '2023-02-01 06:45:48'),
(5, 6, 2, 9, 'fsdafsdafasdfasdfasdfdas', 5, '2023-02-01 06:45:55', '2023-02-01 06:45:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'ADMINISTRADOR GENERAL', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `method_payment` varchar(50) NOT NULL,
  `currency_total` varchar(10) NOT NULL,
  `currency_payment` varchar(10) NOT NULL,
  `total` double NOT NULL,
  `price_dolar` double NOT NULL,
  `n_transaccion` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `user_id`, `method_payment`, `currency_total`, `currency_payment`, `total`, `price_dolar`, `n_transaccion`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 2, 'CULQI', 'PEN', 'PEN', 7025, 0, 'chr_test_QFpMJqsjSYvJ6Zr7', '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(6, 2, 'PAYPAL', 'PEN', 'USD', 1801.28, 3.9, '53G727193N025515K', '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(7, 2, 'PAYPAL', 'PEN', 'USD', 1801.28, 3.9, '9YH457056J542225Y', '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(8, 2, 'PAYPAL', 'PEN', 'USD', 2311.31, 3.829, '8XR91015JG555654E', '2023-02-04 09:30:21', '2023-01-28 09:30:21', NULL),
(9, 2, 'PAYPAL', 'PEN', 'USD', 2010.97, 3.829, '7GE32757R5310390N', '2023-02-04 09:34:56', '2023-01-28 09:34:56', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_addresses`
--

CREATE TABLE `sale_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(250) NOT NULL,
  `full_surname` varchar(250) DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `county_region` varchar(50) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sale_addresses`
--

INSERT INTO `sale_addresses` (`id`, `sale_id`, `full_name`, `full_surname`, `company_name`, `county_region`, `direccion`, `city`, `zip_code`, `phone`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 5, 'RAULssss', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(2, 6, 'RAULssss', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(3, 7, 'RAULssss', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(4, 8, 'RAULssss', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-28 09:30:21', '2023-01-28 09:30:21', NULL),
(5, 9, 'RAULssss', 'CODE', 'raulcode@gmail.com', 'Ancash', 'Peru', 'Santa', '02800', '99999999', 'josecode@gmail.com', '2023-01-28 09:34:56', '2023-01-28 09:34:56', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_details`
--

CREATE TABLE `sale_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `type_discount` tinyint(1) UNSIGNED DEFAULT NULL COMMENT '1 es porcentaje y 2 es moneda',
  `discount` double DEFAULT NULL,
  `cantidad` double NOT NULL,
  `product_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_color_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `code_cupon` varchar(50) DEFAULT NULL,
  `code_discount` varchar(50) DEFAULT NULL,
  `precio_unitario` double NOT NULL,
  `subtotal` double NOT NULL,
  `total` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sale_details`
--

INSERT INTO `sale_details` (`id`, `sale_id`, `product_id`, `type_discount`, `discount`, `cantidad`, `product_size_id`, `product_color_size_id`, `code_cupon`, `code_discount`, `precio_unitario`, `subtotal`, `total`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 5, 6, NULL, NULL, 1, 1, 1, NULL, NULL, 120, 120, 120, '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(2, 5, 6, NULL, NULL, 1, 2, 3, NULL, NULL, 120, 120, 120, '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(3, 5, 7, NULL, NULL, 3, NULL, NULL, NULL, NULL, 300, 300, 900, '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(4, 5, 3, 1, 45, 2, NULL, NULL, 'VERANO2023', NULL, 5350, 2942.5, 5885, '2023-01-28 07:47:22', '2023-01-28 07:47:22', NULL),
(5, 6, 6, NULL, NULL, 1, 1, 1, NULL, NULL, 120, 120, 120, '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(6, 6, 6, NULL, NULL, 1, 2, 3, NULL, NULL, 120, 120, 120, '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(7, 6, 7, NULL, NULL, 3, NULL, NULL, NULL, NULL, 300, 300, 900, '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(8, 6, 3, 1, 45, 2, NULL, NULL, 'VERANO2023', NULL, 5350, 2942.5, 5885, '2023-01-28 08:23:26', '2023-01-28 08:23:26', NULL),
(9, 7, 6, NULL, NULL, 1, 1, 1, NULL, NULL, 120, 120, 120, '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(10, 7, 6, NULL, NULL, 1, 2, 3, NULL, NULL, 120, 120, 120, '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(11, 7, 7, NULL, NULL, 3, NULL, NULL, NULL, NULL, 300, 300, 900, '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(12, 7, 3, 1, 45, 2, NULL, NULL, 'VERANO2023', NULL, 5350, 2942.5, 5885, '2023-01-28 08:24:38', '2023-01-28 08:24:38', NULL),
(13, 8, 4, NULL, NULL, 1, NULL, NULL, NULL, NULL, 6500, 6500, 6500, '2023-01-28 09:30:21', '2023-01-28 09:30:21', NULL),
(14, 8, 10, NULL, NULL, 1, NULL, NULL, NULL, NULL, 2350, 2350, 2350, '2023-01-28 09:30:21', '2023-01-28 09:30:21', NULL),
(15, 9, 3, NULL, NULL, 1, NULL, NULL, NULL, NULL, 5350, 5350, 5350, '2023-01-28 09:34:56', '2023-01-28 09:34:56', NULL),
(16, 9, 10, NULL, NULL, 1, NULL, NULL, NULL, NULL, 2350, 2350, 2350, '2023-01-28 09:34:56', '2023-01-28 09:34:56', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `imagen` varchar(250) NOT NULL,
  `url` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sliders`
--

INSERT INTO `sliders` (`id`, `name`, `imagen`, `url`, `created_at`, `updated_at`, `deleted_at`) VALUES
(14, NULL, 'sliders/KcbeQPMpCvjlhuNlvdNaF35Gz7EMeUsfWyrM2IAx.webp', NULL, '2023-01-19 07:00:45', '2023-01-19 07:00:45', NULL),
(17, NULL, 'sliders/QdbJanRtgj41L9NlJUPnSGRa6XK3YTNaql9afVPm.webp', NULL, '2023-01-19 07:51:30', '2023-01-19 07:51:30', NULL),
(18, NULL, 'sliders/lQnOuXYOnYnClhgT6fHUiWssHqb6GTndvIFC10hF.webp', NULL, '2023-01-19 07:51:41', '2023-01-19 07:51:41', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(250) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(250) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birthday` timestamp NULL DEFAULT NULL,
  `gender` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es masculino y 2 femenio',
  `type_user` tinyint(1) UNSIGNED NOT NULL COMMENT '1 cliente ecommerce y 2 es usuario admin',
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es activo y 2 es desactivo',
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `avatar`, `phone`, `birthday`, `gender`, `type_user`, `state`, `role_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Josessssss', 'CODE', 'jose@gmail.com', NULL, NULL, NULL, 1, 2, 1, 1, NULL, '$2y$10$SSicaYuNBd0WX71egOH/K.76EffaPWpSPcQbrjq2KNlMxbc7P0zVu', NULL, '2023-01-04 11:21:50', '2023-01-07 11:22:55'),
(2, 'echo', 'developers', 'echodeveloper960@gmail.com', 'users/cpEIYV8y6PS0xIZtD9JtYgJVlMy9moTHGeHgqPYF.png', NULL, '2017-02-08 05:00:00', 1, 1, 1, NULL, NULL, '$2y$10$eNpi.ATgH/brKjpDzYmJseKP.wf1CczbO/lhVFPOTSxuQXwNh1g62', NULL, '2023-01-05 11:50:05', '2023-01-30 13:01:32'),
(3, 'Damian', NULL, 'damian@gmail.com', NULL, NULL, NULL, 1, 1, 1, NULL, NULL, '$2y$10$zrr0S8DpKq8e/F/TwB64OOSg5iNI4laXI1ViEI.94ta7Ipqd2bR6K', NULL, '2023-01-05 11:52:08', '2023-01-05 11:52:08'),
(4, 'Rodolfo', NULL, 'rodo@gmail.com', NULL, NULL, NULL, 1, 1, 1, NULL, NULL, '$2y$10$VX3praC400WBjdBjagTLIuKDmEFeeD4nxUxnR4Vs3M9dzqoFh6l26', NULL, '2023-01-05 11:53:43', '2023-01-05 11:53:43'),
(5, 'Gustavo', 'Bueno', 'gustavo@gmail.com', NULL, NULL, NULL, 1, 1, 1, NULL, NULL, '$2y$10$xwkIGa.ALPkb4HQ0D7bsw.qtkranFMFul.cgaRkvMfm5UydFO4EBe', NULL, '2023-01-05 11:56:21', '2023-01-05 11:56:21'),
(8, 'Pepito 2|', 'rrrrr', 'pepito@gmail.com', NULL, NULL, NULL, 1, 2, 2, 1, NULL, '$2y$10$8aU3/uDyf2IvJJNMbR5oD.hEw5U0UNbFvC6uCX6pLFUpZOavucKY.', NULL, '2023-01-07 11:43:57', '2023-01-07 12:28:08'),
(9, 'Juan', 'Gomez', 'juan@gmail.com', NULL, NULL, NULL, 1, 2, 1, 1, NULL, '$2y$10$2.fsSijsGrBWqmrWiLttGughINuiJk2SKH2xkPDf2FhRYpcrlSd/a', NULL, '2023-01-07 11:53:12', '2023-01-07 12:28:44'),
(12, 'Yordy', NULL, 'yordyalejandro_14@hotmail.com', NULL, NULL, NULL, 1, 0, 1, NULL, NULL, '$2y$10$GhSskJejpJJYjdazeUDkB.pFWAzA9gyTFawuI2FNG8zMK7AsVByHC', NULL, '2025-11-28 02:07:12', '2025-11-28 02:07:12'),
(13, 'Yordy', 'Jimenez', 'yordyalejandro13@gmail.com', NULL, NULL, NULL, 1, 2, 1, NULL, NULL, '$2y$10$GUH1ZmzkuBwoE2eUh1tDKOQfMJpFrtWN8MmOZy9vixqz9RXYqoEiG', NULL, '2025-11-28 02:08:19', '2025-11-28 02:08:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_color_size_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `product_id`, `product_size_id`, `product_color_size_id`, `created_at`, `updated_at`) VALUES
(3, 2, 9, NULL, NULL, '2023-02-01 05:48:13', '2023-02-01 05:48:13'),
(9, 2, 12, NULL, NULL, '2023-02-02 04:52:59', '2023-02-02 04:52:59'),
(10, 2, 7, NULL, NULL, '2023-02-03 05:06:04', '2023-02-03 05:06:04'),
(11, 2, 3, NULL, NULL, '2023-02-04 07:24:27', '2023-02-04 07:24:27');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `address_users`
--
ALTER TABLE `address_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cart_shops`
--
ALTER TABLE `cart_shops`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discount_categories`
--
ALTER TABLE `discount_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discount_products`
--
ALTER TABLE `discount_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_color_sizes`
--
ALTER TABLE `product_color_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sale_addresses`
--
ALTER TABLE `sale_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `address_users`
--
ALTER TABLE `address_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cart_shops`
--
ALTER TABLE `cart_shops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `discount_categories`
--
ALTER TABLE `discount_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `discount_products`
--
ALTER TABLE `discount_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `product_color_sizes`
--
ALTER TABLE `product_color_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `sale_addresses`
--
ALTER TABLE `sale_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
