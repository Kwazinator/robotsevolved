from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.serviceobjects.VideoService import VideoService
import json


bp = Blueprint('index', __name__)


SPOTIFY_POTM_USER_ID = '3gg7qu4ipoukdamwfjsgmx5rv'
SPOTIFY_CLIENT_ID = '637bac1998254664a145e074af00cfe6'
SPOTIFY_CLIENT_SECRET = 'ea78a50f459e4d7fbe58a2778d40a3d6'
SPOTIFY_SCOPES = 'playlist-modify-public'
SPOTIFY_REDIRECT_URI = 'https://potm.rocks'
SPOTIFY_REFRESH_ACCESS_TOKEN = 'AQAy2ONeuem33W34WIDjA8MdxFZtrY7ZWVXBfBbk5K667gPrtkTgfmc6C_XvEKubSHKLMGyPagKB8pL16unUfLuUQavBEgexr7Up37QE6qc5aywI7foTAdthXJh-4utnA2gZkA'
EMAIL_MESSAGE = """dear users of potm blah blah blah"""
GMAIL_SENDER = 'potmwebapp@gmail.com'
GMAIL_PASSWORD = 'apasswordstrong' #get password if use 2factor from google
LOGFILEPATH = "/home/kwaz/flaskapp/PotMWebapp/SystemLogger/logs.txt"
PUBLISHFILEPATH = "/home/kwaz/flaskapp/PotMWebapp/SystemLogger/publishlogs.txt"
TOP_HTML = '<a data-w-id="f584d68a-6baf-e0a3-5c39-421b1f2647d2" style="-webkit-transform:translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotateX(-20DEG) rotateY(10DEG) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotateX(-20DEG) rotateY(10DEG) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotateX(-20DEG) rotateY(10DEG) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1.1, 1.1, 1) rotateX(-20DEG) rotateY(10DEG) rotateZ(0) skew(0, 0);opacity:0;transform-style:preserve-3d" href="#" class="top-post-image w-inline-block"><img src=" ' + '%s' + '" alt="" class="post-image"></a>'+ '<div class="top-post-text"><a href="#" class="category-link"></a>'+ '<a href="#" class="top-post-link-block w-inline-block">'+ '<h2 class="h2">' + '%s' + '</h2>'+ '</a>'+ '<div class="post-short-text"> ' + '%s' + '</div>'+ '<div class="text-block-2">' + '%s' + '</div>'+ '<div class="post-author-text">'+ '<div class="post-author cc-top-margin">By</div><a href="#" class="post-author">' + '%s' + '</a></div>'+ '</div>'
ROW_HTML_BEGINNING = '<div class="_3-posts">' + '<div class="container">' + '<div class="posts-collection-list-wrapper w-dyn-list">' + '<div data-w-id="56790bf8-d103-7ca9-e653-899a2f1bc2cb" style="opacity:0" class="posts-collection-list w-dyn-items w-row">'
ROW_HTML_MIDDLE = '<div class="_3-collection-item w-dyn-item w-col w-col-3"><a href="#" class="posts-image w-inline-block"><img src="'+ '%s' + '" alt=""></a>' + '<div class="post-info-text"><a href="#" class="category-link">'+ '%s'+'</a><br>' + '<a href="#" class="post-title w-inline-block">' + '<h3 class="h3">' + '%s' + '</h3>' + '</a>' + '<div>' + '%s' + '</div>' + '<div class="post-author-text cc-small-thumbnail">' + '<div class="post-author cc-top-margin">By</div><a href="#" class="post-author">'+ '%s' + '</a></div>' + '</div>' + '</div>'
ROW_HTML_END = '</div></div></div></div></div>'




@bp.route('/')
def index():
    url_saved = session.get('url_saved')
    videos = VideoService().get_num_videos(4)
    topvideo = TOP_HTML % (videos[0]['picturelink'],videos[0]['title'],videos[0]['catagory'],videos[0]['description'],videos[0]['author'])
    rowvideo = ROW_HTML_BEGINNING
    for index, video in enumerate(videos):
        if index != 0:
            rowvideo += ROW_HTML_MIDDLE % (video['picturelink'], video['catagory'], video['title'], video['description'], video['author'])
    rowvideo += ROW_HTML_END
    return render_template('thecode/index.html', topvideo=topvideo, rowvideo=rowvideo)

@bp.route('/robots.txt', methods=('GET',))
def robots():
    return "User-agent: * Allow: /"

@bp.route('/getvideos', methods=('GET',))
def getvideos():
    numvideoscurrent = request.args['numvideoscurrent']
    videos = VideoService().select_video_set(numvideoscurrent, 3)
    return jsonify(rownumvideo=json.loads(json.dumps(videos)))

@bp.route('/dothis', methods=('GET',))
def dothis():
    try:
        return "do something specific here"
    except Exception as e:
        return str(e)
    finally:
        pass
    return "ok"

@bp.route('/about', methods=('GET',))
def about():
    return render_template('auth/about.html')


@bp.route('/download')
def downloading():
    playlist_id = request.args.get('playlist_id')
    song_id = request.args.get('song_id')
    return send_file('/home/kwaz/Desktop/flaskapp/PotMWebapp/BlobData/' + str(playlist_id) + '/' + str(song_id) + '.mp3')


@bp.route('/debug/logs')
def debug():
    value = open(LOGFILEPATH, 'r').read()
    return value.replace("\n", "<br>")