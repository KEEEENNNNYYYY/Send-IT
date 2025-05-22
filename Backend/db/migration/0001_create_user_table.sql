CREATE TABLE "user" (
    id VARCHAR PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    birthday DATE NOT NULL,
    numeric_id SERIAL UNIQUE NOT NULL,
    location VARCHAR
);
