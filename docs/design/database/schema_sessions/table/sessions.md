# table: sessions

## description

Table for storing session information
The session token is stored encrypted.

## structure

| Column Name  | Data Type | NULL |      Default      | Primary Key | Foreign Key | Unique | Check Constraint |    Description      |
| ------------ | --------- | ---- | ----------------- | ----------- | ----------- | ------ | ---------------- | ------------------ |
| id           | TEXT      | NO   |                   | YES         |             | YES    |                  | Session ID         |
| user_id      | TEXT      | NO   |                   |             | users(id)   |        |                  | User ID            |
| session_token | TEXT     | NO   |                   |             |             |        |                  | Session Token      |
| created_at   | TIMESTAMP | NO   | CURRENT_TIMESTAMP |             |             |        |                  | Creation Timestamp  |
| updated_at   | TIMESTAMP | NO   | CURRENT_TIMESTAMP |             |             |        |                  | Update Timestamp    |
| expires_at   | TIMESTAMP | NO   |                   |             |             |        |                  | Expiration Date     |
