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
    playerStateList mediumtext NOT NULL,
    FOREIGN KEY (dc_id) REFERENCES daily_challenge(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);



CREATE TABLE vote (
    vote_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    votedata TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id)
);

CREATE TABLE weekly_challenge_submit (
    wcs_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    score INTEGER NOT NULL,
    user_id INTEGER DEFAULT 0,
    solutiondata MEDIUMTEXT NOT NULL,
    name TEXT NOT NULL,
    wc_id INTEGER NOT NULL,
    submitted datetime DEFAULT CURRENT_TIMESTAMP,
    playerStateList mediumtext NOT NULL,
    FOREIGN KEY (wc_id) REFERENCES weekly_challenge(wc_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);


CREATE TABLE daily_evolution (
    dce_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    created datetime DEFAULT CURRENT_TIMESTAMP,
    g_id1 MEDIUMTEXT NOT NULL,
    g_id2 MEDIUMTEXT NOT NULL,
    g_id3 MEDIUMTEXT NOT NULL,
    g_id4 MEDIUMTEXT NOT NULL,
    type MEDIUMTEXT NOT NULL
);

CREATE TABLE daily_evolution_submit (
    des_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    score INTEGER NOT NULL,
    user_id INTEGER DEFAULT 0,
    solutiondata MEDIUMTEXT NOT NULL,
    name TEXT NOT NULL,
    dce_id INTEGER NOT NULL,
    submitted datetime DEFAULT CURRENT_TIMESTAMP,
    playerStateList mediumtext NOT NULL,
    startTime datetime DEFAULT CURRENT_TIMESTAMP,
    completed int DEFAULT 1,
    FOREIGN KEY (dce_id) REFERENCES daily_evolution(dce_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);


CREATE VIEW user_medal_counts AS
SELECT
    u.user_id,
    u.username,
    COALESCE(gold.number_of_gold_medals, 0) AS gold_medals,
    COALESCE(silver.number_of_silver_medals, 0) AS silver_medals,
    COALESCE(bronze.number_of_bronze_medals, 0) AS bronze_medals
FROM
    user AS u
LEFT JOIN (
    -- Gold medal subquery
    SELECT
        dcs.user_id,
        COUNT(*) as number_of_gold_medals
    FROM
        daily_challenge_submit AS dcs
    JOIN
        daily_challenge AS dc ON dcs.dc_id = dc.dc_id
    WHERE
        dcs.submitted >= CURDATE() - INTERVAL DAY(CURDATE())-1 DAY
        AND dcs.completed = 1
        AND dcs.score = dc.bestScore
        AND TIMESTAMPDIFF(SECOND, dcs.starttime, dcs.submitted) <
            CASE
                WHEN dc.bestScore <= 40 THEN 420
                WHEN dc.bestScore <= 45 THEN 420 + ((dc.bestScore - 40) * 15)
                WHEN dc.bestScore <= 50 THEN 495 + ((dc.bestScore - 45) * 30)
                WHEN dc.bestScore <= 55 THEN 645 + ((dc.bestScore - 50) * 50)
                ELSE 895 + ((dc.bestScore - 55) * 70)
            END
    GROUP BY
        dcs.user_id
) AS gold ON u.user_id = gold.user_id
LEFT JOIN (
    -- Silver medal subquery
    SELECT
        dcs.user_id,
        COUNT(*) as number_of_silver_medals
    FROM
        daily_challenge_submit AS dcs
    JOIN
        daily_challenge AS dc ON dcs.dc_id = dc.dc_id
    WHERE
        dcs.submitted >= CURDATE() - INTERVAL DAY(CURDATE())-1 DAY
        AND dcs.completed = 1
        AND dcs.score = dc.bestScore
        AND TIMESTAMPDIFF(SECOND, dcs.starttime, dcs.submitted) BETWEEN
            CASE
                WHEN dc.bestScore <= 40 THEN 420
                WHEN dc.bestScore <= 45 THEN 420 + ((dc.bestScore - 40) * 15)
                WHEN dc.bestScore <= 50 THEN 495 + ((dc.bestScore - 45) * 30)
                WHEN dc.bestScore <= 55 THEN 645 + ((dc.bestScore - 50) * 50)
                ELSE 895 + ((dc.bestScore - 55) * 70)
            END
        AND
            CASE
                WHEN dc.bestScore <= 40 THEN 420 * 1.6
                WHEN dc.bestScore <= 45 THEN (420 + ((dc.bestScore - 40) * 15)) * 1.6
                WHEN dc.bestScore <= 50 THEN (495 + ((dc.bestScore - 45) * 30)) * 1.6
                WHEN dc.bestScore <= 55 THEN (645 + ((dc.bestScore - 50) * 50)) * 1.6
                ELSE (895 + ((dc.bestScore - 55) * 70)) * 1.6
            END
    GROUP BY
        dcs.user_id
) AS silver ON u.user_id = silver.user_id
LEFT JOIN (
    -- Bronze medal subquery
    SELECT
        dcs.user_id,
        COUNT(*) as number_of_bronze_medals
    FROM
        daily_challenge_submit AS dcs
    JOIN
        daily_challenge AS dc ON dcs.dc_id = dc.dc_id
    WHERE
        dcs.submitted >= CURDATE() - INTERVAL DAY(CURDATE())-1 DAY
        AND dcs.completed = 1
        AND dcs.score = dc.bestScore
        AND TIMESTAMPDIFF(SECOND, dcs.starttime, dcs.submitted) BETWEEN
            CASE
                WHEN dc.bestScore <= 40 THEN 420 * 1.6
                WHEN dc.bestScore <= 45 THEN (420 + ((dc.bestScore - 40) * 15)) * 1.6
                WHEN dc.bestScore <= 50 THEN (495 + ((dc.bestScore - 45) * 30)) * 1.6
                WHEN dc.bestScore <= 55 THEN (645 + ((dc.bestScore - 50) * 50)) * 1.6
                ELSE (895 + ((dc.bestScore - 55) * 70)) * 1.6
            END
        AND
            CASE
                WHEN dc.bestScore <= 40 THEN 420 * 2.2
                WHEN dc.bestScore <= 45 THEN (420 + ((dc.bestScore - 40) * 15)) * 2.2
                WHEN dc.bestScore <= 50 THEN (495 + ((dc.bestScore - 45) * 30)) * 2.2
                WHEN dc.bestScore <= 55 THEN (645 + ((dc.bestScore - 50) * 50)) * 2.2
                ELSE (895 + ((dc.bestScore - 55) * 70)) * 2.2
            END
    GROUP BY
        dcs.user_id
) AS bronze ON u.user_id = bronze.user_id
WHERE
    COALESCE(gold.number_of_gold_medals, 0) > 0
    OR COALESCE(silver.number_of_silver_medals, 0) > 0
    OR COALESCE(bronze.number_of_bronze_medals, 0) > 0
