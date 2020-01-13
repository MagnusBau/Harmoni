/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS post_contact;
DROP PROCEDURE IF EXISTS post_user;
DROP PROCEDURE IF EXISTS get_username;
DROP PROCEDURE IF EXISTS get_password;
DROP PROCEDURE IF EXISTS get_user;
DROP PROCEDURE IF EXISTS check_username;

/**
  Inserts a new contact

  IN email_in: the contacts email
  In first_name_in: the contacts first name
  IN last_name_in: the contacts last name
  In phone_in: the contacts phone number

  Issued by: postContact(data: Object)
 */


CREATE PROCEDURE post_contact(IN email_in VARCHAR(50), IN first_name_in VARCHAR(50), IN last_name_in VARCHAR(50), IN phone_in VARCHAR(12))
BEGIN
    INSERT INTO contact(email, first_name, last_name, phone)
    VALUES (email_in, first_name_in, last_name_in, phone_in);
END;


/**
  Inserts a new user

  IN username_in: the users username
  IN password_in: the users hashed password
  IN contact_id_in: id to the users contact information

  Issued by: postUser(data: Object)
 */



CREATE PROCEDURE post_user(IN username_in VARCHAR(50), IN password_in VARCHAR(256), IN contact_id_in int(11))
BEGIN
    INSERT INTO user(username, password, contact)
    VALUES(username_in, password_in, contact_id_in);
END;


/**
  Fetches username based on an id

  IN user_id_in: Id of the user

  Issued by: getUsername(userId: number)
 */

CREATE PROCEDURE get_username(IN user_id_in INT(11))
BEGIN
    SELECT username FROM user WHERE user_id=user_id_in;
END;

/**
  Fetches count of a username in the user table

  IN username_in: username being counted

  Issued by: checkUsername(username: string)
 */


CREATE PROCEDURE check_username(IN username_in VARCHAR(50))
BEGIN
    SELECT COUNT(*) AS count FROM user WHERE username=username_in;
END;

/**
  Fetches hashed password based on username

  IN username_in: username of the user

  Issued by: getPassword(username: string)
 */

CREATE PROCEDURE get_password(IN username_in VARCHAR(50))
BEGIN
    SELECT password FROM user WHERE username=username_in;
END;

/**
  Fetches a user based on username

  IN username_in: username of the user

  Issued by: getUser(username: string)
 */

CREATE PROCEDURE get_user(IN username_in VARCHAR(50))
BEGIN
    SELECT * FROM user RIGHT JOIN contact ON user.contact = contact.contact_id
    WHERE user.username=username_in;
END;