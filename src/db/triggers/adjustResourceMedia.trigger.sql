CREATE OR REPLACE FUNCTION adjust_positions()
RETURNS TRIGGER AS $$
BEGIN
    -- On INSERT
    IF (TG_OP = 'INSERT') THEN
        -- Increment the position of existing rows with the same entity_type, entity_id, media_type
        UPDATE resources_media
        SET "position" = "position" + 1
        WHERE entity_type = NEW.entity_type
          AND entity_id = NEW.entity_id
          AND media_type = NEW.media_type
          AND "position" >= COALESCE(NEW."position", (SELECT COALESCE(MAX("position"), -1) FROM resources_media WHERE entity_type = NEW.entity_type AND entity_id = NEW.entity_id AND media_type = NEW.media_type));

        RETURN NEW;
    END IF;

    -- On DELETE
    IF (TG_OP = 'DELETE') THEN
        -- Decrement the position of existing rows with the same entity_type, entity_id, media_type
        UPDATE resources_media
        SET "position" = "position" - 1
        WHERE entity_type = OLD.entity_type
          AND entity_id = OLD.entity_id
          AND media_type = OLD.media_type
          AND "position" > OLD."position";

        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER adjust_positions_trigger
AFTER INSERT OR DELETE OR UPDATE ON resources_media
FOR EACH ROW
EXECUTE FUNCTION adjust_positions();


CREATE OR REPLACE FUNCTION reorder_positions_on_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle case where new position is less than old position
  IF NEW.position < OLD.position THEN
    -- Shift positions of rows between the new position and old position up by 1
    UPDATE resources_media
    SET position = position + 1
    WHERE entity_type = NEW.entity_type
      AND entity_id = NEW.entity_id
      AND media_type = NEW.media_type
      AND position >= NEW.position
      AND position < OLD.position;
  -- Handle case where new position is greater than old position
  ELSIF NEW.position > OLD.position THEN
    -- Shift positions of rows between the old position and new position down by 1
    UPDATE resources_media
    SET position = position - 1
    WHERE entity_type = NEW.entity_type
      AND entity_id = NEW.entity_id
      AND media_type = NEW.media_type
      AND position > OLD.position
      AND position <= NEW.position;
  END IF;

  -- Set the new position for the row being updated
  UPDATE resources_media
  SET position = NEW.position
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER reorder_positions_trigger
BEFORE UPDATE ON resources_media
FOR EACH ROW
EXECUTE FUNCTION reorder_positions_on_update();


