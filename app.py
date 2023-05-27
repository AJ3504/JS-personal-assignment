#디폴트 설정
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.supeagv.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta


import requests
from bs4 import BeautifulSoup


#❶페이지 로딩
@app.route('/')
def home():
    return render_template('index.html')


#2.GET
@app.route("/configuration", methods=["GET"])
def configuration_get():
    all_configurations = list(db.configurations.find({}, {'_id':False})) #{조건없이}, {id가 안보이게 false로 주고} 모든 영화들을 싹 가지고와서
    return jsonify({'result': all_configurations}) #내려주기

if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)


#3. POST
@app.route("/configuration", methods=["POST"])
def configuration_post():
    title_receive = request.form['title_give']
    overview_receive = request.form['overview_give']
    poster_path_receive = request.form['poster_path_give']
    vote_average_receive = request.form['vote_average_give']

    # headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    # data = requests.get(title_receive,headers=headers)

    # soup = BeautifulSoup(data.text, 'html.parser')

    # ogtitle = soup.select_one('meta[property="og:title"]')['content']
    # ogimage = soup.select_one('meta[property="og:image"]')['content']
    # ogdesc = soup.select_one('meta[property="og:description"]')['content']

    
    doc = {
        'title': title_receive,
        'overview':overview_receive,
        'poster_path': poster_path_receive,
        'vote_average' : vote_average_receive
    }
    db.configurations.insert_one(doc)



    return jsonify({'msg':'저장 완료!'})

