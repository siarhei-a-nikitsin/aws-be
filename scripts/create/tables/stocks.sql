CREATE TABLE public.stocks (
	product_id uuid NOT NULL,
	count integer NULL,
	CONSTRAINT stocks_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE
);