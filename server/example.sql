--  extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

CREATE TABLE USERS(
      id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      username VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(64) UNIQUE NOT NULL,
      role VARCHAR(64) NOT NULL,
      age INT NOT NULL,
      password TEXT NOT NULL
);

CREATE TABLE courses(
      id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      title VARCHAR NOT NULL,
      price VARCHAR NOT NULL,
      description VARCHAR NOT NULL,
      teacher_id VARCHAR NOT NULL,
      created_by_user_id VARCHAR NOT NULL
);

CREATE TABLE cars(
      id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      title VARCHAR NOT NULL,
      price VARCHAR NOT NULL,
      color VARCHAR NOT NULL,
      description VARCHAR NOT NULL,
      created_by_user_id VARCHAR NOT NULL
);

CREATE TABLE fruits(
      id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      title VARCHAR NOT NULL,
      price VARCHAR NOT NULL,
      country VARCHAR NOT NULL,
      description VARCHAR NOT NULL,
      created_by_user_id VARCHAR NOT NULL
);

CREATE TABLE animals(
      id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      title VARCHAR NOT NULL,
      color VARCHAR NOT NULL,
      type VARCHAR NOT NULL,
      created_by_user_id VARCHAR NOT NULL
);