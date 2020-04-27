class Axisdata:

    def __init__(self, self_id=None, graphid=None, programid=None,name=None):
        self.id = self_id
        self.graphid = graphid
        self.programid = programid
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'graphid': self.graphid,
            'programid': self.programid,
            'name': self.name
        }

