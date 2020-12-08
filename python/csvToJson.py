import csv
import json
import codecs
import pandas as pd

with codecs.open('E:/Demo/python/enum.csv', 'r') as csvfile:
  jsonfile = open('E:/Demo/python/enum.json','w', encoding='utf-8')
  key = pd.read_csv('E:/Demo/python/enum.csv', encoding='gbk')
  fieldnames1 = key.columns
  keys = tuple(fieldnames1)
  reader = csv.DictReader(csvfile, keys)
  for row in reader:
      json.dump(row, jsonfile, sort_keys=True, indent=2, separators=(',', ': '), ensure_ascii=False)
      jsonfile.write('\n')
  jsonfile.close()
  csvfile.close()
