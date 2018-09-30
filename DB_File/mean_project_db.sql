-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 30 sep. 2018 à 15:22
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `mean_project_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `personnes`
--

DROP TABLE IF EXISTS `personnes`;
CREATE TABLE IF NOT EXISTS `personnes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `age` text NOT NULL,
  `adresse` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `personnes`
--

INSERT INTO `personnes` (`id`, `nom`, `prenom`, `email`, `password`, `age`, `adresse`) VALUES
(1, 'BAKKALI', 'Mohamed', 'med@mail.com', '$2b$10$AsV25bQqhBK1P.FPiyKiFuplAofGJvLiXmxoARY7hbWZVwrO02kXi', '11', 'Tanger'),
(2, 'TAMSAMANI', 'Ahmed', 'ahmed@mail.com', '$2b$10$AsV25bQqhBK1P.FPiyKiFuplAofGJvLiXmxoARY7hbWZVwrO02kXi', '22', 'Rabat'),
(9, 'ALAMI', 'Ali', 'user@mail.com', '$2b$10$AsV25bQqhBK1P.FPiyKiFuplAofGJvLiXmxoARY7hbWZVwrO02kXi', '33', 'Casablanca');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
