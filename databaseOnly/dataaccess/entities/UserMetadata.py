class UserMetadata:

    def __init__(self, userID=None, find_crowns=None, daily_crowns=None, weekly_crowns=0, puzzle_crowns=0):
        self.userID = userID
        self.find_crowns = find_crowns
        self.daily_crowns = daily_crowns
        self.weekly_crowns = weekly_crowns
        self.puzzle_crowns = puzzle_crowns

    def serialize(self):
        return {
            'find_crowns': self.find_crowns,
            'daily_crowns': self.daily_crowns,
            'weekly_crowns': self.weekly_crowns,
            'puzzle_crowns': self.puzzle_crowns
        }

