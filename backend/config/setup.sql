CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20),
  age INT,
  membership_status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS member_scans (
  scan_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT,
  scan_date DATE,
  weight_loss FLOAT,
  fat_loss FLOAT,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_statuses (
  message_id VARCHAR(255) PRIMARY KEY,
  member_id INT NOT NULL,
  status VARCHAR(100) NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);
