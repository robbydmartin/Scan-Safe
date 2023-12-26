-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 05:13 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scansafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `alternative_product`
--

CREATE TABLE `alternative_product` (
  `id` bigint(20) NOT NULL,
  `alt_product` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `replaces_product` varchar(255) DEFAULT NULL,
  `upc` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alternative_product`
--

INSERT INTO `alternative_product` (`id`, `alt_product`, `notes`, `replaces_product`, `upc`, `username`, `user_id`) VALUES
(102, 'Beanfields Nacho Cheese Chips', 'So tasty!', 'Doritos', '058449410003', 'influencer', 0),
(103, 'Olipop Lemon Lime Soda', 'Tastes so sugary and good you\'d thought it really was Mountain Dew!', 'Mountain Dew', '028400516464', 'robby', 0),
(104, 'Nature\'s Path Organic Frosted Strawberry Toaster Pastries', 'Love these pastries!', 'Kellog\'s Strawberry Pop-Tarts', '028400516464', 'influencer', 0),
(105, 'Natural Bliss Vanilla Almond Milk Creamer ', 'The taste is exactly the same; you will never know the difference!', 'Coffee-Mate\'s Vanilla Bean Liquid Creamer', '050000322756', 'influencer', 0),
(111, '0669809200808', '', 'Sour patch kids', '0070462098358', 'robby', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`, `reference`) VALUES
(1, 'corn syrup', 'https://www.ucdavis.edu/health/news/both-sucrose-and-high-fructose-corn-syrup-linked-increased-health-risks'),
(2, 'red 40', 'https://health.clevelandclinic.org/red-dye-40');

-- --------------------------------------------------------

--
-- Table structure for table `personal_ingredient`
--

CREATE TABLE `personal_ingredient` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personal_ingredient`
--

INSERT INTO `personal_ingredient` (`id`, `name`, `user_id`, `username`) VALUES
(1, 'sugar', 0, 'jackson'),
(2, 'blue 1', 0, 'jackson');

-- --------------------------------------------------------

--
-- Table structure for table `proposed_ingredient`
--

CREATE TABLE `proposed_ingredient` (
  `id` bigint(20) NOT NULL,
  `approved` bit(1) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rejected` bit(1) NOT NULL,
  `risk` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proposed_ingredient`
--

INSERT INTO `proposed_ingredient` (`id`, `approved`, `comments`, `name`, `rejected`, `risk`, `website`, `username`, `user_id`) VALUES
(1, b'0', 'This stuff is super dangerous', 'Gluten', b'1', 'Allergic reaction', 'www.glutenisbad.com', 'influencer', 0),
(12, b'0', 'I can tell when I eat something containing this ingredient', 'Red 40', b'0', 'Causes migraine headheaches.', 'www.whatswrongwithred40.org', 'influencer', 0),
(45, b'1', 'MSG is not healthy and should be banned!', 'Monosodium Glutamate', b'0', 'Potentially impairs brain growth and development.', 'https://www.healthline.com/nutrition/common-food-additives#TOC_TITLE_HDR_2', 'influencer', 0),
(46, b'0', 'In moderate amounts it\'s okay, but it still can cause swelling and cramps.', 'Guar Gum', b'1', 'Can cause swelling in the small intestine.', 'https://www.sciencedirect.com/topics/medicine-and-dentistry/guar-gum#:~:text=Guar%20gum%20causes%20abdominal%20pain,cause%20occupational%20rhinitis%20and%20asthma.', 'robby', 0),
(58, b'0', 'I have no allergy to gluten, but it makes me gassy.', 'Gluten', b'0', 'It super bad', 'www.something.com', 'robby', 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(2, 'ROLE_USER'),
(3, 'ROLE_INFLUENCER'),
(4, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `username`) VALUES
(1, 'influencer@uncg.edu', 'influencer', '$2a$10$/zYOCllPWfD5GV3JrzbY5.CEA0EzRV3gW6S5jZhZDGRUALgjvhI6a', 'influencer'),
(2, 'jackson@uncg.edu', 'jackson', '$2a$10$T/CB/u8wgKWExlEk.VMIx.DgRjLi7lXYWEgy2wrMr7C2fBCs1uqAm', 'jackson'),
(3, 'caleb@uncg.edu', 'caleb', '$2a$10$6vcI55.exhPn7YtWCzql0eh1ZiL/z4QcZylYJ8yKOuScP7GXQHjZu', 'caleb'),
(5, 'caleb2@gmail.com', 'caleb2', '$2a$10$00fJeYiae9YvDprfO3PXzORkmd9fQ.Z19oP/hWwbQaSEwVW64v2z2', 'caleb2');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 3),
(2, 3),
(3, 2),
(5, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternative_product`
--
ALTER TABLE `alternative_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_ingredient`
--
ALTER TABLE `personal_ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposed_ingredient`
--
ALTER TABLE `proposed_ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternative_product`
--
ALTER TABLE `alternative_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_ingredient`
--
ALTER TABLE `personal_ingredient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `proposed_ingredient`
--
ALTER TABLE `proposed_ingredient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
