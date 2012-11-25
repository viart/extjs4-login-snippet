from flask import Flask, render_template, request, jsonify, session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3123_sd'


USER_DATA = {'id': 1, 'username': 'admin'}
SESS_KEY = 'authorized'


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():

    ret = {'errors': {'msg': 'Wrong username or password (try admin/admin)'}}

    if (request.form['username'] == 'admin'
        and request.form['password'] == 'admin'):
        if SESS_KEY in session:
            ret = {'errors': {'msg': 'Already authorized'}}
        else:
            session[SESS_KEY] = True
            ret = {'success': True, 'user': USER_DATA}

    return jsonify(ret)


@app.route('/login/check', methods=['GET'])
def login_check():
    if SESS_KEY in session:
        ret = {'success': True, 'user': USER_DATA}
    else:
        ret = {'errors': {'msg': 'Session not found'}}

    return jsonify(ret)


@app.route('/logout', methods=['GET', 'POST', 'DELETE'])
def logout():
    if SESS_KEY in session:
        session.pop(SESS_KEY, None)

    return jsonify({'success': True})


@app.route('/ips', methods=['GET'])
def api_ips():
    if SESS_KEY in session:
        ret = {
            'success': True,
            'ips': [
                {'ip': '127.0.0.1', 'lastHitAt': 1353645944, 'hits': 100},
                {'ip': '10.0.0.1', 'lastHitAt': 1323342944, 'hits': 190},
                {'ip': '172.16.0.1', 'lastHitAt': 1353145944, 'hits': 300},
                {'ip': '192.168.0.1', 'lastHitAt': 1313041944, 'hits': 160}
            ]
        }
    else:
        ret = {'errors': {'msg': 'Access deny'}}

    return jsonify(ret)


if __name__ == '__main__':
    app.debug = True
    app.run()
