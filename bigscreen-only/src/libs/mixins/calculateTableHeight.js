// 公共table高度
let timer = null; // 定时器 用于防抖
export default {
  data() {
    return {
      scrollY: 0,
    };
  },
  mounted() {
    this.resizeTable();
    window.addEventListener('resize', this.resizeTable);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeTable);
  },
  watch: {
    scrollY(newVal, oldVal) {
      if (!(isNaN(newVal) || isNaN(oldVal) || Math.abs(newVal - oldVal) < 1)) {
        this.resizeTable();
      }
    },
  },
  methods: {
    resizeTable() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.calculateScrollY();
      }, 0);
    },
    // 计算表格高度
    calculateScrollY() {
      this.$nextTick(() => {
        const elPage = document.querySelectorAll('.single-page')[0]; // 页面内容
        const elFilter = document.querySelectorAll('.filter-container')[0]; // 查询(过滤)
        const elOperation = document.querySelectorAll('.operation-container')[0]; // 操作(新增、导入等)
        const remRate = parseFloat(localStorage.getItem('remRate') || '0');
        const fHeight = elFilter ? elFilter.clientHeight : 0;
        const oHeight = elOperation ? elOperation.clientHeight + 24 * remRate : 0; // 24 为 margin-bottom
        const bHeight = 50; // 24*2 + 1*2  (容器的padding、border)
        const pHeight = 114; // 表头(48) + 分页器(64) + border(2)
        const scrollY = elPage ? elPage.clientHeight - fHeight - oHeight - (bHeight + pHeight) * remRate : 0;
        // this.scrollY = tHeight < scrollY ? undefined : scrollY; // 判断需不需要滚动条
        this.scrollY = scrollY; // 判断需不需要滚动条
      });
    },
  },
};
