SET FOREIGN_KEY_CHECKS=0;
DELETE FROM event_equipment;
DELETE FROM equipment;
DELETE FROM event;
DELETE FROM user;
DELETE FROM contact;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO contact(contact_id, first_name, last_name, email, phone) VALUES(default, 'Mario', 'Bros', 'its@me', '01001010');
INSERT INTO user(user_id, username, password, image, contact) VALUES(DEFAULT, 'Mario', '$2a$10$58.k1W9JZcldkAaL8RHYx.xBcg7CCFFLUej4BXTxlVYgMHAOQz.2C', '', 1);
INSERT INTO contact(contact_id, first_name, last_name, email, phone) VALUES(default, 'cheez', 'Doodles', 'doodle@cheez', '01001010');
INSERT INTO user(user_id, username, password, image, contact) VALUES(DEFAULT, 'cheezDoodles', '$2a$10$58.k1W9JZcldkAaL8RHYx.xBcg7CCFFLUej4BXTxlVYgMHAOQz.2C', '', 2);

INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('EM Håndball', 'EM i håndball 2020', 'Trondheim Spektrum', NOW(), NOW(), 'Sport', 7000, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('Konsert', 'Konstertbeskrivelse', 'Samfundet', NOW(), NOW(), 'Kategori', 200, 1, 0);

INSERT INTO equipment (item, organizer)
VALUES ('Trommesett',1);
INSERT INTO equipment (item, organizer)
VALUES ('Gitarforsterker',1);
INSERT INTO equipment (item, organizer)
VALUES ('Bassforsterker',1);
INSERT INTO equipment (item, organizer)
VALUES ('XLR-kabel', 1);

INSERT INTO event_equipment (event, equipment, amount)
VALUES (1, 1, 1);
INSERT INTO event_equipment (event, equipment, amount)
VALUES (1, 2, 2);
INSERT INTO event_equipment (event, equipment, amount)
VALUES (1, 3, 1);
INSERT INTO event_equipment (event, equipment, amount)
VALUES (1, 4, 4);
INSERT INTO event_equipment (event, equipment, amount)
VALUES (2, 4, 8);

INSERT INTO document (document_id, name, file, event)
VALUES (DEFAULT, 'thrud', 'thrud', 1);
INSERT INTO document (document_id, name, file, event)
VALUES (DEFAULT, 'faor', 'faor', 1);

INSERT INTO rider (description, document)
VALUES ('Mathias må ha tre kameler og syv geiter', 2);
INSERT INTO rider (description, document)
VALUES ('Mathias må ha en full size yobama statue', 2);
INSERT INTO rider (description, document)
VALUES ('Mathias har problemer, han trenger hjelp', 2);
INSERT INTO rider (description, document)
VALUES ('Magnus trenger ikke noe, han er ikke kravstor', 1);