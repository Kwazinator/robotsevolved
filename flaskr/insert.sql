DELETE from graph WHERE 1=1;
DELETE from axisdata WHERE 1=1;
DELETE from datapairs WHERE 1=1;
DELETE from program WHERE 1=1;
DELETE from datavalues WHERE 1=1;
DELETE from user WHERE 1=1;
DELETE from usertograph WHERE 1=1;


UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='axisdata';
UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='graph';
UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='datapairs';
UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='program';
UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='datavalues';

INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('S&P500', 'line','stonks', 1, 'kkwasniewski','finance');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('Number of coronavirus cases', 'line','RONA cases cmon man', 1, 'kkwasniewski','health');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('thrown touchdowns from Tom Brady', 'line','touchdowns in sports by brady',2, 'someguy','sports');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('Top Youtube Subscribers', 'line','THIS IS A LONG DESCRIPTION IN ORDER TO CAUSE THE BUG THAT CAUSES ELEMENTS IN THE ELEMENTGRAPH TO NOT LOAD BELOW THE SELECTED ITEM, PLEASE DISREGUARD I WILL HAVE TO FIND A WAY AROUND THIS',2, 'someguy','entertainment');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('richest people in the world', 'line','rich peoplez',1, 'kkwasniewski','wealth');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('top songs spotify', 'line','music and stuff',1, 'kkwasniewski','music');

INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('protocols', 'line','this is going to be a long description example in case someone does a long description for submission',1, 'kkwasniewski','engineering');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('List of Ips', 'line','IF THE LOADED ELEMENT HAS A LONGER DIV THEN I THINK THE BUG DOESNT HAPPEN SO MAKE SURE THE ELEMENT THAT IS ON THE FAR RIGHT HAS THE LOWEST DIV SIZE MAYBE THIS IS THE CAUSE',1, 'kkwasniewski','networking');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('largest protos', 'line','protocols',1, 'kkwasniewski','protocols');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('something networking', 'line','engineering stuff',1, 'kkwasniewski','engineering');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('system engineering', 'line','systems linux and windows OS',1, 'kkwasniewski','engineering');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('network engineering', 'line','routers switches and firewalls',1, 'kkwasniewski','networking');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('computer science', 'line','programs and stuff here',1, 'kkwasniewski','programming');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('software engineering', 'line','software stuff and description here',2, 'someguy','software');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('electrical engineering', 'line','electrical engineering stuff here',2, 'someguy','electrical stuff here');
INSERT into graph (name,type,description,authorid,authorname,catagory) VALUES ('liberal arts', 'line','arts and fine stuff for that kinda stuff',2, 'someguy','Arts and crafts');










INSERT into user (username,password,logintype,accountId,profilePicture,email) VALUES ('kkwasniewski','yolo','facebook','1','2','kwasiky@gmail.com');
INSERT into user (username,password,logintype,accountId,profilePicture,email) VALUES ('someoneelse','yoasdlo','faceboasdok','3','2','kwasiky@gmail.com');


INSERT into usertograph (userid,graphid,ordernum) VALUES (1,1,2);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,2,1);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,5,3);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,4,4);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,6,5);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,3,6);

INSERT into usertograph (userid,graphid,ordernum) VALUES (1,7,7);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,8,8);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,9,9);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,10,10);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,11,11);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,12,12);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,13,13);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,14,14);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,15,15);
INSERT into usertograph (userid,graphid,ordernum) VALUES (1,16,16);


INSERT into usertograph VALUES (2,2,1);
INSERT into usertograph VALUES (2,3,3);
INSERT into usertograph VALUES (2,4,2);

INSERT into axisdata (graphid,programid,name) VALUES (2,1,'cases');
INSERT into axisdata (graphid,programid,name) VALUES (2,1,'deaths');
INSERT into axisdata (graphid,programid,name) VALUES (2,1,'hospitalizations');


INSERT into axisdata (graphid,programid,name) VALUES (1,2,'num1');
INSERT into axisdata (graphid,programid,name) VALUES (1,2,'stuff');

INSERT into axisdata (graphid,programid,name) VALUES (3,3,'things');
INSERT into axisdata (graphid,programid,name) VALUES (3,3,'thestuff');
INSERT into axisdata (graphid,programid,name) VALUES (3,3,'others');
INSERT into axisdata (graphid,programid,name) VALUES (3,3,'finally');

INSERT into axisdata (graphid,programid,name) VALUES (4,2,'sdfg');
INSERT into axisdata (graphid,programid,name) VALUES (4,2,'asdfg');

INSERT into axisdata (graphid,programid,name) VALUES (5,2,'poiu');
INSERT into axisdata (graphid,programid,name) VALUES (5,2,'uiop');

INSERT into axisdata (graphid,programid,name) VALUES (6,2,'thisthing');

INSERT into axisdata (graphid,programid,name) VALUES (7,2,'testdata');

INSERT into axisdata (graphid,programid,name) VALUES (8,2,'moredata');

INSERT into axisdata (graphid,programid,name) VALUES (9,2,'pings');

INSERT into axisdata (graphid,programid,name) VALUES (10,2,'ssh');

INSERT into axisdata (graphid,programid,name) VALUES (11,2,'https');

INSERT into axisdata (graphid,programid,name) VALUES (12,2,'smb');

INSERT into axisdata (graphid,programid,name) VALUES (13,2,'rdp');

INSERT into axisdata (graphid,programid,name) VALUES (14,2,'smmp');

INSERT into axisdata (graphid,programid,name) VALUES (15,2,'ipsec');

INSERT into axisdata (graphid,programid,name) VALUES (16,2,'ikev1');





INSERT into datavalues (axisdataid, value) VALUES (1,20);
INSERT into datavalues (axisdataid, value) VALUES (1,40);
INSERT into datavalues (axisdataid, value) VALUES (1,25);
INSERT into datavalues (axisdataid, value) VALUES (1,50);
INSERT into datavalues (axisdataid, value) VALUES (1,15);
INSERT into datavalues (axisdataid, value) VALUES (1,45);
INSERT into datavalues (axisdataid, value) VALUES (1,33);
INSERT into datavalues (axisdataid, value) VALUES (1,34);

INSERT into datavalues (axisdataid, value) VALUES (2,5);
INSERT into datavalues (axisdataid, value) VALUES (2,30);
INSERT into datavalues (axisdataid, value) VALUES (2,21);
INSERT into datavalues (axisdataid, value) VALUES (2,18);
INSERT into datavalues (axisdataid, value) VALUES (2,59);
INSERT into datavalues (axisdataid, value) VALUES (2,50);
INSERT into datavalues (axisdataid, value) VALUES (2,28);
INSERT into datavalues (axisdataid, value) VALUES (2,33);

INSERT into datavalues (axisdataid, value) VALUES (3,30);
INSERT into datavalues (axisdataid, value) VALUES (3,5);
INSERT into datavalues (axisdataid, value) VALUES (3,18);
INSERT into datavalues (axisdataid, value) VALUES (3,21);
INSERT into datavalues (axisdataid, value) VALUES (3,33);
INSERT into datavalues (axisdataid, value) VALUES (3,41);
INSERT into datavalues (axisdataid, value) VALUES (3,29);



INSERT into datavalues (axisdataid, value) VALUES (4,1);
INSERT into datavalues (axisdataid, value) VALUES (4,2);
INSERT into datavalues (axisdataid, value) VALUES (4,10);
INSERT into datavalues (axisdataid, value) VALUES (4,20);
INSERT into datavalues (axisdataid, value) VALUES (4,30);
INSERT into datavalues (axisdataid, value) VALUES (4,40);
INSERT into datavalues (axisdataid, value) VALUES (4,50);
INSERT into datavalues (axisdataid, value) VALUES (4,60);

INSERT into datavalues (axisdataid, value) VALUES (5,1);
INSERT into datavalues (axisdataid, value) VALUES (5,1);
INSERT into datavalues (axisdataid, value) VALUES (5,2);
INSERT into datavalues (axisdataid, value) VALUES (5,3);
INSERT into datavalues (axisdataid, value) VALUES (5,5);
INSERT into datavalues (axisdataid, value) VALUES (5,8);
INSERT into datavalues (axisdataid, value) VALUES (5,13);
INSERT into datavalues (axisdataid, value) VALUES (5,21);






INSERT into datavalues (axisdataid, value) VALUES (6,1333);
INSERT into datavalues (axisdataid, value) VALUES (6,3122);
INSERT into datavalues (axisdataid, value) VALUES (6,223);
INSERT into datavalues (axisdataid, value) VALUES (6,334);
INSERT into datavalues (axisdataid, value) VALUES (6,335);
INSERT into datavalues (axisdataid, value) VALUES (6,136);
INSERT into datavalues (axisdataid, value) VALUES (6,173);
INSERT into datavalues (axisdataid, value) VALUES (6,118);

INSERT into datavalues (axisdataid, value) VALUES (7,111);
INSERT into datavalues (axisdataid, value) VALUES (7,111);
INSERT into datavalues (axisdataid, value) VALUES (7,121);
INSERT into datavalues (axisdataid, value) VALUES (7,131);
INSERT into datavalues (axisdataid, value) VALUES (7,152);
INSERT into datavalues (axisdataid, value) VALUES (7,183);
INSERT into datavalues (axisdataid, value) VALUES (7,1143);
INSERT into datavalues (axisdataid, value) VALUES (7,1214);

INSERT into datavalues (axisdataid, value) VALUES (8,132);
INSERT into datavalues (axisdataid, value) VALUES (8,2322);
INSERT into datavalues (axisdataid, value) VALUES (8,1044);
INSERT into datavalues (axisdataid, value) VALUES (8,2420);
INSERT into datavalues (axisdataid, value) VALUES (8,3022);
INSERT into datavalues (axisdataid, value) VALUES (8,4033);
INSERT into datavalues (axisdataid, value) VALUES (8,50333);
INSERT into datavalues (axisdataid, value) VALUES (8,61230);

INSERT into datavalues (axisdataid, value) VALUES (9,1421);
INSERT into datavalues (axisdataid, value) VALUES (9,11123);
INSERT into datavalues (axisdataid, value) VALUES (9,2331);
INSERT into datavalues (axisdataid, value) VALUES (9,333);



INSERT into datavalues (axisdataid, value) VALUES (10,120);
INSERT into datavalues (axisdataid, value) VALUES (10,420);
INSERT into datavalues (axisdataid, value) VALUES (10,235);
INSERT into datavalues (axisdataid, value) VALUES (10,540);
INSERT into datavalues (axisdataid, value) VALUES (10,125);
INSERT into datavalues (axisdataid, value) VALUES (10,415);
INSERT into datavalues (axisdataid, value) VALUES (10,323);
INSERT into datavalues (axisdataid, value) VALUES (10,334);

INSERT into datavalues (axisdataid, value) VALUES (11,53);
INSERT into datavalues (axisdataid, value) VALUES (11,320);
INSERT into datavalues (axisdataid, value) VALUES (11,231);
INSERT into datavalues (axisdataid, value) VALUES (11,118);
INSERT into datavalues (axisdataid, value) VALUES (11,519);
INSERT into datavalues (axisdataid, value) VALUES (11,530);
INSERT into datavalues (axisdataid, value) VALUES (11,248);
INSERT into datavalues (axisdataid, value) VALUES (11,313);


INSERT into datavalues (axisdataid, value) VALUES (12,120);
INSERT into datavalues (axisdataid, value) VALUES (12,420);
INSERT into datavalues (axisdataid, value) VALUES (12,235);
INSERT into datavalues (axisdataid, value) VALUES (12,540);
INSERT into datavalues (axisdataid, value) VALUES (12,125);
INSERT into datavalues (axisdataid, value) VALUES (12,415);
INSERT into datavalues (axisdataid, value) VALUES (12,323);
INSERT into datavalues (axisdataid, value) VALUES (12,334);
INSERT into datavalues (axisdataid, value) VALUES (12,53);
INSERT into datavalues (axisdataid, value) VALUES (12,320);
INSERT into datavalues (axisdataid, value) VALUES (12,231);
INSERT into datavalues (axisdataid, value) VALUES (12,118);
INSERT into datavalues (axisdataid, value) VALUES (12,519);
INSERT into datavalues (axisdataid, value) VALUES (12,530);
INSERT into datavalues (axisdataid, value) VALUES (12,248);
INSERT into datavalues (axisdataid, value) VALUES (12,313);

INSERT into datavalues (axisdataid, value) VALUES (13,120);
INSERT into datavalues (axisdataid, value) VALUES (13,420);
INSERT into datavalues (axisdataid, value) VALUES (13,235);
INSERT into datavalues (axisdataid, value) VALUES (13,540);
INSERT into datavalues (axisdataid, value) VALUES (13,125);
INSERT into datavalues (axisdataid, value) VALUES (13,415);
INSERT into datavalues (axisdataid, value) VALUES (13,323);
INSERT into datavalues (axisdataid, value) VALUES (13,334);
INSERT into datavalues (axisdataid, value) VALUES (13,53);
INSERT into datavalues (axisdataid, value) VALUES (13,320);
INSERT into datavalues (axisdataid, value) VALUES (13,231);
INSERT into datavalues (axisdataid, value) VALUES (13,118);
INSERT into datavalues (axisdataid, value) VALUES (13,519);
INSERT into datavalues (axisdataid, value) VALUES (13,530);
INSERT into datavalues (axisdataid, value) VALUES (13,248);
INSERT into datavalues (axisdataid, value) VALUES (13,313);



INSERT into datavalues (axisdataid, value) VALUES (14,1240);
INSERT into datavalues (axisdataid, value) VALUES (14,4220);
INSERT into datavalues (axisdataid, value) VALUES (14,2355);
INSERT into datavalues (axisdataid, value) VALUES (14,5450);
INSERT into datavalues (axisdataid, value) VALUES (14,1255);
INSERT into datavalues (axisdataid, value) VALUES (14,4155);
INSERT into datavalues (axisdataid, value) VALUES (14,3253);
INSERT into datavalues (axisdataid, value) VALUES (14,3354);
INSERT into datavalues (axisdataid, value) VALUES (14,535);
INSERT into datavalues (axisdataid, value) VALUES (14,3250);
INSERT into datavalues (axisdataid, value) VALUES (14,2351);
INSERT into datavalues (axisdataid, value) VALUES (14,1158);
INSERT into datavalues (axisdataid, value) VALUES (14,5159);
INSERT into datavalues (axisdataid, value) VALUES (14,5350);
INSERT into datavalues (axisdataid, value) VALUES (14,2458);
INSERT into datavalues (axisdataid, value) VALUES (14,3153);
INSERT into datavalues (axisdataid, value) VALUES (14,1250);
INSERT into datavalues (axisdataid, value) VALUES (14,4250);
INSERT into datavalues (axisdataid, value) VALUES (14,2355);
INSERT into datavalues (axisdataid, value) VALUES (14,5450);
INSERT into datavalues (axisdataid, value) VALUES (14,1255);
INSERT into datavalues (axisdataid, value) VALUES (14,4515);
INSERT into datavalues (axisdataid, value) VALUES (14,5323);
INSERT into datavalues (axisdataid, value) VALUES (14,3534);
INSERT into datavalues (axisdataid, value) VALUES (14,553);
INSERT into datavalues (axisdataid, value) VALUES (14,3520);
INSERT into datavalues (axisdataid, value) VALUES (14,2531);
INSERT into datavalues (axisdataid, value) VALUES (14,1158);
INSERT into datavalues (axisdataid, value) VALUES (14,5159);
INSERT into datavalues (axisdataid, value) VALUES (14,5350);
INSERT into datavalues (axisdataid, value) VALUES (14,248);
INSERT into datavalues (axisdataid, value) VALUES (14,313);
INSERT into datavalues (axisdataid, value) VALUES (14,120);
INSERT into datavalues (axisdataid, value) VALUES (14,420);
INSERT into datavalues (axisdataid, value) VALUES (14,2355);
INSERT into datavalues (axisdataid, value) VALUES (14,540);
INSERT into datavalues (axisdataid, value) VALUES (14,1252);
INSERT into datavalues (axisdataid, value) VALUES (14,4152);
INSERT into datavalues (axisdataid, value) VALUES (14,3232);
INSERT into datavalues (axisdataid, value) VALUES (14,3324);
INSERT into datavalues (axisdataid, value) VALUES (14,532);
INSERT into datavalues (axisdataid, value) VALUES (14,3220);
INSERT into datavalues (axisdataid, value) VALUES (14,231);
INSERT into datavalues (axisdataid, value) VALUES (14,1128);
INSERT into datavalues (axisdataid, value) VALUES (14,5129);
INSERT into datavalues (axisdataid, value) VALUES (14,530);
INSERT into datavalues (axisdataid, value) VALUES (14,2428);
INSERT into datavalues (axisdataid, value) VALUES (14,3123);















INSERT into datavalues (axisdataid, value) VALUES (15,1252);
INSERT into datavalues (axisdataid, value) VALUES (15,4152);
INSERT into datavalues (axisdataid, value) VALUES (15,3232);
INSERT into datavalues (axisdataid, value) VALUES (15,3324);
INSERT into datavalues (axisdataid, value) VALUES (15,532);
INSERT into datavalues (axisdataid, value) VALUES (15,3220);
INSERT into datavalues (axisdataid, value) VALUES (15,231);
INSERT into datavalues (axisdataid, value) VALUES (15,1128);
INSERT into datavalues (axisdataid, value) VALUES (15,5129);
INSERT into datavalues (axisdataid, value) VALUES (15,530);
INSERT into datavalues (axisdataid, value) VALUES (15,2428);
INSERT into datavalues (axisdataid, value) VALUES (15,3123);

INSERT into datavalues (axisdataid, value) VALUES (16,1252);
INSERT into datavalues (axisdataid, value) VALUES (16,4152);
INSERT into datavalues (axisdataid, value) VALUES (16,3232);
INSERT into datavalues (axisdataid, value) VALUES (16,3324);
INSERT into datavalues (axisdataid, value) VALUES (16,532);
INSERT into datavalues (axisdataid, value) VALUES (16,3220);
INSERT into datavalues (axisdataid, value) VALUES (16,231);
INSERT into datavalues (axisdataid, value) VALUES (16,1128);
INSERT into datavalues (axisdataid, value) VALUES (16,5129);
INSERT into datavalues (axisdataid, value) VALUES (16,530);
INSERT into datavalues (axisdataid, value) VALUES (16,2428);
INSERT into datavalues (axisdataid, value) VALUES (16,3123);

INSERT into datavalues (axisdataid, value) VALUES (17,1252);
INSERT into datavalues (axisdataid, value) VALUES (17,4152);
INSERT into datavalues (axisdataid, value) VALUES (17,3232);
INSERT into datavalues (axisdataid, value) VALUES (17,3324);
INSERT into datavalues (axisdataid, value) VALUES (17,532);
INSERT into datavalues (axisdataid, value) VALUES (17,3220);
INSERT into datavalues (axisdataid, value) VALUES (17,231);
INSERT into datavalues (axisdataid, value) VALUES (17,1128);
INSERT into datavalues (axisdataid, value) VALUES (17,5129);
INSERT into datavalues (axisdataid, value) VALUES (17,530);
INSERT into datavalues (axisdataid, value) VALUES (17,2428);
INSERT into datavalues (axisdataid, value) VALUES (17,3123);

INSERT into datavalues (axisdataid, value) VALUES (18,1252);
INSERT into datavalues (axisdataid, value) VALUES (18,4152);
INSERT into datavalues (axisdataid, value) VALUES (18,3232);
INSERT into datavalues (axisdataid, value) VALUES (18,3324);
INSERT into datavalues (axisdataid, value) VALUES (18,532);
INSERT into datavalues (axisdataid, value) VALUES (18,3220);
INSERT into datavalues (axisdataid, value) VALUES (18,231);
INSERT into datavalues (axisdataid, value) VALUES (18,1128);
INSERT into datavalues (axisdataid, value) VALUES (18,5129);
INSERT into datavalues (axisdataid, value) VALUES (18,530);
INSERT into datavalues (axisdataid, value) VALUES (18,2428);
INSERT into datavalues (axisdataid, value) VALUES (18,3123);

INSERT into datavalues (axisdataid, value) VALUES (19,1252);
INSERT into datavalues (axisdataid, value) VALUES (19,4152);
INSERT into datavalues (axisdataid, value) VALUES (19,3232);
INSERT into datavalues (axisdataid, value) VALUES (19,3324);
INSERT into datavalues (axisdataid, value) VALUES (19,532);
INSERT into datavalues (axisdataid, value) VALUES (19,3220);
INSERT into datavalues (axisdataid, value) VALUES (19,231);
INSERT into datavalues (axisdataid, value) VALUES (19,1128);
INSERT into datavalues (axisdataid, value) VALUES (19,5129);
INSERT into datavalues (axisdataid, value) VALUES (19,530);
INSERT into datavalues (axisdataid, value) VALUES (19,2428);
INSERT into datavalues (axisdataid, value) VALUES (19,3123);

INSERT into datavalues (axisdataid, value) VALUES (20,1252);
INSERT into datavalues (axisdataid, value) VALUES (20,4152);
INSERT into datavalues (axisdataid, value) VALUES (20,3232);
INSERT into datavalues (axisdataid, value) VALUES (20,3324);
INSERT into datavalues (axisdataid, value) VALUES (20,532);
INSERT into datavalues (axisdataid, value) VALUES (20,3220);
INSERT into datavalues (axisdataid, value) VALUES (20,231);
INSERT into datavalues (axisdataid, value) VALUES (20,1128);
INSERT into datavalues (axisdataid, value) VALUES (20,5129);
INSERT into datavalues (axisdataid, value) VALUES (20,530);
INSERT into datavalues (axisdataid, value) VALUES (20,2428);
INSERT into datavalues (axisdataid, value) VALUES (20,3123);

INSERT into datavalues (axisdataid, value) VALUES (21,1252);
INSERT into datavalues (axisdataid, value) VALUES (21,4152);
INSERT into datavalues (axisdataid, value) VALUES (21,3232);
INSERT into datavalues (axisdataid, value) VALUES (21,3324);
INSERT into datavalues (axisdataid, value) VALUES (21,532);
INSERT into datavalues (axisdataid, value) VALUES (21,3220);
INSERT into datavalues (axisdataid, value) VALUES (21,231);
INSERT into datavalues (axisdataid, value) VALUES (21,1128);
INSERT into datavalues (axisdataid, value) VALUES (21,5129);
INSERT into datavalues (axisdataid, value) VALUES (21,530);
INSERT into datavalues (axisdataid, value) VALUES (21,2428);
INSERT into datavalues (axisdataid, value) VALUES (21,3123);

INSERT into datavalues (axisdataid, value) VALUES (22,1252);
INSERT into datavalues (axisdataid, value) VALUES (22,4152);
INSERT into datavalues (axisdataid, value) VALUES (22,3232);
INSERT into datavalues (axisdataid, value) VALUES (22,3324);
INSERT into datavalues (axisdataid, value) VALUES (22,532);
INSERT into datavalues (axisdataid, value) VALUES (22,3220);
INSERT into datavalues (axisdataid, value) VALUES (22,231);
INSERT into datavalues (axisdataid, value) VALUES (22,1128);
INSERT into datavalues (axisdataid, value) VALUES (22,5129);
INSERT into datavalues (axisdataid, value) VALUES (22,530);
INSERT into datavalues (axisdataid, value) VALUES (22,2428);
INSERT into datavalues (axisdataid, value) VALUES (22,3123);

INSERT into datavalues (axisdataid, value) VALUES (23,1252);
INSERT into datavalues (axisdataid, value) VALUES (23,4152);
INSERT into datavalues (axisdataid, value) VALUES (23,3232);
INSERT into datavalues (axisdataid, value) VALUES (23,3324);
INSERT into datavalues (axisdataid, value) VALUES (23,532);
INSERT into datavalues (axisdataid, value) VALUES (23,3220);
INSERT into datavalues (axisdataid, value) VALUES (23,231);
INSERT into datavalues (axisdataid, value) VALUES (23,1128);
INSERT into datavalues (axisdataid, value) VALUES (23,5129);
INSERT into datavalues (axisdataid, value) VALUES (23,530);
INSERT into datavalues (axisdataid, value) VALUES (23,2428);
INSERT into datavalues (axisdataid, value) VALUES (23,3123);

INSERT into datavalues (axisdataid, value) VALUES (24,1252);
INSERT into datavalues (axisdataid, value) VALUES (24,4152);
INSERT into datavalues (axisdataid, value) VALUES (24,3232);
INSERT into datavalues (axisdataid, value) VALUES (24,3324);
INSERT into datavalues (axisdataid, value) VALUES (24,532);
INSERT into datavalues (axisdataid, value) VALUES (24,3220);
INSERT into datavalues (axisdataid, value) VALUES (24,231);
INSERT into datavalues (axisdataid, value) VALUES (24,1128);
INSERT into datavalues (axisdataid, value) VALUES (24,5129);
INSERT into datavalues (axisdataid, value) VALUES (24,530);
INSERT into datavalues (axisdataid, value) VALUES (24,2428);
INSERT into datavalues (axisdataid, value) VALUES (24,3123);

