class v_findGame_leaderboard:

    def __init__(self, numMoves=None):
        self.numMoves = numMoves


    def serialize(self):
        return {
            'numMoves': self.numMoves,
        }