CREATE DATABASE conecta;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "admin" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  token VARCHAR(255)
); 

CREATE TABLE manager (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  isActive BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  token varchar(255),
  token_expiration_time TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES "admin"(id)
);

CREATE TABLE meet (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL,
  manager_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  datetime TIMESTAMP NOT NULL,
  link VARCHAR(255),
  image_link VARCHAR(255),
  address VARCHAR(255) NOT NULL,
  address_number VARCHAR(255),
  address_zip VARCHAR(255) NOT NULL,
  address_city VARCHAR(255) NOT NULL,
  address_state VARCHAR(255) NOT NULL,
  address_district VARCHAR(255) NOT NULL,
  address_complement VARCHAR(255),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (admin_id) REFERENCES "admin"(id),
  FOREIGN KEY (manager_id) REFERENCES manager(id)
);

CREATE TYPE status AS ENUM ('pending', 'confirmed', 'cancelled');
  
CREATE TABLE lecture (
  id SERIAL PRIMARY KEY,
  meet_id UUID,
  speaker_name VARCHAR(255) NOT NULL,
  speaker_linkedin VARCHAR(255),
  speaker_about VARCHAR(255) NOT NULL,
  speaker_email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255)NOT NULL,
  datetime TIMESTAMP,
  status status, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL, 
  isCancelled BOOLEAN DEFAULT FALSE,
  cancellation_reason VARCHAR(255) DEFAULT NULL,  
  FOREIGN KEY (meet_id) REFERENCES meet(id)
);
   



