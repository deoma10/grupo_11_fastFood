-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fastFood_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fastFood_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fastFood_DB` DEFAULT CHARACTER SET utf8 ;
USE `fastFood_DB` ;

-- -----------------------------------------------------
-- Table `fastFood_DB`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`images` (
  `idImages` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idImages`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fastFood_DB`.`documentType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`documentType` (
  `idDocumentType` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idDocumentType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fastFood_DB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `documentNumber` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `receivesEmail` VARCHAR(45) NOT NULL,
  `privacyPolicies` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `activated` VARCHAR(45) NOT NULL,
  `fk_idImage` INT NOT NULL,
  `fk_idDocumentType` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_users_images_idx` (`fk_idImage` ASC),
  INDEX `fk_users_documentType1_idx` (`fk_idDocumentType` ASC),
  CONSTRAINT `fk_users_images`
    FOREIGN KEY (`fk_idImage`)
    REFERENCES `fastFood_DB`.`images` (`idImages`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_documentType1`
    FOREIGN KEY (`fk_idDocumentType`)
    REFERENCES `fastFood_DB`.`documentType` (`idDocumentType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fastFood_DB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`products` (
  `idProducts` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `fk_idImage` INT NOT NULL,
  PRIMARY KEY (`idProducts`),
  INDEX `fk_products_images1_idx` (`fk_idImage` ASC),
  CONSTRAINT `fk_products_images1`
    FOREIGN KEY (`fk_idImage`)
    REFERENCES `fastFood_DB`.`images` (`idImages`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fastFood_DB`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`delivery` (
  `idDelivery` INT NOT NULL,
  `fk_idUser` INT NOT NULL,
  `comments` VARCHAR(45) NULL,
  `adress` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `totalPrice` VARCHAR(45) NOT NULL,
  `release_date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDelivery`),
  INDEX `fk_delivery_users1_idx` (`fk_idUser` ASC),
  CONSTRAINT `fk_delivery_users1`
    FOREIGN KEY (`fk_idUser`)
    REFERENCES `fastFood_DB`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fastFood_DB`.`products_has_delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fastFood_DB`.`products_has_delivery` (
  `products_idProducts` INT NOT NULL,
  `delivery_idDelivery` INT NOT NULL,
  PRIMARY KEY (`products_idProducts`, `delivery_idDelivery`),
  INDEX `fk_products_has_delivery_delivery1_idx` (`delivery_idDelivery` ASC),
  INDEX `fk_products_has_delivery_products1_idx` (`products_idProducts` ASC),
  CONSTRAINT `fk_products_has_delivery_products1`
    FOREIGN KEY (`products_idProducts`)
    REFERENCES `fastFood_DB`.`products` (`idProducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_delivery_delivery1`
    FOREIGN KEY (`delivery_idDelivery`)
    REFERENCES `fastFood_DB`.`delivery` (`idDelivery`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
