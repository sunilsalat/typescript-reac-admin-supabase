CREATE OR REPLACE FUNCTION update_resources_media_deleted_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE resources_media
  SET deleted_at = NEW.deleted_at
  WHERE media_id = OLD.id;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER media_deleted_at_trigger
AFTER UPDATE OF deleted_at
ON media
FOR EACH ROW
WHEN (OLD.deleted_at IS DISTINCT FROM NEW.deleted_at)
EXECUTE FUNCTION update_resources_media_deleted_at();
