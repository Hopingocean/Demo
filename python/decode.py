# -*- coding: utf-8 -*-
# @ description:
# @ author:
# @ created: 2020/11/25

import os
import re
import sys
import importlib

importlib.reload(sys)
# sys.setdefaultencoding("utf8")


def translate(str):
    print(str)
    out = set()
    line = str.strip().decode('utf-8', 'ignore')  # 处理前进行相关的处理，包括转换成Unicode等
    print(line)
    p2 = re.compile(r'[^\u4e00-\u9fa5]')  # 中文的编码范围是：\u4e00到\u9fa5
    zh = " ".join(p2.split(line)).strip()
    print(zh)
    # zh = "\n".join(zh.split()) #dsds经过相关处理后得到中文的文本
    for s in zh.split():
        out.add(s)  # 经过相关处理后得到中文的文本
    return out


def extract_file(path):
    print(path)
    result = set()
    try:
        f = open(path)  # 打开文件
        lines = f.readlines()
        for line in lines:
            string = translate(line)
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
            if not os.path.isdir(path + "/" + file):
                sub_file = extract_file(path + "/" + file)
                if sub_file:
                    result.update(sub_file)
            else:
                child = extract(path + "/" + file)
                if child:
                    result.update(child)
    return result


if __name__ == '__main__':
    path = "F:/EBR_V2.0/src/config"
    result = extract(path)
    res_file = open("text.txt", "w")
    for s in result:
        res_file.write(s + "\n")
