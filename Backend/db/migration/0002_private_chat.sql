CREATE TABLE private_chat (
    id SERIAL PRIMARY KEY,
    first_user_reference int NOT NULL,
    second_user_reference int NOT NULL,
    creation_date date,
    FOREIGN KEY (first_user_reference) REFERENCES "user"(numeric_id),
    FOREIGN KEY (second_user_reference) REFERENCES "user"(numeric_id),
    UNIQUE(first_user_id,second_user_id),
    CHECK(first_user_id < second_user_id)
);