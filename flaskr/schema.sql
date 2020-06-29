DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS generated_games;
DROP TABLE IF EXISTS puzzle_rush_to_generated_games;
DROP TABLE IF EXISTS puzzle_rush;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  logintype TEXT NOT NULL, 
  accountID TEXT,
  profilePicture TEXT,
  email TEXT,
  activeFlag TEXT
);


CREATE TABLE game (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  authorid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  difficulty TEXT,
  puzzledata TEXT NOT NULL,
  uri TEXT NOT NULL,
  created datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (authorid) REFERENCES user(id)
);

CREATE TABLE solutions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  gameid INTEGER NOT NULL,
  comment TEXT,
  userid INTEGER NOT NULL,
  authorname TEXT NOT NULL,
  solutiondata TEXT,
  numMoves INTEGER NOT NULL,
  created datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameid) REFERENCES game(id),
  FOREIGN KEY (userid) REFERENCES user(id)
);

CREATE TABLE generated_games (
g_id INTEGER PRIMARY KEY AUTO_INCREMENT,
g_name TEXT NOT NULL,
g_difficulty TEXT,
g_puzzledata TEXT NOT NULL,
g_uri TEXT NOT NULL,
g_moves INTEGER NOT NULL,
g_solutiondata TEXT NOT NULL
);

CREATE TABLE puzzle_rush (
p_id INTEGER PRIMARY KEY AUTO_INCREMENT,
p_start_time datetime DEFAULT CURRENT_TIMESTAMP,
user_id INTEGER,
score INTEGER DEFAULT 0,
difficulty TEXT NOT NULL,
totalMoves INTEGER DEFAULT NULL,
differenceFrom INTEGER DEFAULT NULL,
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE puzzle_rush_to_generated_games (
    g_id INTEGER NOT NULL,
    pr_id INTEGER NOT NULL,
    PRIMARY KEY(g_id,pr_id),
    FOREIGN KEY (g_id) REFERENCES generated_games(g_id),
    FOREIGN KEY (pr_id) REFERENCES puzzle_rush(p_id)
);

CREATE TABLE daily_challenge (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created datetime DEFAULT CURRENT_TIMESTAMP,
    g_id1 MEDIUMTEXT NOT NULL,
    g_id2 MEDIUMTEXT NOT NULL,
    g_id3 MEDIUMTEXT NOT NULL,
    g_id4 MEDIUMTEXT NOT NULL,
    bestScore INTEGER NOT NULL
);

CREATE TABLE daily_challenge_submit (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    score INTEGER NOT NULL,
    user_id INTEGER DEFAULT 0,
    solutiondata MEDIUMTEXT NOT NULL,
    name TEXT NOT NULL,
    dc_id INTEGER NOT NULL,
    submitted datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dc_id) REFERENCES daily_challenge(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
