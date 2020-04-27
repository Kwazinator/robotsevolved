from flaskr.db import get_db
from flaskr.dataaccess.entities.Graph import Graph
from flaskr.dataaccess.entities.Axisdata import Axisdata
class AxisdataDAO:

    def __init__(self):
        pass

    def get_graph_data_from_axis(self,id):

        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('SELECT d.value,d.fetched FROM axisdata a JOIN datavalues d on a.id = d.axisdataid WHERE a.id=?',(id,)).fetchall()
        values = list()
        for item in row:
            #values.append((item[0],str(item[1])))
            values.append(item[0])
        return values #this is returning a list of tuples
