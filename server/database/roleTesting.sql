INSERT INTO event(event_id, title, location, start_time, end_time, category, capacity, organizer, cancelled)
VALUES (DEFAULT, 'roletest', 'urmom', '1212-12-12', '2121-11-21', 'test', '4', 1, false);
INSERT INTO role(role_id, type, event) VALUES (DEFAULT, 'a', 1);
INSERT INTO role(role_id, type, event) VALUES (DEFAULT, 'b', 1);