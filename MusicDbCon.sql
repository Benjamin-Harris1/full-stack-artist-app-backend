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
    duration TIME
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
VALUES ("Taylor Swift","2006");

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


INSERT INTO tracks (title, duration)
values
    -- The Beatles tracks
("Lucy in the Sky with Diamonds", "3:28"),
("Let It Be", "3:52"),
("Yesterday", "2:04"),

-- Michael Jackson tracks
("Billie Jean", "4:54"),
("Beat It", "4:18"),
("Smooth Criminal", "4:17"),

-- Elvis Presley tracks
("Heartbreak Hotel", "2:06"),
("Hound Dog", "2:17"),
("Love Me Tender", "2:45"),

-- Madonna tracks
("Like a Prayer", "5:41"),
("Material Girl", "3:56"),
("Vogue", "5:16"),

-- Bob Dylan tracks
("Blowin' in the Wind", "2:48"),
("The Times They Are a-Changin'", "3:15"),
("Knockin' on Heaven's Door", "2:30"),

-- Beyoncé tracks
("Crazy in Love", "3:56"),
("Halo", "4:21"),
("Single Ladies (Put a Ring on It)", "3:13"),

-- Prince tracks
("Purple Rain", "8:41"),
("When Doves Cry", "3:49"),
("Kiss", "3:46"),

-- David Bowie tracks
("Space Oddity", "5:15"),
("Heroes", "6:07"),
("Life on Mars?", "3:54"),

-- Whitney Houston tracks
("I Will Always Love You", "4:31"),
("Greatest Love of All", "4:55"),
("I Wanna Dance with Somebody", "4:51"),

-- Adele tracks
("Rolling in the Deep", "3:48"),
("Hello", "4:55"),
("Someone Like You", "4:45"),

-- Queen tracks
("Bohemian Rhapsody", "5:55"),
("We Will Rock You", "2:01"),
("Another One Bites the Dust", "3:35"),

-- Frank Sinatra tracks
("My Way", "4:35"),
("Fly Me to the Moon", "2:29"),
("New York, New York", "3:18"),

-- Ella Fitzgerald tracks
("Summertime", "4:58"),
("A-Tisket, A-Tasket", "2:22"),
("Blue Skies", "3:42"),

-- Jay-Z tracks
("Empire State of Mind", "4:37"),
("99 Problems", "3:55"),
("Hard Knock Life (Ghetto Anthem)", "3:58"),

-- Bob Marley tracks
("No Woman, No Cry", "7:08"),
("One Love", "2:50"),
("Redemption Song", "3:48");

INSERT INTO albums(title, release_date )
values ("Sgt. Pepper's Lonely Hearts Club Band", "1967"),
("Thriller", "1982"),
("Elvis Presley", "1956"),
("Like a Virgin", "1984"),
("Highway 61 Revisited", "1965"),
("Beyoncé", "2013"),
("Purple Rain", "1984"),
("The Rise and Fall of Ziggy Stardust and the Spiders from Mars", "1972"),
("Whitney Houston", "1985"),
("21", "2011"),
("A Night at the Opera", "1975"),
("Frank Sinatra (Self-titled)", "1956"),
("Ella Fitzgerald (Self-titled)", "1950"),
("Reasonable Doubt", "1996"),
("Legend", "1984");