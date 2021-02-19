from datetime import timedelta
class wc_Solution:

    def __init__(self, id=None, score=None, user_id=None, solutiondata=None, name=None, wc_id=None, submitted=None, playerStateList=None, logintype=None,wins=None):
        self.id = id
        self.submitted = (submitted  - timedelta(hours=4)).strftime('%I:%M:%S %p').lstrip("0").replace(" 0", " ")
        self.score = score
        self.user_id = user_id
        self.solutiondata = solutiondata
        self.name = name
        self.wc_id = wc_id
        self.playerStateList = playerStateList
        self.logintype = logintype
        self.wins = wins

    def serialize(self):
        return {
            'id': self.id,
            'submitted': self.submitted,
            'score': self.score,
            'user_id': self.user_id,
            'name': self.name,
            'wc_id': self.wc_id,
            'wins': self.wins,
            'logintype': self.logintype
        }

