class PuzzleRushStatsProfileView:

    def __init__(self, averageScore=None,averageTotal=None,averageDiff=None):
        self.averageScore = averageScore
        self.averageTotal = averageTotal
        self.averageDiff = averageDiff


    def serialize(self):
        return {
            'averageScore': float(self.averageScore),
            'averageTotal': float(self.averageTotal),
            'averageDiff': float(self.averageDiff)
        }

