from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
from flaskr.services.UserService import UserService
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flaskr.services.LeaderboardService import LeaderboardService
from flask_jwt_extended import jwt_required
import json
import re
import flaskr.auth as auth
from flaskr.solutionChecker import checkSolution

bp = Blueprint('leaderboard', __name__)



@bp.route('/leaderboard')
@jwt_required(optional=True)
def leaderboard():
    v_dailyChallenge_leaderboard = LeaderboardService().get_daily_challenge_leaderboard()
    v_findGame_leaderboard = LeaderboardService().get_find_game_leaderboard()
    v_puzzle_rush_leaderboard = LeaderboardService().get_puzzle_rush_leaderboard()
    return jsonify(dailyChallenge_leaderboard=v_dailyChallenge_leaderboard, findGame_leaderboard=v_findGame_leaderboard, puzzle_rush_leaderboard=v_puzzle_rush_leaderboard)