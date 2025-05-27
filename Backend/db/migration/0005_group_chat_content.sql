CREATE TABLE group_chat_content (
    id VARCHAR PRIMARY KEY,
    group_chat_id VARCHAR NOT NULL,
    sender_id int NOT NULL,
    content VARCHAR NOT NULL,
     sending_date TIMESTAMP,
    FOREIGN KEY (group_chat_id) REFERENCES group_chat(id),
    FOREIGN KEY (sender_id) REFERENCES "user"(numeric_id)
);