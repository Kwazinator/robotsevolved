class Game:

    def __init__(self, id=None, name=None, type=None, description=None, authorid=None, authorname=None, difficulty=None, puzzledata=None,uri=None, created=None):
        self.id = id
        self.name = name
        self.type = type
        self.description = description
        self.authorid = authorid
        self.authorname = authorname
        self.difficulty = difficulty
        self.puzzledata = puzzledata
        self.uri = uri
        self.created = created

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'authorid': self.authorid,
            'authorname': self.authorname,
            'difficulty': self.difficulty,
            'puzzledata': self.puzzledata,
            'uri': self.uri,
            'created': self.created
        }

