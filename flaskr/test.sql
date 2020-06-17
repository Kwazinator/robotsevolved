
--all these queries should be combined into a 3 Views:

------------------------------------------GamesProfileView----------------------------------------------------------
--#####################################################################################################################
--Get all the games.* created by the user and the best solutions.score of the games
--AND the user.id, user.username and user.profilePicture of the person with the best score.
SELECT


------------------------------------------SolutionsProfileView--------------------------------------------------------
--#####################################################################################################################
--Get all of the games.* of the games where the user has a solution in.
--AND get the solutions.numMoves, solutions.comment, user.id, user.username, user.profilePicture of user with the best solution.
SELECT



------------------------------------------PuzzleRushStatsProfileView--------------------------------------------------
--#####################################################################################################################
--Get Percentile of the user's average puzzlerush.score and puzzlefush.diffVal (over the timeframe of 1 day and 1 week and 1 month)
--take above averages for puzzlerush.score and get percentile against all puzzlerush.scores in the entire database (DISCLUDING puzzle rush games with score of 0)
SELECT

