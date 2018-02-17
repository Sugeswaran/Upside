-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2018 at 07:20 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `upside`
--

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--

CREATE TABLE `entry` (
  `Id` int(11) NOT NULL,
  `First_name` varchar(20) NOT NULL,
  `Last_name` varchar(20) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Mail_id` varchar(40) NOT NULL,
  `Mobile` bigint(10) NOT NULL,
  `Crypted` varchar(500) NOT NULL,
  `Decrypted` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entry`
--

INSERT INTO `entry` (`Id`, `First_name`, `Last_name`, `Password`, `Mail_id`, `Mobile`, `Crypted`, `Decrypted`) VALUES
(1, 'Sugesh', 'Ravi', '$2a$04$qT2.qgN5neM4k2d2NpuMRu5n/jTrbs9lvxi6Dj50Aox2D.XVlSCsq', 'sugeshwar@gmail.com', 9442370007, 'fbf3a7ad3ce105137056', '?]}? '),
(2, 'Gohan', 'Ray', '$2a$04$SazMmVYLjF.voUKGjflidutyYUERRGZOd24nyVyMKqHzbx5x7Aud2', 'gohanray@gmail.com', 9845149952, 'ce5f530bcf112536db', 'qwerty123'),
(3, 'Anita', 'subasni', '$2a$04$Vsi1rB3fdDbNQNO4BPUEF.DrrmZMAqymnaaIP/Waam.XGM0Ym3rP2', 'subasnianita@gmail.com', 9940827090, 'abd3233a31b64005', '?=??p?X');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `Id` int(11) NOT NULL,
  `Token` varchar(100) NOT NULL,
  `Mail_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
