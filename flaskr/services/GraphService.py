from flaskr.dataaccess.GraphDAO import GraphDAO
from flaskr.services.AxisdataService import AxisdataService
import json
import datetime
from dateutil.relativedelta import relativedelta
from flask import current_app
import re

class GraphService:

    def __init__(self):
        pass

    def get_graph_item_by_names(self, name):
        #maybe do some regex
        name = name.lower() #make lowercase
        return GraphDAO().get_graph_item_by_names(name)

    def insert_graph(self, name, dataid):
        return GraphDAO().insert_graph(name, dataid)

    def get_graph_data(self,userid,interval,start,num):
        graphs = GraphDAO().get_graphs_of_user(userid,start,num)
        if graphs is None:
            return None
        toreturn = list()
        for graph in graphs:
            graphaxis = GraphDAO().get_graph_axis(graph.id)
            graphdatalist = list()
            for axis in graphaxis:
                graphdatalist.append(AxisdataService().get_graph_data_from_axis(axis['id']))
            toreturn.append(
                {
                    'graph': graph.serialize(),
                    'graphaxis': graphaxis,
                    'graphdata': graphdatalist
                }
            )

        return toreturn

