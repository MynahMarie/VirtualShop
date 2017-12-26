BEGIN;

DROP TABLE IF EXISTS users, items, transactions, cart, reviews CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) NOT NULL ,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
	email TEXT NOT NULL,
	balance DECIMAL DEFAULT 500.00,
	hash TEXT NOT NULL
);

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	price DECIMAL NOT NULL,
	image TEXT NULL
);

CREATE TABLE transactions (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	item_id INTEGER NOT NULL,
	t_time TIMESTAMP
);

CREATE TABLE cart (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) on delete cascade on update cascade,
	item_id INTEGER REFERENCES items(id) on delete cascade on update cascade
	);

-- CREATE TABLE reviews (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id) on delete cascade on update cascade,
-- 	item_id INTEGER REFERENCES items(id) on delete cascade on update cascade,
-- 	content TEXT NOT NULL,
-- 	rev_time TIMESTAMP
-- );

INSERT INTO items(name, description, price, image) VALUES
('Shoes', 'hoslacks stinking shoes', 20.00, 'https://i.pinimg.com/originals/42/34/dd/4234dd092aff7a1a3d61fc71dbb9dc74.jpg'),
('Picture Frame', 'beautiful group picture of FACN3', 17.81, 'https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/10/_6419170.jpg?fit=fill&fm=jpg&dpr=2&h=368&w=240&quality=45&tradecacheforcash=yes'),
('1918 Smoking Pipe','made with American Mahogany', 99.00, 'https://www.dhresource.com/0x0s/f2-albu-g5-M00-9C-35-rBVaJFj9ZeSAZBdcAADSgO8Z1zg514.jpg/e-pipe-618-health-smoking-pipe-electronic.jpg'),
('Face Cream', 'Rejuvinating face cream', 42.15, 'https://www.bobbibrowncosmetics.com/media/export/cms/products/415x415/bb_prod_E65X_415x415_0.jpg'),
('Cheese', 'Five year old cheddar', 14.07, 'http://www.eatthis.com/wp-content/uploads//media/images/ext/855666897/shredded-swiss-cheese.jpg');




COMMIT ;
