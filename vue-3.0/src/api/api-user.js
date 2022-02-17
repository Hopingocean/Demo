import axios from 'axios';
export const axiosFn = function (url, type, data) {
  return new Promise((resolve, reject) => {
    let option = {
      method: type,
      url: url
    };
    if (type === 'post') {
      option.data = data;
    } else if (type === 'get') {
      option.params = data;
    }
    axios(option).then(res => {
      resolve(res.data.result ? res.data.result : res.data);
    }).catch(err => {
      reject(err);
    });
  });
};
export const getUserinfo = () => axiosFn('http://rap2api.taobao.org/app/mock/86441/get/fish/userinfo', 'get', {});