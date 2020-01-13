DROP PROCEDURE IF EXISTS create_one_ticket;
DROP PROCEDURE IF EXISTS update_one_ticket;
DROP PROCEDURE IF EXISTS select_one_ticket_byId;
DROP PROCEDURE IF EXISTS get_all_ticket;
DROP PROCEDURE IF EXISTS delete_one_ticket;


CREATE PROCEDURE create_one_ticket(IN title_in VARCHAR(50), IN info_in longtext, IN price_in INT, IN count_in INT, IN event_in INT)
BEGIN
insert into ticket ( title, info, price, count, event) values (title_in, info_in, price_in, count_in, event_in);
END;



CREATE PROCEDURE update_one_ticket(IN title_in VARCHAR(50), IN info_in longtext, IN price_in integer, IN count_in integer, IN ticket_id_in integer)
BEGIN
UPDATE ticket set title = title_in, info = info_in, price = price_in, count = count_in WHERE ticket_id = ticket_id_in;

END;


CREATE PROCEDURE select_one_ticket_byId(IN ticket_id_in INT)
BEGIN
SELECT * FROM ticket WHERE ticket_id = ticket_id_in;
END;



CREATE PROCEDURE get_all_ticket(IN event_id_in INT)
BEGIN
SELECT t.ticket_id as ticket_id, t.title as title, t.info as info, t.price as price, t.count as count, t.event as event FROM ticket t INNER JOIN event e on t.ticket_id = e.event_id WHERE t.event = event_id_in;
END;


CREATE PROCEDURE delete_one_ticket(IN ticket_id_in INT)
BEGIN
DELETE FROM ticket WHERE ticket_id = ticket_id_in;
END;
