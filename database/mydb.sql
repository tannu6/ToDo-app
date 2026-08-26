CREATE DATABASE todo;
USE todo;
CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(),
    status VARCHAR(),created_at TIMESTAMP
);
INSERT INTO tasks(title,status) VALUES ('have to do my internship search','todo'),('learn next.js','inprogress'),('learn react','done');