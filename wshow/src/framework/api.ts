export class API {
  static _baseUrl;

  static baseURL() {
    if (process.env.NODE_ENV === 'development') {
      this._baseUrl = 'http://127.0.0.1:3003/v1';
    } else {
      // this._baseUrl = 'https://atlantide.top:3003/v1';
      this._baseUrl = 'http://127.0.0.1:3003/v1';

    }
    return this._baseUrl;
  }

  static async config(url, method, config) {
    return uni.request({
      url: `${this.baseURL()}/${url}`,
      method: method,
      data: config,
    });
  }

  static get(url, config = null) {
    uni.showLoading({
      title: '加载中',
    });
    return this.config(url, 'GET', config);
  }

  static post(url, config) {
    uni.showLoading({
      title: '发送中',
    });
    return this.config(url, 'POST', config);
  }

  static put(url, config) {
    uni.showLoading({
      title: '修改中',
    });
    return this.config(url, 'PUT', config);
  }

  static delete(url, config) {
    uni.showLoading({
      title: '删除中',
    });
    return this.config(url, 'DELETE', config);
  }
}
