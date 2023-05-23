
CREATE TABLE continents (
  id int(11) NOT NULL AUTO_INCREMENT,
  code TEXT,
  name TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE countries (
  id int(11) NOT NULL AUTO_INCREMENT,
  continents_id int,
  name TEXT,
  code TEXT,
  native TEXT,
  phone TEXT,
  capital TEXT,
  currency TEXT,
  emoji TEXT,
  emojiU TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (continents_id) REFERENCES continents(id)
);

CREATE TABLE countries_languages (
  id int(11) NOT NULL AUTO_INCREMENT,
  countries_id int,
  languages_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (countries_id) REFERENCES countries(id),
  FOREIGN KEY (languages_id) REFERENCES languages(id)
);

CREATE TABLE languages (
  id int(11) NOT NULL AUTO_INCREMENT,
  code TEXT,
  name TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE states (
  id int(11) NOT NULL AUTO_INCREMENT,
  countries_id int,
  value TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (countries_id) REFERENCES countries(id)
);