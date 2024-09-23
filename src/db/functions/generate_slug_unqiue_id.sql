-- Function to generate slug 
CREATE OR REPLACE FUNCTION generate_slug_from_title(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique_id
CREATE OR REPLACE FUNCTION generate_unique_id(length INT)
RETURNS TEXT AS $$
BEGIN
    RETURN substr(md5(random()::text), 1, length);
END;
$$ LANGUAGE plpgsql;

-- Function to generate slug and unique_id
CREATE OR REPLACE FUNCTION set_slug_and_unique_id()
RETURNS TRIGGER AS $$
DECLARE
    table_name TEXT; 
    field_name TEXT;
    length INTEGER;
    type TEXT;
    slug TEXT;
    unique_id TEXT;
BEGIN
    table_name := TG_ARGV[0]::TEXT;
    field_name := TG_ARGV[1]::TEXT;
    length := TG_ARGV[2]::INTEGER;
    type := TG_ARGV[3]::TEXT;

    IF type = 'unique_id' THEN
        unique_id := generate_unique_id(length);
        NEW.unique_id = unique_id;
    ELSIF type = 'slug' THEN
        slug := generate_slug_from_title(row_to_json(NEW)->>field_name);
        NEW.slug = slug;
    ELSE
        slug := generate_slug_from_title(row_to_json(NEW)->>field_name);
        unique_id := generate_unique_id(length);
        NEW.slug = slug;
        NEW.unique_id = unique_id;
    END IF;
    -- slug := generate_slug_from_title(row_to_json(NEW)->>field_name);
    -- unique_id := generate_unique_id(length);
    -- NEW.slug = slug;
    -- NEW.unique_id = unique_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Procedure to create triggers
CREATE OR REPLACE PROCEDURE create_trigger_for_table(table_name TEXT, field_name TEXT, length INTEGER, type TEXT )
AS $$
BEGIN
    EXECUTE format(
       'CREATE TRIGGER %I_before_insert
         BEFORE INSERT ON %I
         FOR EACH ROW
         EXECUTE FUNCTION set_slug_and_unique_id(%L, %L, %L, %L);',
        table_name,table_name, table_name, field_name, length, type
    );
END;
$$ LANGUAGE plpgsql;

call create_trigger_for_table('press_releases', 'title', 10, 'both');
call create_trigger_for_table('organizations', 'name', 10, 'unique_id');
call create_trigger_for_table('products', 'null', 10, 'unique_id');
call create_trigger_for_table('media', 'null', 10, 'unique_id');
call create_trigger_for_table('hotel', 'name', 10, 'both');
call create_trigger_for_table('restaurant', 'name', 10, 'both');
call create_trigger_for_table('spa', 'name', 10, 'both');























--
-- BELOW FUNC NOT IN USE KEPT FOR REF.
--
CREATE OR REPLACE PROCEDURE create_trigger_for_table(table_name TEXT, field_name TEXT, slug_length INTEGER)
AS $$
BEGIN
    EXECUTE format(
        'CREATE OR REPLACE FUNCTION %I_set_slug_and_unique_id()
         RETURNS TRIGGER AS $$
         DECLARE
             slug TEXT;
             unique_id TEXT;
         BEGIN
             -- Generate slug from the specified field
             slug := generate_slug_from_title(NEW.%I);

             -- Generate unique ID
             unique_id := generate_unique_id(%s);

             -- Set the values for the NEW record
             NEW.slug := slug;
             NEW.unique_id := unique_id;

             RETURN NEW;
         END;
         $$ LANGUAGE plpgsql;',
        table_name || '_',  -- Unique function name prefix
        field_name,         -- The field to use for slug generation
        slug_length         -- Length for the unique ID
    );

    EXECUTE format(
        'CREATE TRIGGER %I_before_insert
         BEFORE INSERT ON %I
         FOR EACH ROW
         EXECUTE FUNCTION %I_set_slug_and_unique_id();',
        table_name || '_before_insert',  -- Unique trigger name prefix
        table_name,                      -- Table to attach the trigger to
        table_name || '_'                -- Function name to execute
    );
END;
$$ LANGUAGE plpgsql;



