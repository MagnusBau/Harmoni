SET FOREIGN_KEY_CHECKS=0;
DELETE FROM event_equipment;
DELETE FROM equipment;
DELETE FROM event;
DELETE FROM user;
DELETE FROM contact;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO contact(first_name, last_name, email, phone)
VALUES ('Victoria', 'Blichfeldt', 'victorbl@stud.ntnu.no', '90164428');

INSERT INTO user (username, password, contact)
VALUES ('victoria', 'victoria', 1);

INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('EM Håndball', 'EM i håndball 2020', 'Trondheim Spektrum', NOW(), NOW(), 'Sport', 7000, 1, 0);
INSERT INTO event (title, description, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES ('Konsert', 'Konstertbeskrivelse', 'Samfundet', NOW(), NOW(), 'Kategori', 200, 1, 0);
