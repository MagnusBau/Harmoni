/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS get_cancelled_events;
DROP PROCEDURE IF EXISTS cancel_event_by_id;

/**

  Fetch cancelled events

  Issued by: getCanceledEvents()
 */

CREATE PROCEDURE get_cancelled_events()
BEGIN
    SELECT * FROM event WHERE cancelled=1;
END;

/**
  Cancels event based on an id

  IN event_id_in: Id of the event

  Issued by: cancelEvent(eventId: number)
 */

CREATE PROCEDURE cancel_event_by_id(IN event_id_in INT)
BEGIN
  UPDATE event SET cancelled = 1 WHERE event_id=event_id_in;
END;


CREATE PROCEDURE get_frontpage_events()
BEGIN
    SELECT event_id, title, location, DATE_FORMAT(start_time, '%a %e.%m.%Y %H:%i') as start_time,
           DATE_FORMAT(end_time, '%a %e.%m.%Y %H:%i') as end_time, category, capacity, organizer FROM event;
END;