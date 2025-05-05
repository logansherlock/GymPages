CREATE TABLE comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  comment_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id)
);

CREATE TABLE equipment (
  equipment_id INT NOT NULL AUTO_INCREMENT,
  equipment_name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (equipment_id)
);

CREATE TABLE exercises (
  exercise_id VARCHAR(255) NOT NULL,
  exercise_name VARCHAR(255) NOT NULL,
  motion VARCHAR(10) DEFAULT NULL,
  level VARCHAR(20) DEFAULT NULL,
  mechanic VARCHAR(20) DEFAULT NULL,
  related_equip_id INT DEFAULT NULL,
  muscle_group VARCHAR(50) DEFAULT NULL,
  body TEXT,
  video_link VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (exercise_id),
  FOREIGN KEY (related_equip_id) REFERENCES equipment (equipment_id)
);

CREATE TABLE friends (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'denied') DEFAULT 'pending',
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE gym_equipment (
  gym_id VARCHAR(255) NOT NULL,
  equipment_id INT NOT NULL,
  PRIMARY KEY (gym_id, equipment_id),
  FOREIGN KEY (gym_id) REFERENCES gyms (gym_id) ON DELETE CASCADE,
  FOREIGN KEY (equipment_id) REFERENCES equipment (equipment_id) ON DELETE CASCADE
);

CREATE TABLE gyms (
  gym_id VARCHAR(255) NOT NULL,
  gym_name VARCHAR(255) NOT NULL,
  location POINT NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  zip INT NOT NULL,
  state VARCHAR(2) NOT NULL,
  phone_number VARCHAR(14) DEFAULT NULL,
  PRIMARY KEY (gym_id)
);

CREATE TABLE posts (
  post_id INT NOT NULL AUTO_INCREMENT,
  gym_id VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  body TEXT NOT NULL,
  photo_ref VARCHAR(255) DEFAULT NULL,
  likes INT NOT NULL DEFAULT 0,
  post_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id),
  FOREIGN KEY (gym_id) REFERENCES gyms (gym_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE profiles (
  user_id INT NOT NULL,
  visibility ENUM('public', 'private') DEFAULT 'public',
  max_bench INT DEFAULT NULL,
  max_squat INT DEFAULT NULL,
  max_dead INT DEFAULT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  gym_id VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL,
  body TEXT,
  photo_ref VARCHAR(255) DEFAULT NULL,
  review_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (review_id),
  FOREIGN KEY (gym_id) REFERENCES gyms (gym_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  pass_hash VARCHAR(255) NOT NULL,
  gym_member VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (gym_member) REFERENCES gyms (gym_id) ON DELETE SET NULL
);

DELIMITER //

CREATE TRIGGER my_trigger
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  -- semicolons inside the body are fine now
  INSERT INTO profiles (user_id) VALUES (NEW.user_id);
END;
//

DELIMITER ;