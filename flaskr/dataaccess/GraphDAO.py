from flaskr.db import get_db
from flaskr.dataaccess.entities.Graph import Graph
from flaskr.dataaccess.entities.Axisdata import Axisdata
class GraphDAO:

    def __init__(self):
        pass

    def insert_graph(self,name, dataid):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO graph (name,dataid) VALUES (?,?)',(name,dataid))
        db.commit()
        return

    def get_graph_axis(self,id):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('SELECT a.id,a.graphid,a.programid,a.name FROM axisdata a JOIN graph g on a.graphid=g.id WHERE g.id=?',(id,)).fetchall()
        axislist = list()
        for item in row:
            axislist.append(Axisdata(item[0],item[1],item[2],item[3]).serialize())
        return axislist


    def get_graphs_of_user(self, id,start,num):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('SELECT * from graph g JOIN usertograph ug ON g.id=ug.graphid WHERE ug.userid=? ORDER BY ug.ordernum ASC LIMIT ? OFFSET ?',(id,num,start)).fetchall()
        graphlist = list()
        #row = cursor.execute('SELECT ug.graphid from user u JOIN usertograph ug on u.id=ug.userid WHERE u.id=? ORDER BY ug.order ASC LIMIT ? OFFSET ?'(id,num,start)).fetchall()
        if row is not None:
            for item in row:
                graphlist.append(Graph(item[0],item[1],item[2],item[3],item[4],item[5],item[6]))
            return graphlist
        else:
            return None


    def get_graph_item_by_names(self, name):
        db = get_db()
        cursor = db.cursor()
        try:
            row = cursor.execute('SELECT * FROM graph WHERE name=?',(name,)).fetchall()
            graphlist = list()
            for item in row:
                graphlist.append(Graph(item[0],item[1],item[2],item[3],item[4],item[5],item[6]))
            return graphlist
        except Exception as e:
            print('error in get_graph_by_name')
            print(e)
            return None
        finally:
            pass

    def get_graph_by_id(self, id):
        db = get_db()
        cursor = db.cursor()
        try:
            row = cursor.execute('SELECT * FROM graph WHERE id=?',(id,)).fetchone()
            return Graph(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
        except Exception as e:
            print('error in get_graph_by_id')
            print(e)
            return None
        finally:
            pass


    def insert_menu_item(self, name, price, restaurant):
        db = get_db()
        cursor = db.cursor()
        try:
            row = cursor.execute('INSERT into MenuItems (name,price,restaurant) VALUES (?,?,?)', (name,price,restaurant))
            db.commit()
            #row becomes the primary key of the newly created item
        except Exception as e:
            print('error in insert_menu_item')
            print(e)
            return None
        finally:
            pass
