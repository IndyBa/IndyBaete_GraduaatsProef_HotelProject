CREATE DATABASE  IF NOT EXISTS `hoteldb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hoteldb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hoteldb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Oost-Vlaanderen|9000|Test Straat|1','family.smith@example.com','Family Smith','32400000001',_binary ''),(2,'Oost-Vlaanderen|9000|Test Straat|2','company.it@example.com','Company IT','32400000002',_binary ''),(3,'Oost-Vlaanderen|9000|Test Straat|3','group.members@example.com','Group Members','32400000003',_binary ''),(4,'Oost-Vlaanderen|9000|Test Straat|4','team.alpha@example.com','Team Alpha','32400000004',_binary ''),(5,'Oost-Vlaanderen|9000|Test Straat|5','organizationxyz@example.com','Organization XYZ','32400000005',_binary ''),(6,'Oost-Vlaanderen|9000|Test Straat|6','family.jones@example.com','Family Jones','32400000006',_binary ''),(7,'Oost-Vlaanderen|9000|Test Straat|7','family.white@example.com','Family White','32400000007',_binary ''),(8,'Oost-Vlaanderen|9000|Test Straat|8','family.black@example.com','Family Black','32400000008',_binary ''),(9,'Oost-Vlaanderen|9000|Test Straat|9','family.green@example.com','Family Green','32400000009',_binary ''),(10,'Oost-Vlaanderen|9000|Test Straat|10','family.brown@example.com','Family Brown','32400000010',_binary ''),(11,'Oost-Vlaanderen|9000|Test Straat|11','family.johnson@example.com','Family Johnson','32400000011',_binary ''),(12,'Oost-Vlaanderen|9000|Test Straat|12','family.miller@example.com','Family Miller','32400000012',_binary ''),(13,'Oost-Vlaanderen|9000|Test Straat|13','family.davis@example.com','Family Davis','32400000013',_binary ''),(14,'Oost-Vlaanderen|9000|Test Straat|14','family.garcia@example.com','Family Garcia','32400000014',_binary ''),(15,'Oost-Vlaanderen|9000|Test Straat|15','family.rodriguez@example.com','Family Rodriguez','32400000015',_binary ''),(16,'Oost-Vlaanderen|9000|Test Straat|16','company.acme@example.com','Company ACME','32400000016',_binary ''),(17,'Oost-Vlaanderen|9000|Test Straat|17','family.martinez@example.com','Family Martinez','32400000017',_binary ''),(18,'Oost-Vlaanderen|9000|Test Straat|18','family.jackson@example.com','Family Jackson','32400000018',_binary ''),(19,'Oost-Vlaanderen|9000|Test Straat|19','team.phoenix@example.com','Team Phoenix','32400000019',_binary ''),(20,'Oost-Vlaanderen|9000|Test Straat|20','family.white@example.com','Family White','32400000020',_binary '');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `birth_day` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbaqvakoxfn8079onqo5kaxcp9` (`customer_id`),
  CONSTRAINT `FKbaqvakoxfn8079onqo5kaxcp9` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'1990-10-02','Max',_binary '',1),(2,'1985-05-15','Emma',_binary '',1),(3,'1988-08-20','Jack',_binary '',1),(4,'1982-03-12','Sophia',_binary '',2),(5,'1987-11-25','Aiden',_binary '',2),(6,'1984-07-09','Logan',_binary '',3),(7,'1999-04-18','Chloe',_binary '',3),(8,'1989-01-27','Lily',_binary '',3),(9,'1993-11-05','Ava',_binary '',4),(10,'1987-08-12','Lucas',_binary '',5),(11,'1995-02-28','Sophie',_binary '',5),(12,'1982-09-14','Elijah',_binary '',6),(13,'1991-04-27','Aria',_binary '',6),(14,'1996-12-08','Caleb',_binary '',6),(15,'1988-03-03','Grace',_binary '',7),(16,'1990-07-19','Luna',_binary '',8),(17,'1985-11-10','Leo',_binary '',8),(18,'1997-05-22','Zoe',_binary '',8),(19,'1983-01-16','Sofia',_binary '',9),(20,'1992-08-29','Evan',_binary '',9),(21,'1989-06-02','Isaac',_binary '',10),(22,'1982-04-15','Aiden',_binary '',11),(23,'1987-12-28','Olivia',_binary '',11),(24,'1995-05-03','Noah',_binary '',11),(25,'1984-10-08','Lucas',_binary '',12),(26,'1999-02-20','Ella',_binary '',12),(27,'1993-06-17','Mia',_binary '',13),(28,'1980-09-24','Aiden',_binary '',13),(29,'1998-03-30','Ethan',_binary '',14),(30,'1985-11-05','Sophie',_binary '',15),(31,'1995-02-28','Liam',_binary '',15),(32,'1987-08-12','Lucas',_binary '',16),(33,'1992-04-22','Sophia',_binary '',16),(34,'1998-11-18','Ella',_binary '',16),(35,'1983-05-02','Ethan',_binary '',17),(36,'1991-12-14','Mia',_binary '',17),(37,'1999-08-30','Olivia',_binary '',18),(38,'1981-03-17','Aiden',_binary '',18),(39,'1989-07-23','Sophie',_binary '',19),(40,'1996-01-10','Liam',_binary '',19),(41,'1986-09-05','Lucas',_binary '',19),(42,'1994-04-18','Ella',_binary '',20),(43,'1980-12-30','Noah',_binary '',20),(44,'1992-06-22','Sophia',_binary '',20),(45,'1983-11-15','Liam',_binary '',20),(46,'1997-09-08','Olivia',_binary '',20);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-18  3:26:51
