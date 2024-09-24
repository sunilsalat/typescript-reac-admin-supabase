CREATE OR REPLACE FUNCTION update_review_avg_rating() 
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate avg rating for the review
    UPDATE reviews
    SET overall_rating = (
        SELECT AVG(rating)
        FROM sub_reviews
        WHERE review_id = NEW.review_id
    )
    WHERE id = NEW.review_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_review_avg_rating
AFTER INSERT OR UPDATE ON sub_reviews
FOR EACH ROW
EXECUTE FUNCTION update_review_avg_rating();

CREATE OR REPLACE FUNCTION update_property_star_rating() 
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate avg rating for the property
    UPDATE properties
    SET star_rating = (
        SELECT AVG(overall_rating)
        FROM reviews
        WHERE resource_id = NEW.resource_id
    )
    WHERE id = (SELECT id FROM properties WHERE resource_id = NEW.resource_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_property_star_rating
AFTER UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_property_star_rating();
