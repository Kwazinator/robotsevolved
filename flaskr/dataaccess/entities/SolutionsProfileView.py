class SolutionsProfileView:

    def __init__(self, numMoves=None,game_id=None,name=None,puzzledata=None,created=None,uri=None,WinnerSolutionID=None,WinnerUserId=None,WinnerUsername=None,WinnerCreated=None):
        self.numMoves = numMoves
        self.game_id = game_id
        self.name = name
        self.puzzledata = puzzledata
        self.created = created
        self.uri = uri
        self.WinnerSolutionID = WinnerSolutionID
        self.WinnerUserId = WinnerUserId
        self.WinnerUsername = WinnerUsername
        self.WinnerCreated = WinnerCreated


    def serialize(self):
        return {
            'numMoves': self.numMoves,
            'game_id': self.game_id,
            'name': self.name,
            'puzzledata': self.puzzledata,
            'created': self.created,
            'uri': self.uri,
            'WinnerSolutionID': self.WinnerSolutionID,
            'WinnerUserId': self.WinnerUserId,
            'WinnerUsername': self.WinnerUsername,
            'WinnerCreated': self.WinnerCreated
        }

