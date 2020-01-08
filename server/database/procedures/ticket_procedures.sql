
/*
 create a ticket type
 */

DELIMITER //

CREATE PROCEDURE create_one_ticket(IN tile_in VARCHAR(50), IN info_in varchar(250), IN price_in integer, IN count_in integer)
BEGIN
insert into ticket ( ticket_id ,title, info, price, count) value (default, title = tile_in, info = info_in, price = price_in, count = count_in);
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE select_one_ticket_byId(IN ticket_id_in INT)
BEGIN
   SELECT * FROM ticket WHERE ticket_id = ticket_id_in;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE get_all_ticket()
BEGIN
    SELECT title FROM ticket;
END //

DELIMITER ;



