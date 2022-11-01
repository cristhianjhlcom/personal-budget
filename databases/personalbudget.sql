DROP DATABASE IF EXISTS personalbudget;
CREATE DATABASE personalbudget;

CREATE TABLE envelopes (
    id serial PRIMARY KEY NOT NULL,
    title varchar(60) NOT NULL,
    budget integer NOT NULL,
    created_at date DEFAULT NOW()
);

CREATE TABLE transactions (
    id serial PRIMARY KEY NOT NULL,
    from_id integer NOT NULL,
    to_id integer NOT NULL,
    amount integer DEFAULT 0,
    created_at date DEFAULT NOW(),
    CONSTRAINT fk_from_id FOREIGN KEY(from_id) REFERENCES envelopes(id),
    CONSTRAINT fk_to_id FOREIGN KEY(to_id) REFERENCES envelopes(id)
);

INSERT INTO envelopes (title, budget) VALUES ('Home', 200);
INSERT INTO envelopes (title, budget) VALUES ('Food', 500);
INSERT INTO transactions (from_id, to_id, amount) VALUES (1, 2, 100);

UPDATE envelopes SET budget = (budget - 100) WHERE id = 1;
UPDATE envelopes SET budget = (budget + 100) WHERE id = 2;

SELECT
    t.id AS id,
    e_from.title AS from,
    e_to.title AS to,
    t.amount
FROM
    transactions AS t
JOIN envelopes AS e_from ON e_from.id = t.from_id
JOIN envelopes AS e_to ON e_to.id = t.to_id;
