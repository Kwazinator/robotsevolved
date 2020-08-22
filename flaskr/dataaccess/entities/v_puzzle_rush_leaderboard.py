class v_puzzle_rush_leaderboard:

    def __init__(self, numMoves=None):
        self.numMoves = numMoves


    def serialize(self):
        return {
            'numMoves': self.numMoves,
        }