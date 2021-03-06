class Solutions:

    def __init__(self, id=None, gameid=None, comment=None, userid=None, authorname=None,solutiondata=None,numMoves=None,created=None):
        self.id = id
        self.gameid = gameid
        self.comment = comment
        self.userid = userid
        self.authorname = authorname
        self.solutiondata = solutiondata
        self.numMoves = numMoves
        self.created = created

    def serialize(self):
        return {
            'id': self.id,
            'gameid': self.gameid,
            'comment': self.comment,
            'userid': self.userid,
            'authorname': self.authorname,
            'numMoves': self.numMoves,
            'created': self.created
        }

