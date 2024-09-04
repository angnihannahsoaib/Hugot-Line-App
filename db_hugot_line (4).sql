-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2024 at 02:54 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hugot_line`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `hugot_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `time_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `hugot_id`, `user_id`, `comment`, `time_created`) VALUES
(1, 1, 2, 'Tama ka dyan!', '2024-08-22 18:31:24'),
(2, 2, 1, 'Life is indeed a wheel!', '2024-08-22 18:31:24'),
(3, 1, NULL, 'Di naman ata', '2024-08-23 12:37:46'),
(4, 1, NULL, 'True?', '2024-08-23 12:42:32'),
(5, 3, NULL, 'Binta mo kaya!', '2024-08-23 12:46:19'),
(6, 3, NULL, 'No! it\'s not!', '2024-08-23 14:37:53'),
(7, 3, NULL, 'True', '2024-08-23 21:10:51'),
(8, 4, NULL, 'Gamay nalang', '2024-08-24 01:13:40');

-- --------------------------------------------------------

--
-- Table structure for table `hugot_lines`
--

CREATE TABLE `hugot_lines` (
  `id` int(11) NOT NULL,
  `cashier_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `likes` int(11) DEFAULT 0,
  `hearts` int(11) DEFAULT 0,
  `stars` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `username` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hugot_lines`
--

INSERT INTO `hugot_lines` (`id`, `cashier_id`, `content`, `likes`, `hearts`, `stars`, `created_at`, `username`) VALUES
(1, 1, 'Ang pag-ibig, parang tadhana?', 10, 6, 3, '2024-08-22 18:31:24', ''),
(2, 2, 'Ang buhay, parang gulong.', 15, 7, 2, '2024-08-22 18:31:24', ''),
(3, NULL, 'Time is gold daw.', 1, 1, 2, '2024-08-23 12:43:25', 'CurrentUser'),
(4, NULL, 'Pagod na ako talaga.', 3, 4, 0, '2024-08-23 21:13:49', 'CurrentUser');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_account`
--

CREATE TABLE `tbl_user_account` (
  `cashier_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user_account`
--

INSERT INTO `tbl_user_account` (`cashier_id`, `name`, `username`, `password`, `created_at`) VALUES
(1, 'Hannah Angni', 'hannahangni', 'pass1', '2024-08-22 18:31:23'),
(2, 'Kathryn Bernardo', 'kathjoy', 'pass2', '2024-08-22 18:31:23'),
(3, 'Jungkook', 'jk28', 'pass3', '2024-08-23 08:38:50'),
(4, 'Jay Park', 'jay99', '123', '2024-08-23 17:36:21'),
(5, 'Joy', 'joy101', '101', '2024-08-23 17:56:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hugot_id` (`hugot_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `hugot_lines`
--
ALTER TABLE `hugot_lines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`cashier_id`);

--
-- Indexes for table `tbl_user_account`
--
ALTER TABLE `tbl_user_account`
  ADD PRIMARY KEY (`cashier_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `hugot_lines`
--
ALTER TABLE `hugot_lines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_user_account`
--
ALTER TABLE `tbl_user_account`
  MODIFY `cashier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`hugot_id`) REFERENCES `hugot_lines` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user_account` (`cashier_id`);

--
-- Constraints for table `hugot_lines`
--
ALTER TABLE `hugot_lines`
  ADD CONSTRAINT `hugot_lines_ibfk_1` FOREIGN KEY (`cashier_id`) REFERENCES `tbl_user_account` (`cashier_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
