-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fastfood_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fastfood_db
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `Grupo_11_fastFood_DB`;
CREATE SCHEMA IF NOT EXISTS `Grupo_11_fastFood_DB` DEFAULT CHARACTER SET utf8 ;
USE `Grupo_11_fastFood_DB` ;

-- -----------------------------------------------------
-- Table `fastfood_db`.`documenttypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`documenttypes` (
  `idDocumentType` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idDocumentType`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;

INSERT INTO documenttypes (name, description) values
('CC', 'Cédula de ciudadania'),
('CE', 'Cédula de Extranjeria'),
('NIT', 'Número de identificación tributaria');


-- -----------------------------------------------------
-- Table `fastfood_db`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`images` (
  `idImage` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`idImage`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;

INSERT INTO images (name) values
('burger-featured-1.png'),
('burger-featured-2.png'),
('burger-featured-3.png'),
('burger-featured-4.png'),
('burger-featured-5.png'),
('burger-featured-6.png'),
('prueba.png'),
('default-image.png'),
('default-image.png');

-- -----------------------------------------------------
-- Table `fastfood_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `documentNumber` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `receivesEmail` VARCHAR(10) NULL,
  `privacyPolicies` VARCHAR(10) NOT NULL,
  `rol` INT NOT NULL,
  `activated` VARCHAR(45) NOT NULL,
  `fk_idImage` INT NOT NULL,
  `fk_idDocumentType` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_users_images_idx` (`fk_idImage` ASC),
  INDEX `fk_users_documentType1_idx` (`fk_idDocumentType` ASC),
  CONSTRAINT `fk_users_documentType1`
    FOREIGN KEY (`fk_idDocumentType`)
    REFERENCES `Grupo_11_fastFood_DB`.`documenttypes` (`idDocumentType`),
  CONSTRAINT `fk_users_images`
    FOREIGN KEY (`fk_idImage`)
    REFERENCES `Grupo_11_fastFood_DB`.`images` (`idImage`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;

INSERT INTO users (documentNumber, Name, lastName, email, password,receivesEmail,privacyPolicies,rol, activated,fk_idImage,fk_idDocumentType) values
(123456789,'Seiumour', 'Skinner', 'admin@gmail.com', '$2a$10$S.SKV1.ndGx8nKRKHyNX5udcNh9bykZnkPRmfebUL1rQXubqd4a9q', 'on', 'on', 9, 1, 8, 1 ),
(987654321,'Homero','Simpson','homero@gmail.com', '$2a$10$S.SKV1.ndGx8nKRKHyNX5udcNh9bykZnkPRmfebUL1rQXubqd4a9q', 'on', 'on', 1, 1, 9, 1);


-- -----------------------------------------------------
-- Table `fastfood_db`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`delivery` (
  `idDelivery` INT NOT NULL AUTO_INCREMENT,
  `fk_idUser` INT NOT NULL,
  `orders` VARCHAR(200) NULL DEFAULT NULL,
  `comments` VARCHAR(200) NULL DEFAULT NULL,
  `adress` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `totalPrice` VARCHAR(45) NOT NULL,
  `release_date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDelivery`),
  INDEX `fk_delivery_users1_idx` (`fk_idUser` ASC),
  CONSTRAINT `fk_delivery_users1`
    FOREIGN KEY (`fk_idUser`)
    REFERENCES `Grupo_11_fastFood_DB`.`users` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fastfood_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`products` (
  `idProducts` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(400) NOT NULL,
  `price` INT NOT NULL,
  `fk_idImage` INT NOT NULL,
  PRIMARY KEY (`idProducts`),
  INDEX `fk_products_images1_idx` (`fk_idImage` ASC),
  CONSTRAINT `fk_products_images1`
    FOREIGN KEY (`fk_idImage`)
    REFERENCES `Grupo_11_fastFood_DB`.`images` (`idImage`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;

INSERT INTO products (name, description, price, fk_idImage) values
('Crispy Onion', 'Pan artesanal, salsa de la casa y bbq, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso americano, tocineta y cebolla crispy', 25900, 1),
('Red Pepper', 'Pan artesanal, salsa de la casa y sweet mayo, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso americano y pimentones rojos caramelizados', 25900, 2),
('Choriburger', 'Pan artesanal, salsa de la casa y chipotle, lechuga, tomate, 150gr. de carne de hamburguesa seleccionada, queso americano y chorizo argentino, bañado en chimichurri', 25900, 3),
('DR Pepper Jacks', 'Pan artesanal, lechuga, 150 gramos de certified angus beef, cubiertos de queso pepper jack, cebolla puerro crocante y nuestra salsa exclusiva DR PEPPER, incluye papas fritas', 27500, 4),
('La Nativa', 'Pan artesanal, salsa de la casa y sweet mayo, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso costeño asado y cebolla caramelizada', 24900, 5),
('Veggie Burger', 'Pan artesanal, aderezo de la casa, lechuga, tomate, cebolla y 150gr. de nuestra deliciosa croqueta de garbanzos', 18900, 6);



-- -----------------------------------------------------
-- Table `fastfood_db`.`products_has_delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo_11_fastFood_DB`.`products_has_delivery` (
  `products_idProducts` INT NOT NULL,
  `delivery_idDelivery` INT NOT NULL,
  PRIMARY KEY (`products_idProducts`, `delivery_idDelivery`),
  INDEX `fk_products_has_delivery_delivery1_idx` (`delivery_idDelivery` ASC),
  INDEX `fk_products_has_delivery_products1_idx` (`products_idProducts` ASC),
  CONSTRAINT `fk_products_has_delivery_delivery1`
    FOREIGN KEY (`delivery_idDelivery`)
    REFERENCES `Grupo_11_fastFood_DB`.`delivery` (`idDelivery`),
  CONSTRAINT `fk_products_has_delivery_products1`
    FOREIGN KEY (`products_idProducts`)
    REFERENCES `Grupo_11_fastFood_DB`.`products` (`idProducts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
