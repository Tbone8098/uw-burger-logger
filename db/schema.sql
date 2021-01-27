DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers(
  id INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(100) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO burgers (content, devoured) VALUES ("big and taste", false);
INSERT INTO burgers (content, devoured) VALUES ("small and taste", false);
INSERT INTO burgers (content, devoured) VALUES ("just right and taste", false);