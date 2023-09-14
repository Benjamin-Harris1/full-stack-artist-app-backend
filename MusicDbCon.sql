-- create database
CREATE DATABASE musicDb;

-- navigate to musicDb
USE musicDb;


CREATE TABLE artists (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(256) UNIQUE NOT NULL,
   career_start DATE,
   image TEXT
);

CREATE TABLE albums (
     id INT AUTO_INCREMENT PRIMARY KEY,
     artist_id INT NOT NULL,
     title VARCHAR(256) NOT NULL ,
     release_date VARCHAR(256),
     image TEXT
);

CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT,
    artist_id INT,
    title VARCHAR(256),
    duration INT
);

    INSERT INTO users (name, mail, title, image)
VALUES ("ME", "Markus@bille.com", "Very smart", "profile.png")

SELECT name, mail FROM users
WHERE mail LIKE "%@kea.%";

UPDATE users
SET title = "quite handsome"
WHERE title LIKE "%smart";

SELECT name, title FROM users