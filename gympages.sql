USE gympages;

DROP TABLE IF EXISTS user_history;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS gym_equipment;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS gyms;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS exercises;

CREATE TABLE gyms (
	gym_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gym_name VARCHAR(255) NOT NULL,
    location POINT NOT NULL,
    street_address VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    zip int NOT NULL, 
    state VARCHAR(2)
);
    
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
	pass_hash VARCHAR(255) NOT NULL,
    gym_member INT NULL,
    FOREIGN KEY (gym_member) REFERENCES gyms(gym_id) ON DELETE SET NULL
);
    
CREATE TABLE equipment (
	equipment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(255) NOT NULL,
    description TEXT NULL
);

CREATE TABLE gym_equipment (
	gym_id INT NOT NULL, 
    equipment_id INT NOT NULL,
    PRIMARY KEY (gym_id, equipment_id), 
    FOREIGN KEY (gym_id) REFERENCES gyms(gym_id) ON DELETE CASCADE, 
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id) ON DELETE CASCADE
);

CREATE TABLE friends (
	user1_id INT NOT NULL,
    user2_id INT NOT NULL, 
    status ENUM('pending', 'accepted', 'denied') DEFAULT 'pending',
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE posts (
	post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gym_id INT NOT NULL, 
    user_id INT NOT NULL,
    body TEXT NOT NULL,
    photo_ref VARCHAR(255) NULL, 
    FOREIGN KEY (gym_id) REFERENCES gyms(gym_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE profiles (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    visibility ENUM('public', 'private') DEFAULT 'public',
    max_bench INT NULL, 
    max_squat INT NULL,
    max_dead INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE user_history (
	user_id INT NOT NULL,
    post_id INT NOT NULL, 
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE exercises (
	exercise_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL,
    video_link VARCHAR(255) NULL
);

CREATE TABLE reviews (
	review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    gym_id INT NOT NULL,
    user_id INT NOT NULL, 
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL, 
    body TEXT NULL, 
    photo_ref VARCHAR(255) NULL,
    FOREIGN KEY (gym_id) REFERENCES gyms(gym_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);