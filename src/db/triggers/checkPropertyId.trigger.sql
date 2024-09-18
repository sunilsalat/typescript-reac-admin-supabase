
CREATE OR REPLACE FUNCTION check_property_exists()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the property_id exists in the properties table
    IF NOT EXISTS (SELECT 1 FROM properties WHERE id = NEW.property_id) THEN
        RAISE EXCEPTION 'property_id % does not exist in properties table', NEW.property_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE create_trigger_for_check_property_id(table_name TEXT)
AS $$
BEGIN
    EXECUTE format(
        'CREATE TRIGGER %I_before_insert
         BEFORE INSERT ON %I
         FOR EACH ROW
         EXECUTE FUNCTION check_property_exists();',
        table_name || '_before_insert',  -- Trigger name
        table_name                       -- Table name
    );
END;
$$ LANGUAGE plpgsql;


CALL create_trigger_for_check_property_id('properties_booking_links');
CALL create_trigger_for_check_property_id('properties_social_links');
CALL create_trigger_for_check_property_id('properties_settings');
