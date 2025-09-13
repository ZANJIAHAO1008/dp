<template>
  <div class="calendar not-rem">
    <div class="calendar-header">
      <div name="month">
        <span name="prev-month" class="p-icon fl">
          <co-icon type="double-left" @click="handleYear(-1)" />
          <co-icon type="left" @click="handleMonth(-1)" />
        </span>
        <span name="curr-month">{{ currentDate | parseTime('yyyy年MM月') }}</span>
        <span name="next-month" class="p-icon fr">
          <co-icon type="right" @click="handleMonth(1)" />
          <co-icon type="double-right" @click="handleYear(1)" />
        </span>
      </div>
      <ul name="weekDay" class="calendar-day clear">
        <li v-for="(i, index) in weekList" :key="index">{{ i }}</li>
      </ul>
    </div>
    <div class="calendar-body">
      <ul name="day-content" class="calendar-day clear">
        <li :class="getDayClass(i)" v-for="(i, index) in dateList" :key="index">
          <co-tooltip v-if="tagMap[i.val]" :title="tagMap[i.val].nr">
            <div>{{ i.val }}</div>
          </co-tooltip>
          <div v-else class="">{{ i.val }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@co/common';
export default {
  name: 'Calendar',
  filters: {
    parseTime: formatDate,
  },
  props: {
    tagList: {
      type: Array,
      default: () => [
        // { title: '五一劳动节', nr: '劳动节快乐', sj: '2021-05-01' },
        // { title: '五四青年节', nr: '青年节快乐', sj: '2021-05-04' },
        // { title: '五8青年节', nr: '青年节快乐', sj: '2021-05-08' },
        // { title: '六一儿童节', nr: '儿童节快乐', sj: '2021-06-01' },
        // { title: '八一建军节', nr: '建军节快乐', sj: '2021-08-01' },
      ],
    },
  },
  data() {
    return {
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      fDay: 0, // 第一天为周几
      currentDate: new Date(), // 当前日期
      currentMonthStr: '', // 当前月份
      dateList: [], // 日期列表
      tagMap: {}, // 快速读取tag
    };
  },
  mounted() {
    this.showCalendar(this.currentDate);
  },
  methods: {
    getDayClass(i) {
      let cls = [`calendar-${i.flag}`];
      if (i.flag === 'c') {
        // 只显示当月的日期
        let dateStr = formatDate(new Date(this.currentMonth + '-' + i.val), 'yyyy-MM-dd');
        let item = this.tagList.find(it => it.sj === dateStr);
        if (item) {
          cls.push('calendar-tag');
          this.tagMap[i.val] = item;
        }
      }
      return cls.join(' ');
    },
    handleYear(val) {
      let date = this.currentDate;
      date.setFullYear(date.getFullYear() + val);
      this.showCalendar(date);
    },
    handleMonth(val) {
      let date = this.currentDate;
      date.setMonth(date.getMonth() + val);
      this.showCalendar(date);
    },
    showCalendar(date) {
      this.$emit('update');
      this.currentMonth = formatDate(this.currentDate, 'yyyy-MM');
      var year = date.getFullYear();
      var month = date.getMonth();
      var firstDay = new Date(year, month); // 一个月的第一天
      var lastDay = new Date(year, month + 1); // 一个月的最后一天
      lastDay.setDate(lastDay.getDate() - 1);
      let fDay = firstDay.getDay() || 7; // 第一天为周几
      this.fDay = fDay;
      firstDay.setDate(firstDay.getDate() - fDay); // 日历的第一天 若刚好是1号则往前推1周
      // console.log(firstDay.format('yyyy-MM-dd'), lastDay.format('yyyy-MM-dd'))
      var ls = [],
        loop = fDay,
        val = firstDay.getDate();
      while (loop) {
        // 上个月
        ls.push({ val: val++, flag: 'p' });
        loop--;
      }
      (loop = lastDay.getDate()), (val = 1);
      while (loop) {
        // 当月
        ls.push({ val: val++, flag: 'c' });
        loop--;
      }
      (loop = 6 - lastDay.getDay()), (val = 1);
      while (loop) {
        // 下个月
        ls.push({ val: val++, flag: 'n' });
        loop--;
      }
      this.dateList = ls;
    },
  },
};
</script>
<style lang="less" scoped>
.calendar.not-rem {
  height: 400px;
  font-size: 16px;
  text-align: center;
  background-color: rgba(0, 102, 255, 0.1);
  .calendar-header {
    padding: 10px 0;
  }
  .calendar-day {
    padding: 0 1%;
    color: @bs-color-primary;
  }
  .calendar-day li {
    float: left;
    width: 14%;
    list-style-type: none;
  }

  [name='curr-month'] {
    margin-bottom: 10px;
    color: #fff;
  }
  [name='day-content'] li {
    position: relative;
    height: 52px;
    margin-bottom: 4px;
  }
  [name='day-content'] div {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 auto;
    border-radius: 50%;
  }
  .p-icon {
    color: rgba(255, 255, 255, 0.45);
    cursor: pointer;
  }
  li.calendar-c div {
    color: #fff;
  }
  li.calendar-p div,
  li.calendar-n div {
    /* 上月 下月 */
    color: rgba(255, 255, 255, 0.2);
  }
  [name='day-content'] li:nth-child(7n + 1),
  [name='day-content'] li:nth-child(7n) {
    /* 休市日 */
    color: #ddd;
  }
  .calendar-tag {
    border: 2px solid red;
    border-radius: 4px;
    &::after {
      position: absolute;
      content: ' ';
      border: 3px solid red;
      border-radius: 2px;
    }
  }
  .calendar-tag:nth-of-type(3n + 1) {
    &,
    &::after {
      border-color: #ca2f21;
    }
  }
  .calendar-tag:nth-of-type(3n + 2) {
    &,
    &::after {
      border-color: #2195ca;
    }
  }
  .calendar-tag:nth-of-type(3n + 3) {
    &,
    &::after {
      border-color: #caca21;
    }
  }
}
</style>
