CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  street VARCHAR NOT NULL,
  nr VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  telephone VARCHAR NOT NULL,
  fax VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('customers');
