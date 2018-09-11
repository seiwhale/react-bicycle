import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from "../utils/utils";

export default class Axios {
  /**
   * JsonP跨越封装
   * @param options
   * @returns {Promise}
   */
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status == 'success') {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      })
    })
  }

  /**
   * axios封装
   * @param options
   * @returns {Promise}
   */
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    // let baseApi = options.isMock ? 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api' : '';
    let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        // timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            })
          }
        } else {
          reject(response.data);
        }
      })
    });
  }

  static requestList(_this, url, params, isMock) {
    let data = {
      params: params,
    };
    this.ajax({
      url,
      data,
      isMock
    }).then(res => {
      if (res && res.result) {
        let list = (res.result.item_list || res.result.list).map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }
}