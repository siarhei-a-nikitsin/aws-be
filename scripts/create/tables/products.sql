CREATE TABLE public.products (
	description text NULL,
	title text NOT NULL,
	id uuid default gen_random_uuid(),
	price integer NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);
