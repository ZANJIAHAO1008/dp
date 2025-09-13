import { Module, Action, getModule, Mutation } from 'vuex-module-decorators';
import { App as AppBase } from '@co/store-app';
import { getTreeResources } from '@co/api-login';
import { getImgSrc } from '@co/api-xtgl';
import lazyLoading from '@/libs/common/lazyLoading';
import Main from '@/views/main.vue';
import store from '..';
// import { routerComponents as comps } from '@/router/router.config';
@Module({ dynamic: true, store, name: 'app' })
class App extends AppBase {
  /** 获取菜单资源 */
  @Action
  getMenuList() {
    return new Promise(resolve => {
      const { clientName = '' } = window.configOut || {};
      if (clientName && !this.menuLoaded) {
        getTreeResources({ clientName }).then(res => {
          res = res || [];
          res.sort((a, b) => b.weight - a.weight); // 排序
          const menuList = [];
          const nestFn = (menu, list) => {
            menu.sort((a, b) => b.weight - a.weight);
            menu.forEach(item => {
              const { title, resourceName, icon, iconType, children = [] } = item;
              const obj = { title, name: resourceName, icon, imgSrc: getImgSrc(icon, iconType) };
              if (/^#/.test(obj.name)) {
                obj.href = item.resourceVal;
              }
              list.push(obj);
              if (children.length > 0) {
                obj.children = [];
                nestFn(children, obj.children);
              }
            });
          };
          const routerIndex = [{ path: '/', component: Main, children: [] }];
          const nestRoute = (menu, list, parentName = '') => {
            menu.forEach(item => {
              const { title, resourceName, children = [] } = item;
              if (children.length > 0) {
                nestRoute(children, list, resourceName);
              } else {
                const obj = {
                  // path: `${parentName}/${resourceName}`,
                  path: `/${resourceName}`,
                  title: title,
                  name: resourceName,
                  component: lazyLoading('/pages/iframe/index'),
                  meta: { title },
                };
                list.push(obj);
              }
            });
          };
          nestFn(res, menuList);
          nestRoute(res, routerIndex[0].children);
          this.MENU_LIST(menuList);
          this.MENU_LIST_LOADED(true);
          resolve(routerIndex);
        });
      } else {
        // 未配置应用名称，跳过查询菜单资源
        this.MENU_LIST_LOADED(true);
        resolve([]);
      }
    });
  }
}

export const AppModule = getModule(App);
