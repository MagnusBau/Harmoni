/**
    Delete all procedures for recreation
 */

DROP PROCEDURE IF EXISTS get_all_event;
DROP PROCEDURE IF EXISTS get_event_by_id;

/**
    Fetch all event

    Issued by: getAllEvent()

 */


 CREATE PROCEDURE get_all_event()
 BEGIN
     SELECT event_id, title, description, location, DATE_FORMAT(start_time, '%a %e.%m.%Y %H:%i') as start_time, DATE_FORMAT(end_time, '%a %e.%m.%Y %H:%i') as end_time, category, capacity, organizer FROM event;
 END;

/**
    Fetch event by id

    IN event_id_int: Id of the event

    Issued by: getEventById(id: number)
 */

CREATE PROCEDURE get_event_by_id(IN event_id_int INT)
BEGIN
    SELECT event_id, title, description, location, DATE_FORMAT(start_time, '%a %e.%m.%Y %H:%i') as start_time, DATE_FORMAT(end_time, '%a %e.%m.%Y %H:%i') as end_time, category, capacity, organizer FROM event
    WHERE event_id = event_id_int;
END;