<!-- 详情弹窗 -->
<script>
import { Modal, Button } from 'chinaoly-ui-vue';
function HOC(WrappedComponent) {
  return {
    name: 'detailModal',
    model: {
      prop: 'visible',
      event: 'change',
    },
    props: {
      ...WrappedComponent.props,
      title: {
        type: String,
        default: '详情',
      },
      width: {
        type: [Number, String],
        default: '8rem',
      },
    },
    methods: {
      closeModal() {
        this.$emit('change', false);
        this.$emit('cancel');
      },
    },
    render(h) {
      const $slots = {
        footer: (
          <div slot="footer">
            <slot name="footer">
              <Button onClick={this.closeModal}>关闭</Button>
            </slot>
          </div>
        ),
        ...this.$slots,
      };
      const slots = Object.keys($slots)
        .reduce((arr, key) => arr.concat($slots[key]), [])
        .map(vnode => {
          vnode.context = this._self;
          return vnode;
        });

      return h(
        WrappedComponent,
        {
          on: this.$listeners,
          props: this.$props,
          scopedSlots: this.$scopedSlots, // 透传 scopedSlots
          attrs: this.$attrs,
        },
        slots
      ); // 将 slots 作为 h 函数的第三个参数
    },
  };
}
export default HOC(Modal);
</script>
