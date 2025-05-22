CREATE TABLE private_chat_content (
    id VARCHAR PRIMARY KEY,
    private_chat_id VARCHAR NOT NULL,
    sender_id VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    FOREIGN KEY (group_chat_id) REFERENCES private_chat(id),
    FOREIGN KEY (sender_id) REFERENCES "user"(id),
    sending_date DATE
);