#!/home/flaskappdev/flaskappdev/flaskappenv/bin/python3.6
import flaskr

application = flaskr.create_app()

if __name__ == "__main__":
    application.run(host='0.0.0.0')
