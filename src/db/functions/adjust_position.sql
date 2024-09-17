CREATE OR REPLACE FUNCTION adjust_resourcemedia_positions_on_update(   
    dragged_id UUID, 
    new_position INT
)
RETURNS VOID AS $$
DECLARE
    current_position INT;
    target_entity_id UUID;
    target_entity_type TEXT;
    target_media_type TEXT;
BEGIN
    SELECT "position", entity_id, entity_type, media_type
    INTO current_position, target_entity_id, target_entity_type, target_media_type
    FROM resources_media 
    WHERE id = dragged_id;

    IF current_position IS NULL THEN
        RAISE EXCEPTION 'Item with id % not found.', dragged_id;
    END IF;

    IF new_position > current_position THEN
        UPDATE resources_media
        SET "position" = "position" - 1
        WHERE "position" > current_position 
        AND "position" <= new_position
        AND entity_id = target_entity_id
        AND entity_type = target_entity_type
        AND media_type = target_media_type;
    END IF;
    
    IF new_position < current_position THEN
        UPDATE resources_media
        SET "position" = "position" + 1
        WHERE "position" >= new_position 
        AND "position" < current_position
        AND entity_id = target_entity_id
        AND entity_type = target_entity_type
        AND media_type = target_media_type;
    END IF;

    UPDATE resources_media
    SET "position" = new_position
    WHERE id = dragged_id;
END;
$$ LANGUAGE plpgsql;


SELECT adjust_resourcemedia_positions_on_update(
    'd9ac00bb-da2c-498d-99b1-e9dd2c960c2b'::uuid,  
    1
);