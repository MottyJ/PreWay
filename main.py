import os
from pymysql import connect, cursors
import bottle
import json



connection = connect(host='localhost',
                     user='root',
                     password='secret',
                     db='programs',
                     charset='utf8',
                     cursorclass=cursors.DictCursor)
print(connection)

def connecting(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result)
        return json.dumps(result)

#
my_query = "select * from Participant "
# print(my_query)

@bottle.route('/')
def index():
    return bottle.template("index.html")

@bottle.route('/getall')
def gelall():
    return connecting(my_query)


@bottle.route('/css/<filename:re:.*\.css>')
def d(filename):
    return bottle.static_file(filename,  root='./css')


@bottle.route('/js/<filename:re:.*\.js>')
def a(filename):
    return bottle.static_file(filename,  root='./js')




def main():

    bottle.run(host='localhost', port=7000)

if __name__ == '__main__':
    main()
    connecting(my_query)
