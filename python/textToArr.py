import io
import os
import re
import sys
import csv
import json
import importlib

importlib.reload(sys)

if __name__ == '__main__':
    path = "E:/Demo/python/enum.txt"
    result = set()
    with open(path, 'r') as f:
        lines = f.readlines()
        newLines1 = []
        newLines2 = []
        for line in lines:
            line = line.strip('\n')
            newLines1.append(line)
            newLines2.append(line)
        # csv
        with open("E:/Demo/python/enum.csv", "w", newline='') as csvFile:
            excelFile = csv.writer(csvFile)
            excelFile.writerow(newLines1)
            excelFile.writerows([newLines1])
        # 数组
        with open("E:/Demo/python/enum-1.txt", "w") as file:

            file.write(json.dumps(newLines2, ensure_ascii=False))
