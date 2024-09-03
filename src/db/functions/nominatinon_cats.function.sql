CREATE OR REPLACE FUNCTION create_tree_root_with_auto_id(
    root_name VARCHAR(255),
    for_resource_type VARCHAR(255),
    parent_id UUID DEFAULT NULL,
    position INT DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
    new_tree_id UUID;
    generated_slug VARCHAR(255);
    generated_unique_id VARCHAR(255);
BEGIN
    new_tree_id := uuid_generate_v4();
    generated_slug := lower(regexp_replace(root_name, '[^a-zA-Z0-9]', '-', 'g') || '-' || substring(new_tree_id::text, 1, 8));
    generated_unique_id := new_tree_id::text;

    -- Insert the new node into the table
    INSERT INTO nomination_categories (
        id, 
        left, 
        right, 
        parent_id, 
        name, 
        for_resource_type, 
        position, 
        slug, 
        unique_id
    )
    VALUES (
        new_tree_id, 
        1, 
        2, 
        parent_id,   -- Use provided parent_id or default NULL
        root_name, 
        for_resource_type, 
        position,    -- Use provided position or default 0
        generated_slug, 
        generated_unique_id
    );

    -- Notify the user of the added root node
    RAISE NOTICE 'Root node "%s" added with left = 1, right = 2, id = %s, slug = %s, unique_id = %s, parent_id = %s, position = %s',
        root_name, new_tree_id, generated_slug, generated_unique_id, parent_id, position;
END;
$$ LANGUAGE plpgsql;



-- update all of the right values of the nodes where the right is bigger than the parent’s left  by 2
-- update all of the left values of the nodes where the left is bigger than the parent’s left  by 2
-- the new node left value will be the parent’s left + 1
-- the new node right value will be the parent’s right + 2
CREATE OR REPLACE FUNCTION add_child_node(
    parent_node_id UUID, 
    child_name VARCHAR(255), 
    for_resource_type VARCHAR(255), 
    position INT DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
    parent_left INT;
    parent_right INT;
    parent_tree_id UUID;
    new_tree_id UUID;
    generated_slug VARCHAR(255);
    generated_unique_id VARCHAR(255);
BEGIN
    -- Retrieve parent node details
    SELECT "left", "right", tree_id INTO parent_left, parent_right, parent_tree_id
    FROM nomination_categories
    WHERE id = parent_node_id;

    UPDATE nodes
    SET "right" = "right" + 2
    WHERE "right" > parent_left AND tree_id = parent_tree_id;

    UPDATE nodes
    SET "left" = "left" + 2
    WHERE "left" > parent_left;

    new_tree_id := uuid_generate_v4();
    generated_slug := lower(regexp_replace(child_name, '[^a-zA-Z0-9]', '-', 'g') || '-' || substring(new_tree_id::text, 1, 8));
    generated_unique_id := new_tree_id::text;

    INSERT INTO nomination_categories (
        id, 
        left, 
        right, 
        parent_id, 
        name, 
        for_resource_type, 
        position, 
        slug, 
        unique_id
    )
    VALUES (
        new_tree_id, 
        parent_left + 1, 
        parent_left + 2, 
        parent_node_id, 
        child_name, 
        for_resource_type, 
        position, 
        generated_slug, 
        generated_unique_id
    );

    RAISE NOTICE 'Child node "%s" added under parent node with ID %s', child_name, parent_node_id;
END;
$$ LANGUAGE plpgsql;



-- to delete a branch
-- ! find the node's left and right values
-- ! create a variable that is equal to the right - left + 1
-- ! delete all of the nodes that their left and right is between the node's left and right
-- ! update the right values in the tree to be right - width where thier right is bigger the current node's right
-- ! update the left values in the tree to be left - width where thier left is bigger the current node's right
CREATE OR REPLACE  PROCEDURE cut_off_branch(
    node_id NUMERIC
)
language plpgsql
AS $$
DECLARE 
    node_left NUMERIC;
    node_right NUMERIC;
    width NUMERIC;
    tree_id_ VARCHAR(255);
BEGIN 
    SELECT 
        "left", 
        "right",
        "right" - "left" + 1,
        nodes.tree_id 
    INTO 
        node_left, 
        node_right,
        width,
        tree_id_
    FROM nodes WHERE "id" = node_icut_off_branchd;

    DELETE FROM nodes WHERE "left" 
    BETWEEN node_left AND node_right 
    AND nodes.tree_id = tree_id_;

    UPDATE nodes SET "right" = "right" - width WHERE "right" > node_right AND nodes.tree_id = tree_id_;
    UPDATE nodes SET "left" = "left" - width WHERE "left" > node_right AND nodes.tree_id = tree_id_;
    commit;
END;$$

-- to delete a node and uplift its descendants
-- ! find the node's left and right values
-- ! delete the node by filtering on the left value
-- ! to uplift the descendants:
-- ! update the right values in the tree to be right - 1 and left to be left - 1 where their left is between the deleted node's left and right
-- ! update the right values in the tree to be right - 2 where their right is bigger than the deleted node's right
-- ! update the left values in the tree to be left - 2 where their left is bigger than the deleted node's right

CREATE OR REPLACE  PROCEDURE delete_node_and_uplift_the_descendants(
    node_id NUMERIC
)
language plpgsql
AS $$
DECLARE 
    node_left NUMERIC;
    node_right NUMERIC; 
    tree_id_ VARCHAR(255);
BEGIN 
    SELECT 
        "left", 
        "right",
        nodes.tree_id 
    INTO 
        node_left, 
        node_right,
        tree_id_
    FROM nodes WHERE "id" = node_id;

    DELETE FROM nodes WHERE "id" = node_id;

    -- update the children
    UPDATE nodes 
    SET
        "right" = "right" - 1,
        "left" = "left" - 1
    WHERE "left" BETWEEN node_left AND node_right
    AND nodes.tree_id = tree_id_;

    -- update other nodes
    UPDATE nodes SET "right" = "right" - 2 WHERE "right" > node_right AND nodes.tree_id = tree_id_;
    UPDATE nodes SET "left" = "left" - 2 WHERE "left" > node_right AND nodes.tree_id = tree_id_;
    commit;
END;$$

-- Method to get all descendants
CREATE OR REPLACE FUNCTION get_descendants(
    parent_name TEXT,
    tree_id UUID,
    left_value INT DEFAULT NULL,
    right_value INT DEFAULT NULL
)
RETURNS TABLE(name TEXT) AS $$
BEGIN
    IF left_value IS NULL AND right_value IS NULL THEN
        RETURN QUERY
        SELECT 
            descendants.name
        FROM 
            nodes AS descendants,
            nodes AS parent
        WHERE 
            descendants."left" BETWEEN parent."left" AND parent."right"
            AND parent.name = parent_name
            AND descendants.tree_id = tree_id
        ORDER BY descendants."left";
    ELSE
        RETURN QUERY
        SELECT 
            descendants.name
        FROM 
            nodes AS descendants
        WHERE 
            descendants."left" BETWEEN left_value AND right_value
            AND descendants.tree_id = tree_id
        ORDER BY descendants."left";
    END IF;
END;
$$ LANGUAGE plpgsql;
