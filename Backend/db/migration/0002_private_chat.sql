CREATE TABLE private_chat (
    id VARCHAR PRIMARY KEY,
    first_user_id int NOT NULL,
    second_user_id int NOT NULL,
    creation_date date,
    FOREIGN KEY (first_user_id) REFERENCES "user"(numeric_id),
    FOREIGN KEY (second_user_id) REFERENCES "user"(numeric_id),
    UNIQUE(first_user_id,second_user_id),
    CHECK(first_user_id < second_user_id)
);