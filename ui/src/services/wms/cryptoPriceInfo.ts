import { request } from '@umijs/max';

// 查询虚拟货币价格信息列表（分页）
export async function listCryptoPriceInfoPage(query?: any) {
  return request('/api/wms/cryptoPriceInfo/list', {
    method: 'GET',
    params: query
  });
}

// 查询虚拟货币价格信息列表（无分页）
export async function listCryptoPriceInfo(query?: any) {
  return request('/api/wms/cryptoPriceInfo/listNoPage', {
    method: 'GET',
    params: query
  });
}

// 刷新虚拟货币价格信息
export async function refreshCryptoPriceInfo() {
  return request('/api/wms/cryptoPriceInfo/refresh', {
    method: 'POST'
  });
}