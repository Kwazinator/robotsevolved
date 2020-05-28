DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS generated_games;


CREATE TABLE user (
  userID INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  logintype TEXT NOT NULL, --google,facebook,spotify, etc
  accountID TEXT,
  profilePicture TEXT,
  email TEXT,
  activeFlag TEXT,
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
  uri TEXT NOT NULL,
  FOREIGN KEY (authorid) REFERENCES user(id)
);

CREATE TABLE solutions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameid INTEGER NOT NULL,
  comment TEXT,
  userid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  solutiondata TEXT,
  numMoves INTEGER NOT NULL,
  FOREIGN KEY (gameid) REFERENCES game(id),
  FOREIGN KEY (userid) REFERENCES user(id)
);

CREATE TABLE generated_games (
g_id INTEGER PRIMARY KEY AUTOINCREMENT,
g_name TEXT NOT NULL,
g_difficulty TEXT,
g_puzzledata TEXT NOT NULL,
g_uri TEXT NOT NULL,
g_moves INTEGER NOT NULL
);