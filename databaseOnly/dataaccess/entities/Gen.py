class Gen:

    def __init__(self, g_id=None, g_name=None, g_difficulty=None, g_puzzledata=None, g_uri=None, g_moves=None, g_solutiondata=None):
        self.g_id = g_id
        self.g_name = g_name
        self.g_difficulty = g_difficulty
        self.g_puzzledata = g_puzzledata
        self.g_uri = g_uri
        self.g_moves = g_moves
        self.g_solutiondata = g_solutiondata


    def serialize(self):
        return {
            'g_id': self.g_id,
            'g_name': self.g_name,
            'g_difficulty': self.g_difficulty,
            'g_puzzledata': self.g_puzzledata,
            'g_uri': self.g_uri,
            'g_moves': self.g_moves,
            'g_solutiondata': self.g_solutiondata
        }

