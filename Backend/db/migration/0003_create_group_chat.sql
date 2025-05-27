CREATE TABLE group_chat (
    id VARCHAR PRIMARY KEY,
    owner_id int UNIQUE NOT NULL,
    creation_date DATE,
    FOREIGN KEY (owner_id) REFERENCES "user"(numeric_id)
);