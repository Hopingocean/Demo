# TypeScript学习

* [1.1 TypeScript和JavaScript区别](#1.1)

<h3 id="1.1">TypeScript和JavaScript区别</h3>

|typescript|javascript|
|:---------|:---------|
|javascript的超集，用于解决大型项目的代码复杂性|一种脚本语言，用于创建动态网页|
|可以在编译期间发现并纠正错误|作为一种解释型语言，只能在运行时发现错误|
|强类型，支持静态和动态类型|弱类型，没有静态类型选项|
|最终被编译成javascript代码，浏览器可以解析|可以直接在浏览器中使用|
|支持模块，泛型、接口|不支持模块、泛型、接口|
|支持ES3、ES4、ES5、ES6等|不支持编译ES3、ES4、ES5、ES6|
|社区需要完善|社区支持和大量文档及问题解决方案|

<h3 id="1.2">获取TypeScript</h3>

1. 安装TypeScript
```
npm install -g typescript
```
2. 编译TypeScript文件
```
tsc helloword.ts
```
