CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  name VARCHAR NOT NULL,
  wine_id INTEGER REFERENCES wines(id) NULL,
  tidbit_id INTEGER REFERENCES tidbits(id) NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL
);

SELECT diesel_manage_updated_at('order_items');
