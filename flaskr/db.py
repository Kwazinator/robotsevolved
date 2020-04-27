import sqlite3
import click
from flask import current_app, g
from flask.cli import with_appcontext
import flaskr

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

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
    return db.execute('SELECT * from graph g JOIN usertograph ug ON g.id=ug.graphid WHERE ug.userid=1 ORDER BY ug.ordernum ASC LIMIT 3 OFFSET 0')

def insert_db():
    db = get_db()
    with current_app.open_resource('insert.sql') as f:
        db.executescript(f.read().decode('utf8'))
        
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
