class v_dailyChallenge_leaderboard:

    def __init__(self, Crowns=None, user_id=None, username=None):
        self.Crowns = Crowns
        self.user_id = user_id
        self.username = username


    def serialize(self):
        return {
            'Crowns': self.Crowns,
            'username': self.username
        }

