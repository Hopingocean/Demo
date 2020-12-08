# -*- coding: utf-8 -*-
# @ description: 过滤vue项目指定文件夹中的所有中文字符串
# @ author: LeeO
# @ created: 2020/11/25

import io
import os
import re
import sys
import csv
import json
import importlib

importlib.reload(sys)

def translate(string):
    out = set()
    line = string.strip()  # 处理前进行相关的处理，包括转换成Unicode等
    slotList = subString(line)
    for slot in slotList:
        if u'\u4e00' <= slot <= u'\u9fff':
            # string = delString(slot)
            out.add(slot)
    return out

# 获取指定字符串
def subString(string):
    rule1 = r'"(.*?)"'
    rule2 = r'\'(.*?)\''
    rule3 = r'>(.*?)<'
    slotList1 = re.findall(rule1, string)
    slotList2 = re.findall(rule2, string)
    slotList3 = re.findall(rule3, string)
    sublotList = slotList1 + slotList2 + slotList3
    return sublotList

# 获取中文
def filterChinese(string):
    p2 = re.compile(r'[^\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]')  # 中文的编码范围是：[^\u4e00-\u9fa5] 双字节[^\x00-\xff]
    zh = " ".join(p2.split(string)).strip()
    return zh

# 删除指定字符串
def delString(string):
    rule1 = re.compile(r'(\{\{)(.*)(\}\})')
    rule2 = re.compile(r'(\')(.*)(\')')
    rule3 = re.compile(r'(\$\{)(.*)(\})')
    rule4 = re.compile(r'(\{\{)(.*)(\")')
    rule5 = re.compile(r'(\")(.*)(\}\})')
    rule6 = re.compile(r'(\")(.*)(\')')
    rule7 = re.compile(r'(\:)(.*)(\}\})')
    rule8 = re.compile(r'(\{\{})(.*)(\))')
    rule9 = re.compile(r'(\{\{)(.*)()')
    # rule10 = re.compile(r'(\")(.*)()')
    string1 = rule1.sub(r'', string)
    string2 = rule2.sub(r'', string1)
    string3 = rule3.sub(r'', string2)
    string4 = rule4.sub(r'', string3)
    string5 = rule5.sub(r'', string4)
    string6 = rule6.sub(r'', string5)
    string7 = rule7.sub(r'', string6)
    string8 = rule8.sub(r'', string7)
    string9 = rule9.sub(r'', string8)
    # string10 = rule10.sub(r'', string9)
    return string9.strip('&nbsp;').strip('&rsaquo;')

# 判断字符串中是否包含中文
def isContainChinese(string):
    for s in string:
        if u'\u4e00' <= s <= u'\u9fff':
            return True
    return False

def extract_file(path):
    result = set()
    try:
        with open(path, 'r', encoding="utf-8") as f:
            lines = f.readlines()
        for line in lines:
            line = line.strip()
            head, sep, tail = line.partition('//')
            if not line.startswith('/*') and not line.startswith('<!--') and not line.startswith('*') and not line.startswith('console'): # 判断是否是注释行/* */
                string = translate(head)
                if string:
                    result.update(string)
    except Exception as e:
        pass
    return result


def extract(path):
    result = set()
    files = os.listdir(path)
    for file in files:
        if file == 'validate.js':
            sub_file = extract_file(path + "/" + file)
            if sub_file:
                result.update(sub_file)
    return result


if __name__ == '__main__':
    path = "F:/EBR_V2.0/src/libs"
    result = extract(path)
    # 字符串
    res_file = open("E:/Demo/python/validate.txt", "w")
    result1 = sorted(result, key=lambda i: len(i), reverse=True)
    for s in result1:
        newStr = s.replace(u'\xa9', u'')
        res_file.write(newStr + "\n")
