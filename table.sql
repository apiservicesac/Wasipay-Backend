CREATE DATABASE wasipay;

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
FOR EACH ROW
EXECUTE FUNCTION correct_image_url();

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
SELECT COUNT(*) FROM ripley order by id desc;