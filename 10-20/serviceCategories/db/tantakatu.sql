CREATE DATABASE bd_tantakatu;

USE bd_tantakatu;

CREATE TABLE IF NOT EXISTS category (
  `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL,
  `description`  VARCHAR(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

DESCRIBE category;
