
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE manager (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  github VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	email VARCHAR(255)
);

CREATE TABLE meet (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date TIMESTAMP,
  place VARCHAR(255),
  link VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  manager_id UUID REFERENCES manager(id)
);

  
CREATE TABLE lecturer (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  github VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	email VARCHAR(255)
);


CREATE TABLE lecture (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  startTime TIME,
  endTime TIME,
  lecturer_id INTEGER REFERENCES lecturer(id) ON DELETE CASCADE  
);
   

CREATE TABLE meet_lecture (
  id SERIAL PRIMARY KEY,
  meet_id INTEGER REFERENCES meet(id) ON DELETE CASCADE,
  lecture_id INTEGER REFERENCES lecture(id) ON DELETE CASCADE
);

INSERT INTO manager (
  username,
  firstName,
  lastName,
  github,
  email
	) VALUES (
  'rodrigo1986',
  'Rodrigo',
  'Manoel',
  'https://github.com/rodrigogarcia1986',
  'rodrigo.manoel@alumni.usp.br'
);

INSERT INTO meet (
  name,
  date,
  place,
  link,
  manager_id
	) VALUES (
 	'Como fazer uma aplicação Nest em 2 horas!',
  to_timestamp('2024-05-30 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
  'Google Meet',
  'www.qualquerlink.com/aiaiaia',
	'6d825de0-d500-4ac7-85f0-187e4729b230'
 );


INSERT INTO lecturer (
  firstName,
  lastName,
  github,
  email
  ) VALUES (
  'Silvio',
  'Santos',
  'https://github.com/silviosantos',
  'rodrigogarciacapota@gmail.com'
);  


INSERT INTO lecture (
  title,
  lecturer_id 
  ) VALUES (
    'Quem quer dinheiro?',    
    1
);


INSERT INTO meet_lecture (
  meet_id,
  lecture_id
  ) VALUES (
    4,
    1
);
