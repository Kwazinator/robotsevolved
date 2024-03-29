import sqlite3
import click
from flask import current_app, g
from flask.cli import with_appcontext
import flaskr
import mysql.connector

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
                                        host=current_app.config['MYSQL_HOST'],
                                        user=current_app.config['MYSQL_USER'],
                                        password=current_app.config['MYSQL_PASSWORD'],
                                        database=current_app.config['MYSQL_DB'],
                                        use_pure=True)
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def custom_code_db():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""SELECT * from user""")
    return cursor.fetchall()

def insert_db():
    db = get_db()
    cursor = db.cursor()
    with current_app.open_resource('insert.sql') as f:
        cursor.executescript(f.read().decode('utf8'))
        
@click.command('insert-db')
@with_appcontext
def insert_db_command():
    """Clear the existing data and create new Dummy data, also sets AUTOINCREMENTS to 1."""
    insert_db()
    click.echo('Inserted into database.')


@click.command('test')
@with_appcontext
def test_db_command():
    app = flaskr.create_app()

@click.command('custom-db')
@with_appcontext
def custom_db_command():
    """Runs the custom code on the database"""
    for item in custom_code_db():
        click.echo('*********************************************')
        for attribute in item:
            click.echo(str(attribute))
    
        
@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(test_db_command)
    app.cli.add_command(init_db_command)
    app.cli.add_command(insert_db_command)
    app.cli.add_command(custom_db_command)
