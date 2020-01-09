/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS get_event_by_id;
DROP PROCEDURE IF EXISTS get_event_by_name;
DROP PROCEDURE IF EXISTS get_all_events;

 /**
   Fetch event by ID
  */
DELIMITER //

CREATE PROCEDURE get_event_by_id(IN event_id_in int)
BEGIN
    SELECT * FROM event where event_id = event_id_in;
end //

DELIMITER ;

/**
  Get event by name
 */

DELIMITER //

CREATE PROCEDURE get_event_by_name(IN event_name_in VARCHAR(100))
BEGIN
    SELECT * from event where title like CONCAT('%', event_name_in, '%');
end //

DELIMITER ;

/**
  get all event by
 */

DELIMITER //

CREATE PROCEDURE get_all_events()
BEGIN
    SELECT * from event;
end //

DELIMITER ;

/**
  get events by month
 */

DELIMITER //

CREATE PROCEDURE get_event_by_month(IN event_month_in int)
BEGIN
    SELECT * from event where MONTH(start_time) = event_month_in;
end //

DELIMITER ;

/**
  insert a new event in table
 */

 DELIMITER //

 CREATE PROCEDURE create_event(IN event_title_in VARCHAR(50), event_description_in VARCHAR(500), event_location_in VARCHAR(100), event_start_time_in DATETIME, event_end_time_in DATETIME, event_category_in VARCHAR(50), event_capacity_in int, event_organizer_in int)
BEGIN
    INSERT INTO event VALUES (DEFAULT, event_title_in, event_description_in, event_location_in, event_start_time_in, event_end_time_in, event_category_in, event_capacity_in, event_organizer_in, DEFAULT);
end //