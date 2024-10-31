DROP DATABASE IF EXISTS locations_db;
CREATE DATABASE locations_db;

\c locations_db;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  zipcode VARCHAR(100) NOT NULL
);
