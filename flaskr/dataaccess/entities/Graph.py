class Graph:

    def __init__(self, self_id=None, name=None, type=None, description=None, authorid=None,authorname=None, catagory=None):
        self.id = self_id
        self.name = name
        self.type = type
        self.description = description
        self.authorid = authorid
        self.authorname = authorname
        self.catagory = catagory

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'authorid': self.authorid,
            'authorname': self.authorname,
            'catagory': self.catagory
        }

