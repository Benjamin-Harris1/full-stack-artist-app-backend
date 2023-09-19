-- create database
CREATE DATABASE musicDb;

-- navigate to musicDb
USE musicDb;


CREATE TABLE artists (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(256) UNIQUE NOT NULL,
   career_start varchar(256),
);

DROP TABLE tracks, tracks_albums, tracks_artists;

CREATE TABLE albums (
     id INT AUTO_INCREMENT PRIMARY KEY,
     artist_id INT NOT NULL,
     title VARCHAR(256) NOT NULL UNIQUE ,
     release_date VARCHAR(256)
);

CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT,
    artist_id INT,
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

-- associate album_id with artist_id for albums with multiple artists
CREATE TABLE albums_artists (
    album_id INT,
    artist_id INT,
    PRIMARY KEY (album_id, artist_id),
    foreign key (album_id) references  albums(id),
    foreign key (artist_id) references artists(id)
);

INSERT INTO artists (name, career_start)
VALUES ("Taylor Swift","2006-01-01", "Imagine an image here");

INSERT INTO artists (name, career_start)
VALUES
    ("The Beatles", "1960", "exampleName1"),
    ("Michael Jackson", "1964", "exampleName2"),
    ("Elvis Presley", "1954", "exampleName3"),
    ("Madonna", "1979", "exampleName4"),
    ("Bob Dylan", "1961", "exampleName5"),
    ("Beyoncé", "1997", "exampleName6"),
    ("Prince", "1976", "exampleName7"),
    ("David Bowie", "1963", "exampleName8"),
    ("Whitney Houston", "1977", "exampleName9"),
    ("Adele", "2006", "exampleName10"),
    ("Queen", "1970", "exampleName11"),
    ("Frank Sinatra", "1935", "exampleName12"),
    ("Ella Fitzgerald", "1934", "exampleName13"),
    ("Jay-Z", "1995", "exampleName14"),
    ("Bob Marley", "1962", "exampleName15");

