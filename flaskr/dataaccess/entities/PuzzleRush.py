class PuzzleRush:

    def __init__(self, p_id=None,p_start_time=None,user_id=None,score=None, difficulty=None):
        self.p_id = p_id
        self.p_start_time = p_start_time
        self.user_id = user_id
        self.score = score
        self.difficulty = difficulty


    def serialize(self):
        return {
            'p_id': self.p_id,
            'p_start_time': self.p_start_time,
            'user_id': self.user_id,
            'score': self.score,
            'difficulty': self.difficulty
        }

