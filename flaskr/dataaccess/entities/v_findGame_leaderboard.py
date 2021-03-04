class v_findGame_leaderboard:

    def __init__(self, RealWinnerUsername=None, WinnerUserID=None, Crowns=None):
        self.Crowns = Crowns
        self.RealWinnerUsername = RealWinnerUsername
        self.WinnerUserID = WinnerUserID


    def serialize(self):
        return {
            'Crowns': self.Crowns,
            'username': self.RealWinnerUsername
        }