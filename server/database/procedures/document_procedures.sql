/**
  Delete all procedures for recreation
 */
DROP PROCEDURE IF EXISTS get_document_by_id;
DROP PROCEDURE IF EXISTS get_document_by_event;

/**
  Fetches one document based on an document_id

  IN document_id_in: Id of the document

  Issued by: getFileById(document_id: number)
 */

CREATE PROCEDURE get_document_by_event(IN document_id_in INT)
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
  SELECT document_id, name FROM document
  WHERE event = event_id_in;
END;