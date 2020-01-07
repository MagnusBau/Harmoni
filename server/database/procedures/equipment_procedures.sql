/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS get_all_equipment;
DROP PROCEDURE IF EXISTS get_equipment_by_id;
DROP PROCEDURE IF EXISTS get_equipment_by_name;

/**
  Fetches all equipment

  Issued by: N/A
 */
DELIMITER //

CREATE PROCEDURE get_all_equipment()
BEGIN
  SELECT equipment_id, item FROM equipment;
END //

DELIMITER ;

/**
  Fetches equipment based on an id

  IN equipment_id_in: Id of the equipment

  Issued by: N/A
 */

DELIMITER //

CREATE PROCEDURE get_equipment_by_id(IN equipment_id_in INT)
BEGIN
  SELECT equipment_id, item FROM equipment WHERE equipment_id=equipment_id_in;
END //

DELIMITER ;

/**
  Fetches equipment based on name search

  IN equipment_name_in: Name of the equipment

  Issued by: N/A
 */

DELIMITER //

CREATE PROCEDURE get_equipment_by_name(IN equipment_name_in VARCHAR(50))
BEGIN
  SELECT equipment_id, item FROM equipment WHERE item LIKE CONCAT('%', equipment_name_in, '%');
END //

DELIMITER ;

