-- create database
CREATE DATABASE musicDb;

-- navigate to musicDb
USE musicDb;

DROP TABLE tracks, tracks_albums, tracks_artists, artists;

CREATE TABLE artists (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(256) UNIQUE NOT NULL,
   career_start varchar(256)
);


CREATE TABLE albums (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(256) NOT NULL UNIQUE ,
     release_date VARCHAR(256)
);

CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256) NOT NULL UNIQUE ,
    duration INT
);

-- associate track_id with album_id for albums with multiple tracks
CREATE TABLE tracks_albums (
    track_id INT,
    album_id INT,
    PRIMARY KEY (track_id, album_id),
    foreign key (track_id) references  tracks(id),
    foreign key (album_id) references albums(id)
);

-- associate track_id with artist_id for tracks with multiple artists
CREATE TABLE tracks_artists (
   track_id INT,
   artist_id INT,
   PRIMARY KEY (track_id, artist_id),
   foreign key (track_id) references  tracks(id),
   foreign key (artist_id) references artists(id)
);

INSERT INTO artists (name, career_start)
VALUES ("Taylor Swift","2006-01-01");

INSERT INTO artists (name, career_start)
VALUES
    ("The Beatles", "1960"),
    ("Michael Jackson", "1964"),
    ("Elvis Presley", "1954"),
    ("Madonna", "1979"),
    ("Bob Dylan", "1961"),
    ("Beyoncé", "1997"),
    ("Prince", "1976"),
    ("David Bowie", "1963"),
    ("Whitney Houston", "1977"),
    ("Adele", "2006"),
    ("Queen", "1970"),
    ("Frank Sinatra", "1935"),
    ("Ella Fitzgerald", "1934"),
    ("Jay-Z", "1995"),
    ("Bob Marley", "1962");

