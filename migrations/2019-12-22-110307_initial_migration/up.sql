CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  year INTEGER NULL,
  tax_rate INTEGER NOT NULL,
  type VARCHAR(2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  text VARCHAR(255) NULL,
  unit VARCHAR(255) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  out_of_stock BOOLEAN NOT NULL DEFAULT FALSE,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('products');

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  street VARCHAR NOT NULL,
  nr VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  zipcode INTEGER NOT NULL,
  country_code CHAR(2) NOT NULL DEFAULT 'AT',
  telephone VARCHAR NOT NULL,
  fax VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('customers');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id) NOT NULL,
  comment TEXT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('orders');

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  name VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  tax_rate INTEGER NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('order_items');
