from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GraphService import GraphService
import json
bp = Blueprint('index', __name__)

@bp.route('/')
def index():
    #print(json.dumps(GraphService().get_graph_data(1,3,0,3), indent=4))

    #get_graph_data(userid,interval,offset,numbergraphs
    graphdata = json.dumps(GraphService().get_graph_data(1,3,0,3))
    return render_template('index.html',graphdata=graphdata)

@bp.route('/about')
def about():
    return 'yolo'

@bp.route('/getgraph')
def graph():
    offset = request.args.get('offset')
    num = request.args.get('num')
    graphdata = json.dumps(GraphService().get_graph_data(1,3,offset,num))
    return jsonify(graphdata=json.loads(graphdata))

@bp.route('/insertgraph')
def insertgraph():
    name = request.args.get('name')
    dataid = request.args.get('dataid')
    GraphService().insert_graph(name,dataid)
    return 'OK'