create table users ( 
    id int auto_increment primary key, 
    email varchar(255) unique, 
    firstname varchar(255), 
    lastname varchar(255), 
    username varchar(255) unique, 
    password varchar(255)
);

USE gympages;

CREATE TABLE gyms (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location POINT NOT NULL,
    street_address VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    zip int NOT NULL, 
    state VARCHAR(2)
);
    
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
	pass_hash VARCHAR(255) NOT NULL,
    gym_member INT,
    FOREIGN KEY (gym_member) REFERENCES gyms(id) ON DELETE SET NULL
);
    
CREATE TABLE equipment (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE gym_equipment (
	gym_id INT NOT NULL, 
    equipment_id INT NOT NULL,
    PRIMARY KEY (gym_id, equipment_id), 
    FOREIGN KEY (gym_id) REFERENCES gym(id), 
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

CREATE TABLE friends (
	user1_id INT NOT NULL,
    user2_id INT NOT NULL, 
    status ENUM('pending', 'accepted', 'denied') DEFAULT 'pending',
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);
    