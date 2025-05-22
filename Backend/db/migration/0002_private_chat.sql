CREATE TABLE private_chat (
    id VARCHAR PRIMARY KEY,
    sender_id VARCHAR NOT NULL,
    receiver_id VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES "user"(id),
    FOREIGN KEY (receiver_id) REFERENCES "user"(id)
);