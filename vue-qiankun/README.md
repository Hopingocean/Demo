# qiankun demo

## 子应用间数据通信

## 公共UI组件和业务组件共享

## 打包和部署流程

### 如何动态注册部署子应用
·
	registerMicroApps([
	  {
		name: 'app-hash',
		entry: 'http://localhost:8080',
		container: '#container',
		activeRule: getActiveRule('#/app-hash'),
		// 这里也可以直接写 activeRule: '#/app-hash'，但是如果主应用是 history 模式或者主应用部署在非根目录，这样写不会生效。
	  }
	]);
·