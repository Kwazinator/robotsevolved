
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

INSERT into Robots.daily_challenge (g_id1,g_id2,g_id3,g_id4,bestScore) VALUES (454,444,443,442,41);