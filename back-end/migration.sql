CREATE TABLE goals(
    id serial PRIMARY KEY,
    name varchar(30),
    title varchar(50),
    body text
);

INSERT INTO goals (name, title, body) VALUES ('George Washington', 'Revolution', 'We need to free ourselves.');
INSERT INTO goals (name, title, body) VALUES ('George Washington', 'Exercise', 'Walk a mile');
INSERT INTO goals (name, title, body) VALUES ('George Washington', 'Clean', 'Apt is disgusting');
INSERT INTO goals (name, title, body) VALUES ('George Washington', 'Take dog out', 'Take dog out for a walk');
INSERT INTO goals (name, title, body) VALUES ('George Washington', 'Shower', 'I am dirty');