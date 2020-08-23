class GamesProfileView:

    def __init__(self, numMoves=None,user_id=None,username=None,profilepicture=None,game_id=None,name=None,puzzledata=None,created=None,uri=None,plays=None,votes=None,hasVoted=None):
        self.numMoves = numMoves
        self.username = username
        self.user_id = user_id
        self.profilepicture = profilepicture
        self.game_id = game_id
        self.name = name
        self.puzzledata = puzzledata
        self.created = created
        self.uri = uri
        self.plays = plays
        self.votes = votes
        self.hasVoted = hasVoted


    def serialize(self):
        return {
            'numMoves': self.numMoves,
            'username': self.username,
            'user_id': self.user_id,
            'profilepicture': self.profilepicture,
            'game_id': self.game_id,
            'name': self.name,
            'puzzledata': self.puzzledata,
            'created': self.created,
            'uri': self.uri,
            'plays': self.plays,
            'votes': self.votes,
            'hasVoted': self.hasVoted
        }

