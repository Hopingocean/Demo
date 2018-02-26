#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2017-09-11 02:55:43
# Project: TapTap

from pyspider.libs.base_handler import *

DIR_PATH = '/home/xgame/Pictures/TapTap'
PAGE_START = 1
PAGE_NUM = 30
GAME_TYPE = ['android_hot', 'ios_hot', 'new_hot', 'reserve', 'played']
PAGE_END = 15

class Handler(BaseHandler):
    crawl_config = {
        'itag': 'v_1.1'
    }
    
    def __init__(self):
        self.base_url = 'https://www.taptap.com/top/download?total=' + str(PAGE_NUM) + '&type=' + GAME_TYPE[0] + '&page='
        self.page_num = PAGE_START
        self.total_num = PAGE_END
        self.deal = Deal()
        
    def on_start(self):
        for type in GAME_TYPE:
            while self.page_num <= self.total_num:
                url = self.base_url + str(self.page_num)
                self.crawl(url, callback=self.index_page)
                self.page_num += 1

    def index_page(self, response):
        for each in response.doc('.taptap-top-card .card-middle-title').items():
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
        
    def save_img(self, response):
        content = response.content
        dir_path = response.save['dir_path']
        file_name = response.save['file_name']
        file_path = dir_path + '/' + file_name
        self.deal.saveImg(content, file_path)

import os

class Deal:
    def __init__(self):
        self.path = DIR_PATH
        if not self.path.endswith('/'):
            self.path = self.path + '/'
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def mkDir(self, path):
        path = path.strip()
        dir_path = self.path + path
        exists = os.path.exists(dir_path)
        if not exists:
            os.makedirs(dir_path)
            return dir_path
        else:
            return dir_path

    def saveImg(self, content, path):
        f = open(path, 'wb')
        f.write(content)
        f.close()

    def saveBrief(self, content, dir_path, name):
        file_name = dir_path + "/" + name + ".txt"
        f = open(file_name, "w+")
        f.write(content.encode('utf-8'))

    def getExtension(self, url):
        extension = url.split('.')[-1].split('?')[0]
        return extension