CREATE TABLE private_chat_content (
    id VARCHAR PRIMARY KEY,
    private_chat_id VARCHAR NOT NULL,
    sender_id int NOT NULL,
    content VARCHAR NOT NULL,
    FOREIGN KEY (private_chat_id) REFERENCES private_chat(id),
    FOREIGN KEY (sender_id) REFERENCES "user"(numeric_id),
    sending_date TIMESTAMP
);