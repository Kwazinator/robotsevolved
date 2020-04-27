DROP TABLE IF EXISTS graph;
DROP TABLE IF EXISTS axisdata;
DROP TABLE IF EXISTS datapairs;
DROP TABLE IF EXISTS program;
DROP TABLE IF EXISTS datavalues;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS usertograph;


CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  logintype TEXT NOT NULL, --google,facebook,spotify, etc
  accountId TEXT,
  profilePicture TEXT,
  email TEXT,
  UNIQUE(logintype, accountId) ON CONFLICT REPLACE
);

CREATE TABLE usertograph (
    userid INTEGER NOT NULL,
    graphid INTEGER NOT NULL,
    ordernum INTEGER NOT NULL,
    FOREIGN KEY (userid)  REFERENCES user(id),
    FOREIGN KEY (graphid) REFERENCES graph(id)
);


CREATE TABLE graph (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  authorid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  catagory TEXT
);

CREATE TABLE axisdata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    graphid INTEGER NOT NULL,
    programid INTEGER NOT NULL,
    name TEXT,
    FOREIGN KEY (graphid) REFERENCES graph (id)
);

CREATE TABLE program (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    interval INT NOT NULL
);


CREATE TABLE datavalues (
    axisdataid INTEGER NOT NULL,
    value TEXT,
    fetched TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (axisdataid) REFERENCES axisdata (id)
);

CREATE TABLE datapairs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataidx INTEGER NOT NULL,
    dataidy INTEGER NOT NULL
);