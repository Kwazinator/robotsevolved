class PuzzleRushStatsProfileView:

    def __init__(self, maxeasy,maxmedium,maxhard,maxexhard,averageeasy,averagemedium,averagehard,averageexhard,averagediffeasy,averagediffmedium,averagediffhard,averagediffexhard):
        self.maxeasy = str(maxeasy)
        self.maxmedium = str(maxmedium)
        self.maxhard = str(maxhard)
        self.maxexhard = str(maxexhard)
        self.averageeasy = str(averageeasy)
        self.averagemedium = str(averagemedium)
        self.averagehard = str(averagehard)
        self.averageexhard = str(averageexhard)
        self.averagediffeasy = str(averagediffeasy)
        self.averagediffmedium = str(averagediffmedium)
        self.averagediffhard = str(averagediffhard)
        self.averagediffexhard = str(averagediffexhard)

    def serialize(self):
        return {
                'maxeasy': self.maxeasy,
                'maxmedium': self.maxmedium,
                'maxhard': self.maxhard,
                'maxexhard': self.maxexhard,
                'averageeasy': self.averageeasy,
                'averagemedium': self.averagemedium,
                'averagehard': self.averagehard,
                'averageexhard': self.averageexhard,
                'averagediffeasy': self.averagediffeasy,
                'averagediffmedium': self.averagediffmedium,
                'averagediffhard': self.averagediffhard,
                'averagediffexhard': self.averagediffexhard
        }


