#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2017-09-11 02:55:43
# Project: TapTap

from pyspider.libs.base_handler import *
from pyspider.database.mysql.mysqldb import SQL

DIR_PATH = '/home/xgame/Pictures/TapTap'

class Handler(BaseHandler):
    crawl_config = {
    }
    
    def __init__(self):
        self.deal = Deal()
    
    def on_start(self):
        self.crawl('https://www.taptap.com/top/download', callback=self.index_page)

    def index_page(self, response):
        for each in response.doc('.feed-rec.collapse.in .feed-rec-header .rec-header-icon').items():
            self.crawl(each.attr.href, callback=self.detail_page, fetch_type='js')

    def detail_page(self, response):
        game_name = response.doc('.main-header-text h1').text()
        dir_path = self.deal.mkDir(game_name)
        brief = response.doc('.body-description-paragraph').text()
        if dir_path:
            game_logo = response.doc('.header-icon-body img').attr.src
            game_banner = response.doc('#imageShots li img').items()
            count = 1
            self.deal.saveBrief(brief, dir_path, game_name)
            for banner in game_banner:
                url  = banner.attr.src.split('?')[0]
                if url:
                    extension = self.deal.getExtension(url)
                    file_name = game_name + str(count) + '.' + extension
                    count += 1
                    self.crawl(url, callback=self.save_img,
                       save={'dir_path': dir_path, 'file_name': file_name})
        return {
            "author": response.url,
            "title": response.doc('.main-header-text h1').text(),
            "content": response.doc('.body-description-paragraph').text(),
        }
        
    def save_img(self, response):
        content = response.content
        dir_path = response.save['dir_path']
        file_name = response.save['file_name']
        file_path = dir_path + '/' + file_name
        self.deal.saveImg(content, file_path)
    
    def on_result(self,result):
        if not result or not result['original_id']:
            return
        sql = SQL()
        sql.insert('article',**result) 

from six import itervalues
import mysql.connector
from datetime import date, datetime, timedelta

class SQL():

        username = 'xgameuser'
        password = 'xgamepassW34#SD'
        database = 'mysql'
        host = '114.55.218.200'
        connection = ''
        connect = True
	placeholder = '%s'

        def __init__(self):
                if self.connect:
                        SQL.connect(self)
	def escape(self,string):
		return '`%s`' % string
        def connect(self):
        	config = {
        		'user':SQL.username,
        		'password':SQL.password,
        		'host':SQL.host
        	}
        	if SQL.database != None:
        		config['database'] = SQL.database

        	try:
        		cnx = mysql.connector.connect(**config)
        		SQL.connection = cnx
        		return True
        	except mysql.connector.Error as err:

			if (err.errno == errorcode.ER_ACCESS_DENIED_ERROR):
				print "The credentials you provided are not correct."
			elif (err.errno == errorcode.ER_BAD_DB_ERROR):
				print "The database you provided does not exist."
			else:
				print "Something went wrong: " , err
			return False


	def replace(self,tablename=None,**values):
		if SQL.connection == '':
                	print "Please connect first"
                	return False

                tablename = self.escape(tablename )
                if values:
                        _keys = ", ".join(self.escape(k) for k in values)
                        _values = ", ".join([self.placeholder, ] * len(values))
                        sql_query = "REPLACE INTO %s (%s) VALUES (%s)" % (tablename, _keys, _values)
                else:
                        sql_query = "REPLACE INTO %s DEFAULT VALUES" % tablename

				
		cur = SQL.connection.cursor()
            	try:
                	if values:
                    		cur.execute(sql_query, list(itervalues(values)))
                	else:
                    		cur.execute(sql_query)
                	SQL.connection.commit()
                	return True
            	except mysql.connector.Error as err:
                	print ("An error occured: {}".format(err))
                	return False