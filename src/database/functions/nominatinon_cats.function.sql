CREATE OR REPLACE FUNCTION create_tree_root(
    root_name VARCHAR(255),
    for_resource_type VARCHAR(255),
    parent_id UUID DEFAULT NULL,
    tree_position INT DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
    new_tree_id UUID;
    generated_slug TEXT;
    generated_unique_id TEXT;
BEGIN
    new_tree_id := uuid_generate_v4();
    generated_slug := 'asf-2w34-d';
    generated_unique_id := new_tree_id::text;

    INSERT INTO nomination_categories ( 
        tree_id,
        lft, 
        rgt, 
        parent_id, 
        name, 
        for_resource_type, 
        slug, 
        unique_id
    )
    VALUES (
        new_tree_id,
        1, 
        2, 
        parent_id,  
        root_name, 
        for_resource_type, 
        generated_slug, 
        generated_unique_id
    );

    RAISE NOTICE 'Root node "%s" added with left = 1, right = 2, id = %s, slug = %s, unique_id = %s, parent_id = %s',
        root_name, new_tree_id, generated_slug, generated_unique_id, parent_id;
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
    tree_position INT DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
    parent_left INT;
    parent_right INT;
    parent_tree_id UUID;
    generated_slug VARCHAR(255);
    generated_unique_id VARCHAR(255);
BEGIN
    -- Retrieve parent node details
    SELECT lft, rgt, tree_id INTO parent_left, parent_right, parent_tree_id
    FROM nomination_categories
    WHERE id = parent_node_id;

    UPDATE nomination_categories
    SET rgt = rgt + 2
    WHERE rgt > parent_left AND tree_id = parent_tree_id;

    UPDATE nomination_categories
    SET lft = lft + 2
    WHERE lft > parent_left;

    generated_slug := lower(regexp_replace(child_name, '[^a-zA-Z0-9]', '-', 'g'));
    generated_unique_id := uuid_generate_v4();

    INSERT INTO nomination_categories (
        tree_id,
        lft, 
        rgt, 
        parent_id, 
        name, 
        for_resource_type, 
        position, 
        slug, 
        unique_id
    )
    VALUES (
        parent_tree_id,
        parent_left + 1, 
        parent_left + 2, 
        parent_node_id, 
        child_name, 
        for_resource_type, 
        tree_position, 
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

CREATE OR REPLACE FUNCTION cut_off_branch(
    node_id UUID 
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE 
    node_left INT;
    node_right INT;
    width INT;
    tree_id_ VARCHAR(255);
BEGIN 
    SELECT 
        lft, 
        rgt,
        rgt - lft + 1,
        tree_id 
    INTO 
        node_left, 
        node_right, 
        width, 
        tree_id_
    FROM nomination_categories 
    WHERE id = node_id;  -- Corrected to use node_id

    -- Delete the specified branch
    DELETE FROM nomination_categories 
    WHERE lft BETWEEN node_left AND node_right 
    AND tree_id = tree_id;

    -- Update left and right values of remaining nodes
    UPDATE nomination_categories 
    SET rgt = rgt - width 
    WHERE rgt > node_right 
    AND tree_id = tree_id;

    UPDATE nomination_categories 
    SET lft = lft - width 
    WHERE lft > node_right 
    AND tree_id = tree_id;
END;$$;


-- to delete a node and uplift its descendants
-- ! find the node's left and right values
-- ! delete the node by filtering on the left value
-- ! to uplift the descendants:
-- ! update the right values in the tree to be right - 1 and left to be left - 1 where their left is between the deleted node's left and right
-- ! update the right values in the tree to be right - 2 where their right is bigger than the deleted node's right
-- ! update the left values in the tree to be left - 2 where their left is bigger than the deleted node's right
CREATE OR REPLACE FUNCTION delete_node(
    node_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE 
    node_left INT;
    node_right INT; 
BEGIN 
    SELECT 
        lft, 
        rgt
    INTO 
        node_left, 
        node_right
    FROM nomination_categories 
    WHERE id = node_id;

    -- Delete the node
    DELETE FROM nomination_categories WHERE id = node_id;

    -- Update the children
    UPDATE nomination_categories 
    SET
        rgt = rgt - 1,
        lft = lft - 1
    WHERE lft BETWEEN node_left AND node_right;

    -- Update other nodes
    UPDATE nomination_categories 
    SET rgt = rgt - 2 
    WHERE rgt > node_right;
    
    UPDATE nomination_categories 
    SET lft = lft - 2 
    WHERE lft > node_right;
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
            nomination_categories AS descendants,
            nomination_categories AS parent
        WHERE 
            descendants.lft BETWEEN parent.lft AND parent.rgt
            AND parent.name = parent_name
            AND descendants.tree_id = tree_id
        ORDER BY descendants.lft;
    ELSE
        RETURN QUERY
        SELECT 
            descendants.name
        FROM 
            nomination_categories AS descendants
        WHERE 
            descendants.lft BETWEEN left_value AND right_value
            AND descendants.tree_id = tree_id
        ORDER BY descendants.lft;
    END IF;
END;
$$ LANGUAGE plpgsql;


