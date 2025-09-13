import { getData } from '../utils';
import { loginUrl } from '@co/api-login';

export default {
  // 获取资源树
  [`POST ${loginUrl}/login/getTreeResources`]: getData([
    {
      alias: null,
      children: [],
      clientId: '1EAA6B79850E7233DF888012DDC74BA7',
      dataAuthNum: null,
      icon: 'table',
      iconType: '1',
      id: 'EAF9E5DE7AE969F21E60571399957F42',
      parentId: '',
      pinYing: 'bgsl',
      remark: null,
      remark1: null,
      remark2: null,
      remark3: null,
      resourceName: 'table',
      resourceType: 0,
      resourceVal: '/pages/role/role',
      title: '表格示例',
      weight: 1,
    },
    {
      alias: '',
      children: [],
      clientId: '1EAA6B79850E7233DF888012DDC74BA7',
      dataAuthNum: null,
      icon: 'global',
      iconType: '1',
      id: '5A6E774DFD275F18EB733DC53DF470FE',
      parentId: '',
      pinYing: 'dtsl',
      remark: '',
      remark1: '',
      remark2: '',
      remark3: '',
      resourceName: 'map',
      resourceType: 0,
      resourceVal: '/pages/mapDemo/map',
      title: '地图示例',
      weight: 1,
    },
  ]),
};
