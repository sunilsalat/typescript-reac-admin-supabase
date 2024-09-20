CREATE OR REPLACE FUNCTION set_property_name()
RETURNS TRIGGER AS $$
BEGIN
    -- Fetch the property_name from properties table
    SELECT name INTO NEW.property_name
    FROM properties
    WHERE id = NEW.property_id; 

   -- Fetch the property_name from nomination_categories table
    SELECT name INTO NEW.nomination_category_name
    FROM nomination_categories
    WHERE id = NEW.nomination_category_id;

    -- Ensure the property_name is not null
    IF NEW.property_name IS NULL THEN
        RAISE EXCEPTION 'Property ID % does not exist in properties table', NEW.property_id;
    END IF;

        -- Ensure the property_name is not null
    IF NEW.nomination_category_name IS NULL THEN
        RAISE EXCEPTION 'Property ID % does not exist in properties table', NEW.property_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_properties_winners
BEFORE INSERT ON properties_winners
FOR EACH ROW
EXECUTE FUNCTION set_property_name();
