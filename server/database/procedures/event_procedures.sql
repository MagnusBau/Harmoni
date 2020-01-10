/**
    Delete all procedures for recreation
 */

 DROP PROCEDURE IF EXISTS get_all_event;

/**
    Fetch all event

    Issued by: getAllEvent()

 */


 CREATE PROCEDURE get_all_event()
 BEGIN
     SELECT event_id, title, description, location, DATE_FORMAT(start_time, "%a %e.%m.%Y %H:%i") as start_time, DATE_FORMAT(end_time, "%a %e.%m.%Y %H:%i") as end_time, category, capacity, organizer FROM event;
 END