-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2015 a las 20:51:14
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `mymusicaluniverse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(5) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` varchar(2000) DEFAULT NULL,
  `theme` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `article_reply`
--

CREATE TABLE IF NOT EXISTS `article_reply` (
  `id` int(5) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `id_article` int(5) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(5) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `drop_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `event_name` varchar(20) DEFAULT NULL,
  `artist` varchar(20) DEFAULT NULL,
  `company` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event_members`
--

CREATE TABLE IF NOT EXISTS `event_members` (
  `id_event` int(5) NOT NULL DEFAULT '0',
  `id_user` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(5) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `stock` int(5) DEFAULT NULL,
  `inSale` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sellings`
--

CREATE TABLE IF NOT EXISTS `sellings` (
  `id_user` int(5) NOT NULL DEFAULT '0',
  `id_product` int(5) NOT NULL DEFAULT '0',
  `amount` int(5) DEFAULT NULL,
  `total_money` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `id` int(5) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `song_url` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforums`
--

CREATE TABLE IF NOT EXISTS `subforums` (
  `id` int(5) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `subforums`
--

INSERT INTO `subforums` (`id`, `name`, `description`) VALUES
(1, 'Pop', 'Pop music subforum'),
(2, 'Rock', 'Rock music subforum'),
(3, 'Classical', 'Classical music subforum'),
(4, 'Hip Hop', 'Hip hop music subforum');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subscription`
--

CREATE TABLE IF NOT EXISTS `subscription` (
  `id_user` int(5) NOT NULL DEFAULT '0',
  `id_thread` int(5) NOT NULL DEFAULT '0',
  `last_reply` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thread`
--

CREATE TABLE IF NOT EXISTS `thread` (
  `id` int(5) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` varchar(2000) DEFAULT NULL,
  `total_replies` int(5) DEFAULT NULL,
  `id_subforum` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thread_reply`
--

CREATE TABLE IF NOT EXISTS `thread_reply` (
  `id` int(5) NOT NULL,
  `id_user` int(5) DEFAULT NULL,
  `id_thread` int(5) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number_reply` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL,
  `username` varchar(10) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL,
  `surname1` varchar(15) DEFAULT NULL,
  `surname2` varchar(15) DEFAULT NULL,
  `type_user` int(1) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `bank_account` varchar(50) DEFAULT NULL,
  `phone` int(9) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`), ADD KEY `articleCreator_idUser` (`id_user`);

--
-- Indices de la tabla `article_reply`
--
ALTER TABLE `article_reply`
  ADD PRIMARY KEY (`id`), ADD KEY `id_user_reply_fk` (`id_user`), ADD KEY `id_article_reply_fk` (`id_article`);

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`), ADD KEY `eventCreator_idUser` (`id_user`);

--
-- Indices de la tabla `event_members`
--
ALTER TABLE `event_members`
  ADD PRIMARY KEY (`id_event`,`id_user`), ADD KEY `members_idUser_fk2` (`id_user`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sellings`
--
ALTER TABLE `sellings`
  ADD PRIMARY KEY (`id_user`,`id_product`), ADD KEY `id_product_fk` (`id_product`);

--
-- Indices de la tabla `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforums`
--
ALTER TABLE `subforums`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id_user`,`id_thread`), ADD KEY `id_subthread_fk` (`id_thread`);

--
-- Indices de la tabla `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`id`), ADD KEY `threadCreator_idUser` (`id_user`), ADD KEY `id_subforums_fk` (`id_subforum`);

--
-- Indices de la tabla `thread_reply`
--
ALTER TABLE `thread_reply`
  ADD PRIMARY KEY (`id`), ADD KEY `id_user_thread_reply_fk` (`id_user`), ADD KEY `id_thread_reply_fk` (`id_thread`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `article`
--
ALTER TABLE `article`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `article_reply`
--
ALTER TABLE `article_reply`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `event`
--
ALTER TABLE `event`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `song`
--
ALTER TABLE `song`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `subforums`
--
ALTER TABLE `subforums`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `thread`
--
ALTER TABLE `thread`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `thread_reply`
--
ALTER TABLE `thread_reply`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `article`
--
ALTER TABLE `article`
ADD CONSTRAINT `articleCreator_idUser` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `article_reply`
--
ALTER TABLE `article_reply`
ADD CONSTRAINT `id_article_reply_fk` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`),
ADD CONSTRAINT `id_user_reply_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `event`
--
ALTER TABLE `event`
ADD CONSTRAINT `eventCreator_idUser` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `event_members`
--
ALTER TABLE `event_members`
ADD CONSTRAINT `members_idEvent_fk` FOREIGN KEY (`id_event`) REFERENCES `event` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `members_idUser_fk2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sellings`
--
ALTER TABLE `sellings`
ADD CONSTRAINT `id_product_fk` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `id_user_buy_reply_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `subscription`
--
ALTER TABLE `subscription`
ADD CONSTRAINT `id_subthread_fk` FOREIGN KEY (`id_thread`) REFERENCES `thread` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `id_user_sub_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `thread`
--
ALTER TABLE `thread`
ADD CONSTRAINT `id_subforums_fk` FOREIGN KEY (`id_subforum`) REFERENCES `subforums` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `threadCreator_idUser` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `thread_reply`
--
ALTER TABLE `thread_reply`
ADD CONSTRAINT `id_thread_reply_fk` FOREIGN KEY (`id_thread`) REFERENCES `thread` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `id_user_thread_reply_fk` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
