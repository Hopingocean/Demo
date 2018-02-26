# encoding: UTF-8
import re
 
# 将正则表达式编译成Pattern对象
# pattern = re.compile(r'\[1-9][0-9]{4,}\g')
 
# 使用Pattern匹配文本，获得匹配结果，无法匹配时将返回None
findAll = re.findall(r"[1-9][0-9]{4,}", "1258963839a32bc43jf3")
match = re.match(r"[1-9][0-9]{4,}", "a32bc43jf3")
print findAll
print match