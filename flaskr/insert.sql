DELETE from user WHERE 1=1;

UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='user';

INSERT into user (username,password,logintype,accountId,profilePicture,email) VALUES ('kkwasniewski','yolo','facebook','1','2','kwasiky@gfmail.com');
INSERT into user (username,password,logintype,accountId,profilePicture,email) VALUES ('someoneelse','yoasdlo','faceboasdok','3','2','kwasiky@gfmail.com');