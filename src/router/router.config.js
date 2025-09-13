import lazyLoading from '@/libs/common/lazyLoading';

// 前端路由表
export const routerComponents = {
  /** 框架页面 */
  base: lazyLoading('/main'),

  /** 暂无权限 */
  403: lazyLoading('/pages/error/403'),
  /** 页面不存在 */
  404: lazyLoading('/pages/error/404'),
  /** 登录页 */
  login: lazyLoading('/login'),
  /** 首页 */
  home: lazyLoading('/home'),

  // 你需要动态引入的页面组件
  /** 角色管理 */
  role: lazyLoading('/pages/role/role'),
  /** 地图 */
  map: lazyLoading('/pages/mapDemo/map'),
  /** 大屏 */
  bigscreen: lazyLoading('/bigScreen/index'),
  chinaMap: lazyLoading('/bigScreen/components/components/map/chinaMap'),
};
