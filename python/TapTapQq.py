#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2017-09-11 02:55:43
# Project: TapTap

from pyspider.libs.base_handler import *

DIR_PATH = '/home/xgame/Pictures/TapTap/'
PAGE_START = 1
PAGE_NUM = 30
GAME_TYPE = ['android_hot', 'ios_hot', 'new_hot', 'reserve', 'played']
PAGE_END = 15

class Handler(BaseHandler):
    crawl_config = {
        'itag': 'v_1.2'
    }
    
    def __init__(self):
        self.base_url = 'https://www.taptap.com/top/download?total=' + str(PAGE_NUM) + '&type=' + GAME_TYPE[0] + '&page='
        self.page_num = PAGE_START
        self.total_num = PAGE_END
        self.count = 1
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
        file_name = '玩家QQ群'
        game_name = response.doc('.main-header-text h1').text()
        game_qq = response.doc('.main-body-number p').text()
        game_desc = response.doc('.body-description-paragraph').text()
        qq_group = re.findall(r"[1-9][0-9]{8,}", game_desc.encode('utf-8'))
        dir_path = self.deal.mkDir(file_name)
        if qq_group or game_qq:
            game_qq = re.sub("\D", "", game_qq)
            brief = str(self.count) + ',' + game_name + ':' + game_qq
            self.count = self.count + 1
            for qq in qq_group:
                brief = brief + '|' + qq
        else:
            brief = ''
        if dir_path:
            self.deal.saveBrief(brief, dir_path, file_name)


import os
import re

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
        if content:
            f = open(file_name, "a+")
            f.write(content.encode('utf-8') + '\n')

    def getExtension(self, url):
        extension = url.split('.')[-1].split('?')[0]
        return extension