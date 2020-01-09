DROP PROCEDURE IF EXISTS get_all_roles;
DROP PROCEDURE IF EXISTS get_staff_in_event;
DROP PROCEDURE IF EXISTS set_role;
DROP PROCEDURE IF EXISTS assign_to_event;
DROP PROCEDURE IF EXISTS remove_from_event;
DROP PROCEDURE IF EXISTS remove_role;
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
    INSERT INTO role(type, event) VALUES (type_in, event_id_in);
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
/**
  Removes role from list
 */
DELIMITER //

CREATE PROCEDURE remove_role(IN role_id_in INT)
BEGIN
    DELETE FROM role WHERE role_id = role_id_in;
END //

DELIMITER ;