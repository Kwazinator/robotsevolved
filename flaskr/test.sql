
--all these queries should be combined into a 3 Views:

------------------------------------------GamesProfileView----------------------------------------------------------
--#####################################################################################################################
--Get all the games.* created by the user and the best solutions.score of the games
--AND the user.id, user.username and user.profilePicture of the person with the best score.
select min(numMoves), u.id as UserID, u.username as Username, u.profilePicture as profilePicture, g.id as gameID, g.name as GameName, g.puzzledata, g.created, g.uri
from solutions s right join
game g on s.gameid = g.id left join
`user` u on u.id = s.userid
where authorid = '1'
group by g.id


------------------------------------------SolutionsProfileView--------------------------------------------------------
--#####################################################################################################################
--Get all of the games.* of the games where the user has a solution in.
--AND get the solutions.numMoves, solutions.comment, user.id, user.username, user.profilePicture of user with the best solution.
SELECT



------------------------------------------PuzzleRushStatsProfileView--------------------------------------------------
--#####################################################################################################################
--Get average puzzlerush.score and puzzlefush.diffVal of user (over the timeframe of 1 day and 1 week and 1 month)
--take above averages for puzzlerush.score and get percentile against all puzzlerush.scores in the entire database (DISCLUDING puzzle rush games with score of 0)
SELECT

-- GamesProfileView
select min(numMoves), u.id as UserID, u.username as Username, u.profilePicture as profilePicture, g.id as gameID, g.name as GameName, g.puzzledata, g.created, g.uri
from solutions s right join
game g on s.gameid = g.id left join
`user` u on u.id = s.userid
where authorid = '1'
group by g.id


-- SolutionsProfileView
select min(numMoves), g.id as gameID, g.name as GameName, g.puzzledata, g.created, g.uri
from solutions s right join
game g on s.gameid = g.id left join
`user` u on u.id = s.userid
where s.userid = '2'
group by g.id






SELECT * from daily_challenge dc
JOIN generated_games gg on gg.g_id = dc.g_id1 or gg.g_id = dc.g_id2 or gg.g_id = dc.g_id3 or gg.g_id = dc.g_id4
Group By dc.id
ORDER by dc.created ASC LIMIT 10

--
--Daily Challenge History View
--each row represents a daily challenge up to say 10 rows
--**************************
-- Info needed for each daily challenge in order
-- * of daily challenge (dc_id, created,g_id1,g_id2,g_id3,g_id4,bestScore)
-- * of generated_game where the g_id = g_id1
-- * of generated_game where the g_id = g_id2
-- * of generated_game where the g_id = g_id3
-- * of generated_game where the g_id = g_id4
-- * of daily_challenge_submit of the LOWEST score and Most recent time
--
--

SELECT * from daily_challenge dc
JOIN generated_games gg1 on gg1.g_id = dc.g_id1
JOIN generated_games gg2 on gg2.g_id = dc.g_id2
JOIN generated_games gg3 on gg3.g_id = dc.g_id3
JOIN generated_games gg4 on gg4.g_id = dc.g_id4
JOIN daily_challenge_submit dcs on dcs.id =
  (SELECT id
    from daily_challenge_submit dcs2
    WHERE dcs2.dc_id = dc.id
    ORDER by SCORE ASC LIMIT 1)
WHERE dc.id != (
    SELECT MAX(id)
    from daily_challenge
    WHERE CURRENT_TIMESTAMP() >= created)
Group By dc.id
ORDER by dc.created ASC LIMIT 10

--
--
--date of daily challenge, lowest possible # of moves per puzzle, lowest possible moves per puzzle, lowest possible solution (maybe even for each puzzle and even the sequence), the uri of the puzzle.
--top 5 submitters in order and their scores and whether or not their are verified and how many daily challenges they have won before,
--
--

-- Puzzle Rush Average
select AVG(score), AVG(totalMoves), AVG(differenceFrom) from puzzle_rush pr
where user_id = '2' and totalMoves is not null

-- Puzzle Rush Best Score
SELECT * from puzzle_rush pr
where user_id = '2' and totalMoves is not null
ORDER BY SCORE DESC LIMIT 1

-- Puzzle Rush Lowest Moves
SELECT * from puzzle_rush pr
where user_id = '2' and totalMoves is not null
ORDER BY totalMoves asc LIMIT 1

-- Puzzle Rush Lowest Diffrence
SELECT * from puzzle_rush pr
where user_id = '2' and totalMoves is not null
ORDER BY differenceFrom asc LIMIT 1




--INSERT DAILY CHALLENGE
INSERT into Robots.daily_challenge (g_id1,g_id2,g_id3,g_id4,bestScore) VALUES (1,2,3,4,41);
INSERT into `Robots-Dev`.daily_challenge (g_id1,g_id2,g_id3,g_id4,bestScore) VALUES (8001,8002,8003,8004,8041);

--DB MIGRATION
select * from `Robots-Dev`.generated_games gg WHERE g_uri!='abcdefg' LIMIT 1
DELETE from `Robots-Dev`.generated_games WHERE g_uri='abcdefg';
DELETE from `Robots`.generated_games WHERE 1=1;
DELETE from `Robots`.puzzle_rush_to_generated_games WHERE 1=1;
DELETE from `Robots`.puzzle_rush WHERE 1=1;
DELETE from `Robots`.daily_challenge_submit WHERE 1=1;
DELETE from `Robots`.daily_challenge WHERE 1=1;
INSERT into `Robots-Dev`.daily_challenge (g_id1,g_id2,g_id3,g_id4,bestScore) VALUES (1,2,3,4,41);