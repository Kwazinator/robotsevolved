from flaskr.dataaccess.GraphDAO import GraphDAO
from flaskr.dataaccess.AxisdataDAO import AxisdataDAO
import json
import datetime
from dateutil.relativedelta import relativedelta
from flask import current_app
import re

class AxisdataService:

    def __init__(self):
        pass

    def get_graph_data_from_axis(self,id):
        return AxisdataDAO().get_graph_data_from_axis(id)
