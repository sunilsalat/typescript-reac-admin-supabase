CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE create_update_trigger_for_table(table_name TEXT)
AS $$
BEGIN
    EXECUTE format(
        'CREATE TRIGGER %I_before_update
         BEFORE UPDATE ON %I
         FOR EACH ROW
         EXECUTE FUNCTION update_timestamp();',
        table_name || '_before_update',
        table_name
    );
END;
$$ LANGUAGE plpgsql;

-- Example of creating update triggers for specific tables
CALL create_update_trigger_for_table('press_releases');
CALL create_update_trigger_for_table('another_table');
