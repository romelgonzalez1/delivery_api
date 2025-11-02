-- CREATE USER delivery_user WITH PASSWORD 'wF@7&eM!zT3qR*pL' 	

-- CREATE DATABASE delivery_db
--     WITH
--     OWNER = delivery_user     
--     ENCODING = 'UTF8'
--     LOCALE_PROVIDER = 'libc'
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

CREATE TABLE Store (
    store_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    imageId VARCHAR(255)
);

CREATE TABLE Product (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE StoreProduct (
    store_id UUID NOT NULL,
    product_id UUID NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),

    PRIMARY KEY (store_id, product_id),

    CONSTRAINT fk_store
        FOREIGN KEY(store_id)
        REFERENCES Store(store_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product
        FOREIGN KEY(product_id)
        REFERENCES Product(product_id)
        ON DELETE CASCADE
);