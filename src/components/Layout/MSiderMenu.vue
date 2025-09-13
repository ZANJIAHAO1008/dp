<template>
  <co-sider-menu
    v-show="menuList.length > 0"
    v-co-scrollbar
    :menu-list="menuList"
    :theme="menuTheme"
    widthCollapsed="0.8rem"
    width="2rem"
    @collapsedChange="collapsedChange"
  />
</template>

<script>
import { AppModule } from '@/store/modules';
export default {
  name: 'MSiderMenu',
  computed: {
    menuTheme: () => AppModule.menuTheme,
    menuList: () => AppModule.menuList,
  },
  methods: {
    collapsedChange(val) {
      AppModule.MENU_SHRINK(val);
    },
  },
};
</script>
