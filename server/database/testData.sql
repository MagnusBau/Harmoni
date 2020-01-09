DELETE FROM event_equipment;
DELETE FROM equipment;
DELETE FROM event;
DELETE FROM user;
DELETE FROM contact;

INSERT INTO contact(first_name, email)
VALUES ('Eirik', 'eirikhem@stud.ntnu.no');

INSERT INTO user (username, password, contact)
VALUES ('eirik', 'eirik', 1);

INSERT INTO event (title, description, location, start_time, end_time, capacity, organizer, cancelled)
VALUES ('Salg av bukser', 'I dag selger jeg mine bukser velkommen', 'Her', NOW(), NOW(), 12, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, capacity, organizer, cancelled)
VALUES ('Salg av laken', 'I dag selger jeg mine laken velkommen', 'Der', NOW(), NOW(), 120, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, capacity, organizer, cancelled)
VALUES ('Salg av sofaputer', 'I dag selger jeg mine sofaputer velkommen', 'Overalt', NOW(), NOW(), 1189, 1, 0);

INSERT INTO equipment (item)
VALUES ('Trommesett');
INSERT INTO equipment (item)
VALUES ('Gitarforsterker');
INSERT INTO equipment (item)
VALUES ('Bassforsterker');
INSERT INTO equipment (item)
VALUES ('XLR-kabel');

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
