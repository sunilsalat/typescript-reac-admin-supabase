CREATE OR REPLACE FUNCTION handle_featured_property()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE featured_properties
  SET deleted_at = CURRENT_TIMESTAMP
  WHERE property_type = NEW.property_type
    AND deleted_at IS NULL AND id <> NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_featured_property
BEFORE INSERT ON featured_properties
FOR EACH ROW
EXECUTE FUNCTION handle_featured_property();
