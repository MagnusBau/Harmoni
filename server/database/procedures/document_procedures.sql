/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS get_document_by_id;
DROP PROCEDURE IF EXISTS get_document_by_event;
DROP PROCEDURE IF EXISTS check_document_name;
DROP PROCEDURE IF EXISTS delete_document;
/**
  Fetches one document based on an document_id

  IN document_id_in: Id of the document

  Issued by: getFileById(document_id: number)
 */

CREATE PROCEDURE get_document_by_id(IN document_id_in INT)
BEGIN
  SELECT * FROM document
  WHERE document_id = document_id_in;
END;

/**
  Fetches documents based on an event_id

  IN event_id_in: Id of the event

  Issued by: getFileByEvent(event: number)
 */

CREATE PROCEDURE get_document_by_event(IN event_id_in INT)
BEGIN
  SELECT document_id, name, path FROM document
  WHERE event = event_id_in;
END;

/**
  Fetches count of rows with name = file_name_in

  IN event_id_in: Id of the event
  IN file_name_in: document name we want to check

  Issued by: checkFileName(eventId: number, fileName: string)
 */

CREATE PROCEDURE check_document_name(IN event_id_in INT(11), IN file_name_in VARCHAR(100))
BEGIN
    SELECT EXISTS(SELECT * FROM document
    where name = file_name_in AND event = event_id_in) as duplicate;
END;

/**
  Deletes a document

  IN path_in: path of the file

  Issued by: deleteFileInfo(path: string)
 */
CREATE PROCEDURE delete_document(IN path_in VARCHAR(500))
BEGIN
    /*IF ((SELECT COUNT(*) FROM contract c LEFT JOIN document d on d.document_id = c.document WHERE d.path=path_in) > 0) THEN
      CALL raise(2000, 'Document cannot be deleted because of an existing contract bound to this.');
    END IF;*/
    DELETE FROM document WHERE path = path_in;
END;