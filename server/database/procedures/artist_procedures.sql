/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS insert_artist;
DROP PROCEDURE IF EXISTS update_artist;
DROP PROCEDURE IF EXISTS delete_artist;
DROP PROCEDURE IF EXISTS get_all_artists;
DROP PROCEDURE IF EXISTS get_artist_by_id;
DROP PROCEDURE IF EXISTS get_artist_by_query;
DROP PROCEDURE IF EXISTS get_artist_by_search;
DROP PROCEDURE IF EXISTS get_artist_by_event;
DROP PROCEDURE IF EXISTS add_artist_to_event;
DROP PROCEDURE IF EXISTS remove_artist_from_event;

/**
  Inserts a new newArtist with contact information

  IN artist_name_in: Name of the newArtist
  IN first_name_in: First name of newArtist contact
  IN last_name_in: Last name of newArtist contact
  IN email_in: Email of newArtist contact
  IN phone: Phone number of newArtist contact
  OUT result_out: 0 if successful, -1 if newArtist already exists

  Issued by: insertArtist(artistName: string, firstName: string, lastName: string, email: string, phone: string)
 */
CREATE PROCEDURE insert_artist(IN artist_name_in VARCHAR(50), IN first_name_in VARCHAR(50), last_name_in VARCHAR(50),
                               IN email_in VARCHAR(50), IN phone_in VARCHAR(50), OUT artist_id INT)
proc_label:
BEGIN
  DECLARE contact_id_in INT;
  SET contact_id_in = (SELECT contact_id
                       FROM contact
                       WHERE first_name = first_name_in
                         AND last_name = last_name_in
                         AND phone = phone_in
                         AND email = email_in
                       LIMIT 1);
  IF (contact_id_in IS NOT NULL AND artist_name_in IN (SELECT artist_name FROM artist)) THEN
    SET artist_id = (SELECT a.artist_id
                     FROM artist a
                            JOIN contact c on a.contact = c.contact_id
                     WHERE a.artist_name = artist_name_in
                       AND c.first_name = first_name_in
                       AND c.last_name = last_name_in
                       AND email = email_in
                       AND phone = phone_in
                     LIMIT 1);
  ELSE
    IF (contact_id_in IS NULL) THEN
      INSERT INTO contact (first_name, last_name, email, phone)
      VALUES (first_name_in, last_name_in, email_in, phone_in);
      SET contact_id_in = LAST_INSERT_ID();
    END IF;

    INSERT INTO artist(artist_name, contact)
    VALUES (artist_name_in, contact_id_in);
    SET artist_id = LAST_INSERT_ID();
  END IF;
END;

/**
  Updates an existing newArtist

  IN artist_id_in: Id of the newArtist
  IN artist_name_in: Name of the newArtist
  IN first_name_in: First name of newArtist contact
  IN last_name_in: Last name of newArtist contact
  IN email_in: Email of newArtist contact
  IN phone: Phone number of newArtist contact

  Issued by: insertArtist(artistName: string, firstName: string, lastName: string, email: string, phone: string)
 */
CREATE PROCEDURE update_artist(IN artist_id_in INT, IN artist_name_in VARCHAR(50), IN first_name_in VARCHAR(50),
                               last_name_in VARCHAR(50), IN email_in VARCHAR(50), IN phone_in VARCHAR(50))
BEGIN
  DECLARE contact_id_in INT;
  IF ((SELECT contact_id_in = contact_id
       FROM contact
       WHERE first_name = first_name_in
         AND last_name = last_name_in
       LIMIT 1) IS NOT NULL) THEN
    UPDATE contact
    SET first_name=first_name_in,
        last_name=last_name_in,
        email=email_in,
        phone=phone_in
    WHERE first_name = first_name_in
      AND last_name = last_name_in;
  ELSE
    INSERT INTO contact (first_name, last_name, email, phone)
    VALUES (first_name_in, last_name_in, email_in, phone_in);
    SET contact_id_in = LAST_INSERT_ID();
  END IF;

  UPDATE artist
  SET artist_name=artist_name_in,
      contact=contact_id_in
  WHERE artist_id = artist_id_in;
END;

/**
  Deletes an existing newArtist

  IN artist_id_in: Id of the newArtist
  OUT result_out: 0 if successful, -1 if newArtist can't be deleted

  Issued by: deleteArtist(artistId: number)
 */
CREATE PROCEDURE delete_artist(IN artist_id_in INT)
BEGIN
  IF (artist_id_in NOT IN (SELECT artist FROM contract)) THEN
    DELETE FROM artist WHERE artist_id = artist_id_in;
  ELSE
    CALL raise(2002, 'Artist kan ikke slettes grunnet eksisterende tilknyttede dokumenter.');
  END IF;
END;

/**
  Get all artists from the database

  Issued by: getAllArtists()
 */
CREATE PROCEDURE get_all_artists()
BEGIN
  SELECT a.artist_id, a.artist_name, c.contact_id, c.first_name, c.last_name, c.email, c.phone
  FROM artist a
         JOIN contact c ON a.contact = c.contact_id;
END;

/**
  Get one newArtist from an id

  Issued by: getAllArtists()
 */
CREATE PROCEDURE get_artist_by_id(IN artist_id_in INT)
BEGIN
  SELECT a.artist_id, a.artist_name, c.contact_id, c.first_name, c.last_name, c.email, c.phone
  FROM artist a
         JOIN contact c ON a.contact = c.contact_id
  WHERE a.artist_id = artist_id_in;
END;

/**
  Get artist from contact_id

  Issued by: getArtistByContact(contactId: number)
 */
CREATE PROCEDURE get_artist_by_contact(IN contact_id_in INT)
BEGIN
  SELECT artist_id, artist_name
  FROM artist
  WHERE contact = contact_id_in;
END;

/**
  Get one newArtist from an id

  Issued by: getAllArtists()
 */
CREATE PROCEDURE get_artist_by_query(IN artist_name_in VARCHAR(50), IN first_name_in VARCHAR(50),
                                     last_name_in VARCHAR(50),
                                     IN email_in VARCHAR(50), IN phone_in VARCHAR(50))
BEGIN
  SELECT a.artist_id, a.artist_name, c.contact_id, c.first_name, c.last_name, c.email, c.phone
  FROM artist a
         JOIN contact c ON a.contact = c.contact_id
  WHERE (artist_name_in IS NULL OR a.artist_name LIKE CONCAT('%', artist_name_in, '%'))
    AND (first_name_in IS NULL OR c.first_name LIKE CONCAT('%', first_name_in, '%'))
    AND (last_name_in IS NULL OR c.last_name LIKE CONCAT('%', last_name_in, '%'))
    AND (email_in IS NULL OR c.email LIKE CONCAT('%', email_in, '%'))
    AND (phone_in IS NULL OR c.phone LIKE CONCAT('%', phone_in, '%'));
END;

/**
  Get one newArtist from an id

  Issued by: getAllArtists()
 */
CREATE PROCEDURE get_artist_by_search(IN search_string VARCHAR(100))
BEGIN
  SELECT a.artist_id, a.artist_name, c.contact_id, c.first_name, c.last_name, c.email, c.phone
  FROM artist a
         JOIN contact c ON a.contact = c.contact_id
  WHERE artist_name LIKE CONCAT('%', search_string, '%')
     OR first_name LIKE CONCAT('%', search_string, '%')
     OR last_name LIKE CONCAT('%', search_string, '%')
     OR email LIKE CONCAT('%', search_string, '%')
     OR phone LIKE CONCAT('%', search_string, '%');
END;

CREATE PROCEDURE add_artist_to_event(IN artist_name_in VARCHAR(50), IN first_name_in VARCHAR(50),
                                     IN last_name_in VARCHAR(50), IN email_in VARCHAR(50), IN phone_in VARCHAR(12),
                                     IN document_id_in INT)
BEGIN
  DECLARE artist_id_in INT;
  CALL insert_artist(artist_name_in, first_name_in, last_name_in, email_in, phone_in, artist_id_in);

  INSERT INTO contract (artist, document)
  VALUES (artist_id_in, document_id_in);
END;

CREATE PROCEDURE get_artist_by_event(IN event_id_in INT)
BEGIN
  SELECT a.artist_id, a.artist_name, c.contact_id, c.first_name, c.last_name, c.email, c.phone
  FROM artist a
         JOIN contact c ON a.contact = c.contact_id
         JOIN contract cr ON a.artist_id = cr.artist
         JOIN document d ON d.document_id = cr.document
  WHERE d.event = event_id_in;
END;

CREATE PROCEDURE remove_artist_from_event(IN event_id_in INT, IN artist_id_in INT)
BEGIN
  DELETE
  FROM contract
  WHERE document IN (SELECT document_id FROM document WHERE event_id_in = event)
    AND artist_id_in = artist;
END;