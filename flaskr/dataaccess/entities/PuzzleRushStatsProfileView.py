class PuzzleRushStatsProfileView:

    def __init__(self, averageScore=None,averageTotal=None,averageDiff=None):
        self.averageScore = averageScore
        self.averageTotal = averageTotal
        self.averageDiff = averageDiff


    def serialize(self):
        return {'None': 'None'}

