SET FOREIGN_KEY_CHECKS=0;
DELETE FROM event_equipment;
DELETE FROM equipment;
DELETE FROM event;
DELETE FROM user;
DELETE FROM contact;
DELETE FROM document;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO contact(contact_id, first_name, last_name, email, phone)
VALUES(default, 'Mario', 'Bros', 'its@me', '01001010');
INSERT INTO user(user_id, username, password, image, contact)
VALUES(DEFAULT, 'Mario', '$2a$10$58.k1W9JZcldkAaL8RHYx.xBcg7CCFFLUej4BXTxlVYgMHAOQz.2C', '', 1);
INSERT INTO contact(contact_id, first_name, last_name, email, phone)
VALUES(default, 'cheez', 'Doodles', 'doodle@cheez', '01001010');
INSERT INTO user(user_id, username, password, image, contact)
VALUES(DEFAULT, 'cheezDoodles', '$2a$10$58.k1W9JZcldkAaL8RHYx.xBcg7CCFFLUej4BXTxlVYgMHAOQz.2C', '', 2);
INSERT INTO contact (first_name, last_name, email, phone)
VALUES ('Mia', 'Fornes', 'mia@test.com', 12345678);
INSERT INTO user (username, password, image, contact)
VALUES ('miafornes', 'passord', 'bilde', 1);

INSERT INTO contact(first_name, last_name, email, phone)
VALUES ('Geir', 'Lippestad', 'geir@lips.no', '12345678');
INSERT INTO artist(artist_name, contact)
VALUES ('Geir Lippestad', 4);
INSERT INTO artist(artist_name, contact)
VALUES ('Svein Blipp', 3);

INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('EM Håndball', 'EM i håndball 2020', 'Trondheim Spektrum', NOW(), NOW(), 'Sport', 7000, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('Konsert', 'Konsertbeskrivelse', 'Samfundet', NOW(), NOW(), 'Kategori', 200, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('Konsert m/ ballonger', 'Konsertbeskrivelse', 'Trondheim', NOW(), NOW(), 'Kategori', 200, 3, 1);

INSERT INTO role (role_id, type, event) VALUES (DEFAULT, 'Bartender', 1);
INSERT INTO role (role_id, type, event) VALUES (DEFAULT, 'Lydtekniker', 1);
INSERT INTO role (role_id, type, event) VALUES (DEFAULT, 'Dorvakt', 1);
INSERT INTO event_role (role, event, count) VALUES (1, 1, 2);
INSERT INTO event_role (role, event, count) VALUES (2, 1, 1);
INSERT INTO event_role (role, event, count) VALUES (3, 1, 3);