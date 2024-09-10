CREATE OR REPLACE FUNCTION update_role_access_policy_name()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE role_access_policies
  SET policy_name = (
    SELECT policy_name
    FROM policies
    WHERE policies.id = NEW.policy_id
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_group_access_policy_name()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE group_access_policies
  SET policy_name = (
    SELECT policy_name
    FROM policies
    WHERE policies.id = NEW.policy_id
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
