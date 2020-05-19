module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-console": "off",
        "no-unused-vars": [2, { 
            // 允许声明未使用变量
            "vars": "local",
            // 参数不检查
            "args": "none" 
        }],
        "vue/no-parsing-error": [0, { "x-invalid-end-tag": false }],
    }
};