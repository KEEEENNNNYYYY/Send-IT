CREATE TABLE group_chat (
    id VARCHAR PRIMARY KEY,
    member_id VARCHAR UNIQUE,
    owner_id VARCHAR UNIQUE NOT NULL,
    FOREIGN KEY (member_id) REFERENCES "user"(id),
    FOREIGN KEY (owner_id) REFERENCES "user"(id)
);