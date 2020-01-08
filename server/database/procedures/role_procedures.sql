/**
  returns all staff-types
 */
DELIMITER //

CREATE PROCEDURE get_all_roles()
BEGIN
    SELECT role_id, type FROM role;
END //

DELIMITER ;
/**
  Returns staff currently assigned to event
 */
DELIMITER //

CREATE PROCEDURE get_staff_in_event(IN event_id_in INT)
BEGIN
    SELECT role_id, type, event FROM role WHERE event=event_id_in;
END //

DELIMITER ;
/**
  Sets staff role
 */
DELIMITER //

CREATE PROCEDURE set_role(IN type_in VARCHAR(50), IN event_id_in INT)
BEGIN
    INSERT INTO role(role_id, type, event) VALUES (DEFAULT, ?, ?);
END //

DELIMITER ;
/**
  Assigns staff to event
 */
DELIMITER //

CREATE PROCEDURE assign_to_event(IN role_id_in INT, IN event_in INT)
BEGIN
    UPDATE role SET event = event_in WHERE role_id = role_id_in;
END //

DELIMITER ;
/**
  Removes staff from event
 */
DELIMITER //

CREATE PROCEDURE remove_from_event(IN role_id_in INT, IN event_id_in INT)
BEGIN
    UPDATE role SET event = NULL WHERE role_id = role_id_in AND event = event_id_in;
END //

DELIMITER ;