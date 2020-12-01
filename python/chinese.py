# -*- coding: utf-8 -*-
# @ description: 过滤vue项目指定文件夹中的所有中文字符串
# @ author: LeeO
# @ created: 2020/11/25

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
            string = delString(slot)
            out.add(string)
    # p2 = re.compile(r'[^\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]')  # 中文的编码范围是：[^\u4e00-\u9fa5] 双字节[^\x00-\xff]
    # zh = " ".join(p2.split(line)).strip()
    # for s in zh.split():
    #     out.add(s)  # 经过相关处理后得到中文的文本
    return out

# 获取指定字符串
def subString(string):
    rule1 = r'"(.*?)"'
    rule2 = r'\'(.*?)\''
    rule3 = r'>(.*?)<'
    slotList1 = re.findall(rule1, string)
    slotList2 = re.findall(rule2, string)
    slotList3 = re.findall(rule3, string)
    return slotList1 + slotList2 + slotList3

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
    rule10 = re.compile(r'(\")(.*)()')
    string1 = rule1.sub(r'', string)
    string2 = rule2.sub(r'', string1)
    string3 = rule3.sub(r'', string2)
    string4 = rule4.sub(r'', string3)
    string5 = rule5.sub(r'', string4)
    string6 = rule6.sub(r'', string5)
    string7 = rule7.sub(r'', string6)
    string8 = rule8.sub(r'', string7)
    string9 = rule9.sub(r'', string8)
    string10 = rule10.sub(r'', string9)
    return string10.strip('&nbsp;').strip('&rsaquo;')

def extract_file(path):
    result = set()
    try:
        with open(path, 'r', encoding="utf-8") as f:
            lines = f.readlines()
        for line in lines:
            line = line.strip()
            head, sep, tail = line.partition('//')
            if not line.startswith('/*') and not line.startswith('<!--') and not line.startswith('*') and not line.startswith('console'):       # 判断是否是注释行/* */
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
        if not file.startswith("."):
            # 判断是否是文件夹，不是文件夹才打开ssgsg判断是否是文件夹，不是文件夹才打开
            if os.path.isdir(path + "/" + file) and file == 'locale':
                print(file)
            if not os.path.isdir(path + "/" + file):
                    sub_file = extract_file(path + "/" + file)
                    if sub_file:
                        result.update(sub_file)
            elif file != 'locale' and file != 'assets':
                child = extract(path + "/" + file)
                if child:
                    result.update(child)
    return result


if __name__ == '__main__':
    path = "F:/EBR_V2.0/src"
    result = extract(path)
    # 字符串
    res_file = open("E:/Demo/python/text3.txt", "w")
    result1 = sorted(result, key=lambda i: len(i), reverse=True)
    for s in result1:
        res_file.write(s + "\n")

if __name__ == '__main__':
    path = "E:/Demo/python/text3.txt"
    result = set()
    with open(path, 'r') as f:
        lines = f.readlines()
        newLines1 = []
        newLines2 = []
        for line in lines:
            line = line.strip('\n')
            newLines1.append([line + ','])
            newLines2.append(line)
        # csv
        with open("E:/Demo/python/text3.csv", "w", newline='') as csvFile:
            excelFile = csv.writer(csvFile)
            excelFile.writerow(['name'])
            excelFile.writerows(newLines1)
        # 数组
        with open("E:/Demo/python/text3-1.txt", "w") as file:
            file.write(json.dumps(newLines2, ensure_ascii=False))
                
