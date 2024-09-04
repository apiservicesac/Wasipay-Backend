DROP DATABASE wasipay;


DROP TABLE product;

CREATE OR REPLACE FUNCTION correct_image_url()
RETURNS TRIGGER AS $$
BEGIN
    -- Corregir la URL de las imágenes si empieza con '//'
    IF NEW.image LIKE '//%' THEN
        NEW.image := 'https:' || NEW.image;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_correct_image_url
BEFORE INSERT OR UPDATE ON product
FOR EACH ROW EXECUTE FUNCTION correct_image_url();

CREATE OR REPLACE FUNCTION set_default_if_empty()
RETURNS TRIGGER AS $$
BEGIN
    -- Manejar el campo discount
    IF NEW.discount IS NULL OR TRIM(NEW.discount) = '' THEN
        NEW.discount := '0';
    END IF;

    -- Manejar el campo price
    IF NEW.price IS NULL OR TRIM(NEW.price) = '' THEN
        NEW.price := '0';
    ELSE
        NEW.price := REPLACE(NEW.price, ',', '');
    END IF;

    -- Manejar el campo price_card
    IF NEW.price_card IS NULL OR TRIM(NEW.price_card) = '' THEN
        NEW.price_card := '0';
    ELSE
        NEW.price_card := REPLACE(NEW.price_card, ',', '');
    END IF;

    -- Manejar el campo price_offer
    IF NEW.price_offer IS NULL OR TRIM(NEW.price_offer) = '' THEN
        NEW.price_offer := '0';
    ELSE
        NEW.price_offer := REPLACE(NEW.price_offer, ',', '');
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_default_if_empty ON product;

CREATE TRIGGER trigger_set_default_if_empty
BEFORE INSERT OR UPDATE ON product
FOR EACH ROW EXECUTE FUNCTION set_default_if_empty();




-- Instalar la extensión uuid-ossp si no está instalada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION set_uuid_before_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL THEN
        NEW.id := uuid_generate_v4();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_product
BEFORE INSERT ON product
FOR EACH ROW
EXECUTE FUNCTION set_uuid_before_insert();


DELETE FROM ripley;
SELECT * FROM product order by id desc;
SELECT * FROM product where id = 'd83b9508-3e9e-4cac-9d5b-50b76e9d2dc7';
SELECT COUNT(*) FROM ripley order by id desc;