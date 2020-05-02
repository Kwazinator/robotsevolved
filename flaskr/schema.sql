DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS user;


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


CREATE TABLE game (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  authorid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  difficulty TEXT,
  puzzledata TEXT NOT NULL,
  uri TEXT NOT NULL
);

CREATE TABLE solutions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameid INTEGER NOT NULL,
  comment TEXT,
  userid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  solutiondata TEXT,
  numMoves INTEGER NOT NULL
);