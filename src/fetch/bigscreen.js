import { ajaxApi, bigScreenUrl, ajaxJson, ajaxForm } from './api';


// 根据行政编码查看重点目标
export const getZdmbApi = (params = {}) => {
  return ajaxApi('post', bigScreenUrl + '/ffyj/ffmb/page', params);
};

// 根据行政编码查看重点目标数量
export const getZdmbCountApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/ffyj/ffmb/count', params);
};

// 根据性别统计
export const getSexApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/jjry/sex', params);
};

// 根据年龄统计
export const getAgeApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/jjry/age', params);
};

// 中央部位-涉恐关注人员
export const getGzryApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/jjry/skgz', params);
};

// 中央部位-可疑人员
export const getKyryApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/jjry/kyry', params);
};

// 中央部位-重点人员
export const getZdryApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/jjry/zdry', params);
};

// 中央部位-重点人员
export const getGzryListApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/gzry/gbase/jjry/count', params);
};

// 中央部位-可疑人员
export const getKyryListApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/yjry', params);
};

// 中央部位-重点目标
export const getZdmbListApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/ffyj/ffmb/count', params);
};

// 中央部位-跨省
export const getKsListApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/lrlc/dt', params);
};

// 中央部位-跨区市
export const getQsListApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/lrlc/kqsx', params);
};



// 流入流出统计
export const lrlcQstApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/lrlc/qst', params);
};

// 流入流出统计
export const jhlrlcApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/gzry/gbase/jhjcly/count', params);
};


// 流入流出统计
export const sczclcApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/lrlc/qk', params);
};

// 指令统计
export const hczlApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/qb/tj/zl/qx', params);
};

// 指令统计
export const getQbApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/qb/tj/qx', params);
};

// 流入流出交通工具统计
export const getLrlcJtApi= params => {
  return ajaxApi('get', bigScreenUrl + '/hdxx/lrlc/type',params);
};

// 登记车辆分类
export const getDjclApi= params => {
  return ajaxApi('get', bigScreenUrl + '/clgl/clfl',params);
};

// 登记车辆分类
export const getZdryListApi= params => {
  return ajaxApi('get', bigScreenUrl + '/jjry/zdry',params);
};

// 获取待办事项
export const getTask = ({} = {}) => {
  return ajaxApi('get', '/api/fkmgr/clgl/getList/taskAll', {}, { rowData: true });
};

// 车辆预警统计
export const getClyjApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/gzry/gbase/clyj/count', params);
};

// 籍贯统计
export const getJgtjApi = (params = {}) => {
  return ajaxApi('get', bigScreenUrl + '/gzry/gbase/gzry/jg', params);
};
