from flaskr.dataaccess.entities.Gen import Gen
import json
class Daily_Challenge_History_View:

    def __init__(self, dc_id,bestScore,g_id1,gameName1,gameDifficulty1,gameData1,gameUri1,gameMoves1,gameSolutionData1,
                         g_id2,gameName2,gameDifficulty2,gameData2,gameUri2,gameMoves2,gameSolutionData2,
                         g_id3,gameName3,gameDifficulty3,gameData3,gameUri3,gameMoves3,gameSolutionData3,
                         g_id4,gameName4,gameDifficulty4,gameData4,gameUri4,gameMoves4,gameSolutionData4,
                        dcsID,score,user_id,solutiondata,name,submitted,playerStateList):
        self.dc_id = dc_id
        self.bestScore = bestScore
        self.games = [Gen(g_id1,gameName1,gameDifficulty1,gameData1,gameUri1,gameMoves1,gameSolutionData1).serialize(),
                      Gen(g_id2,gameName2,gameDifficulty2,gameData2,gameUri2,gameMoves2,gameSolutionData2).serialize(),
                      Gen(g_id3,gameName3,gameDifficulty3,gameData3,gameUri3,gameMoves3,gameSolutionData3).serialize(),
                      Gen(g_id4,gameName4,gameDifficulty4,gameData4,gameUri4,gameMoves4,gameSolutionData4).serialize()]
        self.score = score
        self.dcsID = dcsID
        self.user_id = user_id
        self.solutiondata = solutiondata
        self.name = name
        self.submitted = submitted
        self.playerStateList = playerStateList


    def serialize(self):
        return {
            'dc_id': self.dc_id,
            'bestScore': self.bestScore,
            'games': self.games,
            'user_id': self.user_id,
            'nameSubmitted': self.name,
            'scoreSubmitted': self.score,
            'submitted': self.submitted,
            'playerStateList': self.playerStateList,
            'dcsID': self.dcsID,
            'solutionDataSubmitted': self.solutiondata
        }

