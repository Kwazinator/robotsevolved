class Daily_Challenge_Solution:

    def __init__(self, id=None, score=None, user_id=None, solutiondata=None, name=None, dc_id=None, submitted=None):
        self.id = id
        self.submitted = submitted
        self.score = score
        self.user_id = user_id
        self.solutiondata = solutiondata
        self.name = name
        self.dc_id = dc_id

    def serialize(self):
        return {
            'id': self.id,
            'submitted': self.submitted,
            'score': self.score,
            'user_id': self.user_id,
            'name': self.name,
            'dc_id': self.dc_id
        }

