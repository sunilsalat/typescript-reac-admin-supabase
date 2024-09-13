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

    -- On UPDATE
    IF (TG_OP = 'UPDATE') THEN
        -- Check if the 'deleted_at' field was set to NULL
        IF (OLD.deleted_at IS NOT NULL AND NEW.deleted_at IS NULL) THEN
            -- This means a previously deleted row is being restored, adjust positions accordingly
            -- Increment the position of existing rows that come after the restored row
            UPDATE resources_media
            SET "position" = "position" + 1
            WHERE entity_type = NEW.entity_type
              AND entity_id = NEW.entity_id
              AND media_type = NEW.media_type
              AND "position" >= NEW."position";

            RETURN NEW;
        END IF;

        -- Check if the 'deleted_at' field was set to NULL and we need to adjust positions
        IF (OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL) THEN
            -- This means a row is being marked as deleted, adjust positions accordingly
            -- Decrement the position of existing rows that come after the deleted row
            UPDATE resources_media
            SET "position" = "position" - 1
            WHERE entity_type = OLD.entity_type
              AND entity_id = OLD.entity_id
              AND media_type = OLD.media_type
              AND "position" > OLD."position";

            RETURN NEW;
        END IF;

        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER adjust_positions_trigger
AFTER INSERT OR DELETE OR UPDATE ON resources_media
FOR EACH ROW
EXECUTE FUNCTION adjust_positions();

