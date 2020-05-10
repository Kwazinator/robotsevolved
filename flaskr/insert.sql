DELETE from user WHERE 1=1;

UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='user';

INSERT into user (userID, logintype, accountID, profilePicture, email, activeFlag) VALUES ('schultzder','facebook', 'text', 'text', 'sample.derek@email.com', 'Y');
INSERT into user (userID, logintype, accountID, profilePicture, email, activeFlag) VALUES ('kkwasniewski','facebook', 'text', 'text', 'sample.kyle@email.com', 'Y');