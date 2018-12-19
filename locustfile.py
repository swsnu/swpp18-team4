from locust import HttpLocust, TaskSet, task
import json

class WebsiteTasks(TaskSet):
    domain_user = 'api/user/'
    domain_post = 'http://localhost:8000/api/post/'
    domain_comment = 'http://localhost:8000/api/comment/'

    def on_start(self):
        self.token()
        self.signin()

    def token(self):
        response = self.client.get(self.domain_user+'token/')
        self.csrftoken = response.cookies['csrftoken']

    def signin(self):
        #self.token()
        self.client.post(self.domain_user+'signin/', json.dumps({
          'email':'aaa@naver.com', 'password':'123456aa'
        }), headers={"X-CSRFToken": self.csrftoken}, cookies={"csrftoken": self.csrftoken})
    
    def signout(self):
        self.client.get(self.domain_user+'signout/')
   

    # test on user model
    '''
    def signup(self):
        self.client.post(self.domain_user+'signup/', json.dumps({
            'email': 'kk@snu.ac.kr',
            'nickname': 'nick',
            'password': '123456aa',
            'user_type': 'EE',
            'company_name': ''
        }), headers={"X-CSRFToken": self.csrftoken}, cookies={"csrftoken": self.csrftoken})
    '''

    @task(1)
    def getuser(self):
        self.client.get(self.domain_user + '24')

    # test on post model
    @task(1)
    def getposts(self):
        self.client.get(self.domain_post)
    @task(2)
    def getpost(self):
        self.client.get(self.domain_post+'21/')
    
    @task(1)
    def createpost(self):
        self.client.post(self.domain_post, json.dumps({
            'title': '알바 대타 구해요',
            'content': '대타 급히 구해봅니다',
            'region': '서울대입구',
            'region_specific': '3출 탐탐',
            'arbeit_type': '과외',
            'how_to_pay': '시급',
            'pay_per_hour': 13000,
            'goods': '',
            'timezone': ['2018-12-04T21:00:00.000Z','2018-12-05T09:00:00.000Z'],
            'deadline': '2018-12-19 11:16:28.869099',
            'home_expect_time': 3,
            'is_same_person': True,
            'latitude': 37.4,
            'longitude':135.21,
        }), headers={"X-CSRFToken": self.csrftoken}, cookies={"csrftoken": self.csrftoken})

    
    @task(1)
    def getalarm(self):
        self.client.get(self.domain_post+'alarm/')

    # test on comment model
    @task(1)
    def getcomments(self):
        self.client.post(self.domain_comment, json.dumps({
            'post_id': 25,
            'refer_comment_id': 0,
            'star': 3.5,
            'content': '여기 하지 마세요...',
        }), headers={"X-CSRFToken": self.csrftoken}, cookies={"csrftoken": self.csrftoken})  

    @task(1)
    def getcomment(self):
        self.client.get(self.domain_comment+'4/')

    @task(1)
    def getcommentsbypost(self):
        self.client.get(self.domain_comment+'post/21/')

    @task(1)
    def getcommentsbyauthor(self):
        self.client.get(self.domain_comment+'author/24/')

    @task(1)
    def getcommentsbyreceive(self):
        self.client.get(self.domain_comment+'receive/24')
        
    def on_stop(self):
        self.signout()



class WebsiteUser(HttpLocust):
    host = 'http://localhost:8000/'
    task_set = WebsiteTasks
    min_wait = 5000
    max_wait = 10000 