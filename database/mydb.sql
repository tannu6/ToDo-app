CREATE DATABASE todo;
USE todo;
CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(300),
    status VARCHAR(300),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tasks(title,status) VALUES ('have to do my internship search','todo'),('learn next.js','inprogress'),('learn react','done');