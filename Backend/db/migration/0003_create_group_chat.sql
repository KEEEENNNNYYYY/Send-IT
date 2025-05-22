CREATE TABLE group_chat (
    id VARCHAR PRIMARY KEY,
    owner_id VARCHAR UNIQUE NOT NULL,
    creation_date DATE,
    FOREIGN KEY (owner_id) REFERENCES "user"(id)
);