<template>
  <div class="app_excel hot-excel">
    <button @click="print">打印</button>
    <hot-table ref="hot" :settings="hotSettings"></hot-table>
    <hot-table v-show="showModal" ref="print" :settings="settings"></hot-table>
  </div>
</template>

<script>
import Vue from "vue";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.css";
import { HotTable } from "@handsontable/vue";
import excel from "@/mork/excel.json";
export default {
  name: "AppExcel",
  components: {
    HotTable
  },
  data() {
    let _this = this;
    function negativeValueRenderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    ) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      if (prop == 2) {
        if (_this.linkData.includes(value)) {
          _this.createElementLink(td, row, col, prop, value);
        }
      }
    }
    Handsontable.renderers.registerRenderer(
      "negativeValueRenderer",
      negativeValueRenderer
    );
    return {
      settings: {
        data: excel.data,
        cell: excel.cell.items,
        mergeCells: excel.mergeCells, // 合并单元格
        colHeaders: true,
        rowHeaders: true,
        readOnlyCellClassName: "htReadOnly", // 定义只读class类名
        stretchH: "all",
        loadClass: excel.loadClass.items, // 边框样式
        loadStyle: excel.loadStyle, // 字体样式
        loadBK: [], // 单元格底色
        borderClass: excel.borderClass,
        renderAllRows: true,
        autoColumnSize: false,
        comments: true, // 评论插件
        // 启动复制粘贴插件
        copyPaste: {
          columnsLimit: 25,
          rowsLimit: 50,
          pasteMode: "shift_down"
        },
        startRows: 11, // 行列范围
        startCols: 6,
        minRows: 30, // 最小行列
        minCols: 25,
        // maxRows: 500, // 最大行列
        // maxCols: 100,
        readOnly: true, // 只读
        minSpareRows: 2, // 行留白
        currentRowClassName: "currentRow", // 为选中行添加类名，可以更改样式
        currentColClassName: "currentCol", // 为选中列添加类名
        autoWrapRow: false, // 切换行
        autoWrapCol: false, // 切换列
        wordWrap: false,
        fillHandle: false,
        // 配置右键菜单
        contextMenu: false,
        outsideClickDeselects: false,
        // 设置边框
        customBorders: false,
        className: "htCenter htMiddle",
        manualRowResize: true,
        manualColumnResize: true,
        manualRowMove: true,
        manualColumnMove: true,
        licenseKey: "non-commercial-and-evaluation"
      },
      hotSettings: {
        data: excel.data,
        readOnlyCellClassName: "htReadOnly",
        stretchH: "all",
        loadClass: excel.loadClass.items, //边框样式
        loadStyle: excel.loadStyle, //字体样式
        loadBK: excel.loadBK, //单元格底色
        borderClass: excel.borderClass,
        renderAllRows: false,
        //启动复制粘贴插件
        copyPaste: true,
        startRows: 11, //行列范围
        startCols: 6,
        minRows: 25, //最小行列
        minCols: 25,
        // maxRows: 3000, //最大行列
        // maxCols: 1000,
        rowHeights: 28,
        colWidths: 100,
        readOnly: true, //只读
        rowHeaders: true, //行表头，可以使布尔值（行序号），可以使字符串（左侧行表头相同显示内容，可以解析html），也可以是数组（左侧行表头单独显示内容）。
        colHeaders: true, //自定义列表头or 布尔值
        currentRowClassName: "currentRow", //为选中行添加类名，可以更改样式
        currentColClassName: "currentCol", //为选中列添加类名
        manualRowResize: true,
        manualColumnResize: true,
        mergeCells: excel.mergeCells, //合并单元格
        fillHandle: false,
        //配置右键菜单
        contextMenu: false,
        outsideClickDeselects: false,
        //设置边框
        customBorders: excel.customBorders,
        className: "htCenter htMiddle",
        cell: excel.cell.items,
        comments: true, //评论
        hiddenRows: {
          // set rows that are hidden by default
          rows: []
          // show where are hidden rows
          // indicators: true
        },
        cells: function(row, col, prop) {
          this.renderer = negativeValueRenderer;
        },
        licenseKey: "non-commercial-and-evaluation"
      },
      showModal: false,
      linkData: [
        "M763",
        "M764",
        "763",
        "764",
        "M674",
        "DEV202005130144",
        "919",
        "920"
      ]
    };
  },
  mounted() {
    console.log(this.$refs.hot);
    console.log(this.$refs.print);
  },
  methods: {
    // 打印
    print() {
      // this.showModal = true;
      let printWindow = window.open("", "print", "height=768, width=1024");
      printWindow.document.write("<html><head><title>" + "print" + "</title>");
      printWindow.document.write(
        '<style media="print">@page { margin: 0; padding: 0; size: auto; } * { margin: 0; padding: 0; font-size: 13px; }' +
          " .tag-print { font-family: Arial, Helvetica, sans-serif; width: 10cm; height: 10cm; margin: 0 auto; background-color: #fff; } .tag-print .tag-container { box-sizing: border-box; padding: 10px; width: 100%; height: 100%; } .tag-print .tag-code { text-align: center; } .tag-print .tag-code .barcode { max-width: 360px; height: 80px; } .tag-print .page-break-after { page-break-after: always; }</style>"
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(this.$refs.print.$el.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.focus(); // necessary for IE >= 10*/
      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia("print");
        mediaQueryList.addListener(mql => {
          if (mql.matches) {
            this.beforePrint();
          } else {
            this.afterPrint();
          }
        });
      }
      printWindow.print();
      printWindow.close();
    },
    createElementLink(td, row, col, prop, value) {
      /**创建一个div */
      let this_ = this;
      let hotInstance = this.$refs.hot.hotInstance;
      let date_div_par = document.createElement("div");
      /**设置ID */
      date_div_par.setAttribute("id", "my_excel_link_" + row + "_" + col);

      /**添加到td */
      Handsontable.dom.empty(td);
      td.appendChild(date_div_par);
      /**定义挂载extend */
      let mountCreatElement = Vue.extend({
        render: function(createElement) {
          return createElement(
            "a",
            {
              class: ["excute-link"],
              props: {
                href: "#"
              },
              on: {
                click: () => {
                  let route_row = this_.commentResult[value];
                  if (route_row) {
                    hotInstance.selectCell(route_row.row, route_row.col);
                    if (route_row.row > 20) {
                      hotInstance.scrollViewportTo(route_row.row - 10);
                    }
                  } else {
                    console.log("没有此记录");
                  }
                }
              }
            },
            value
          );
        }
      });
      /**挂载 */
      new mountCreatElement().$mount("#my_excel_link_" + row + "_" + col);
      /**禁止事件冒泡 */
      Handsontable.dom.addEvent(date_div_par, "mousedown", function(event) {
        event.stopImmediatePropagation();
      });
      Handsontable.dom.addEvent(date_div_par, "mouseup", function(event) {
        event.stopImmediatePropagation();
      });
      Handsontable.dom.addEvent(date_div_par, "mouseleave", function(event) {
        event.stopImmediatePropagation();
      });
    }
  }
};
</script>

<style lang="less">
.hot-excel {
  width: 100%;
  height: 100%;
  #informationce {
    height: 100%;
  }

  #hot-display-license-info {
    display: none;
  }

  .hot-revise-btn {
    background: blue;
    color: white !important;
  }

  .ivu-spin-fix {
    z-index: 200;
  }

  .full-row {
    line-height: 32px;
  }

  .extend_date {
    .ivu-input-icon {
      display: none;
    }
  }

  .htCenter {
    font-family: "微软雅黑";
    // font-size: 16px;
    color: #000;
  }
  .ebrselect {
    border: 2px solid #ee7800 !important;
  }
  .htLeft {
    font-family: "微软雅黑";
    // font-size: 16px;
    color: #000;
  }

  .htTitleBackground {
    font-size: 32px;
    font-weight: bold;
    color: #6d81bd !important;
    border: 1px solid #000;
    height: 60px;
  }

  .htTitleBg {
    font-size: 36px;
    font-weight: bold;
    color: #000 !important;
    border: 1px solid #000;
    border-top: 2px solid #000;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    // height: 60px;
  }

  .htSecondTitleBackground {
    font-size: 18px;
    font-weight: bold;
    color: #000 !important;
    height: 30px;
    background: #f79646;
    border: 1px solid #000;
  }

  .htBold {
    font-weight: 900;
  }

  .htReadOnly {
    color: #000;
  }

  .htFontSize24 {
    font-size: 24px;
  }

  .htDefaultTdBorder {
    border: 1px solid #000;
    border-top: none;
  }
  .htAllBorder {
    border: 1px solid #000;
  }
  .htBorderNoLeft {
    border: 1px solid #000;
    border-left: none;
  }
  .htBorderTT {
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    border-top: 2px solid #000;
  }
  .htBorderTL {
    border: 1px solid #000;
    border-left: 2px solid #000;
    border-top: 2px solid #000;
  }
  .htBorderTR {
    border-bottom: 1px solid #000;
    border-right: 2px solid #000;
    border-top: 2px solid #000;
  }
  .htDefaultTdBottomRightBorder {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .htDefaultTdBRBorder {
    border-right: 1px solid #000;
    border-bottom: 2px solid #000;
  }
  .htDefaultTdBD {
    border: 1px solid #000;
    border-top: none;
    border-left: 2px solid #000;
  }

  .htDefaultTdBR {
    border-bottom: 1px solid #000;
    border-right: 2px solid #000;
  }

  .htDefaultTdDR {
    border-left: 2px solid #000;
    border-bottom: 1px solid #000;
    border-right: 2px solid #000;
  }

  .htDefaultTdBL {
    border-bottom: 2px solid #000;
    border-right: 1px solid #000;
    border-left: 2px solid #000;
  }

  .htDefaultTdBT {
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
  }

  .htSecondTitleGreenBackground {
    font-size: 18px;
    font-weight: bold;
    color: #000 !important;
    height: 30px;
    background: #19be6b;
    border: 1px solid #000;
  }

  .htSecondTitleYellowBackground {
    font-size: 18px;
    font-weight: bold;
    color: #000 !important;
    height: 30px;
    background: #ffff00;
    border: 1px solid #000;
  }

  .htSecondTitleRedBackground {
    font-size: 18px;
    font-weight: bold;
    color: #000 !important;
    height: 30px;
    background: #ff0000;
    border: 1px solid #000;
  }

  // 设置偏差颜色
  .setblias {
    background: red;
    color: #fff !important;
  }

  //设置修订颜色
  .setrevise {
    background: #19be6b;
    color: #fff !important;
  }

  //设置强制颜色
  .setforce {
    background: yellow;
    color: black !important;
  }

  .htCommentCell:after {
    border-top: 6px solid #0505ef !important;
  }

  .excute-link {
    color: blue !important;
    cursor: pointer;
  }

  .htAllBorder {
    border-color: #000;
  }

  .htAllBorder-bottom {
    border-bottom-color: #000;
  }

  .htAllBorder-right {
    border-right-color: #000;
  }

  .htAllBorder-left {
    border-left-color: #000 !important;
  }

  .htAllBorder-top {
    border-top-color: #000 !important;
  }

  .htAllBorder-1 {
    border-top: none;
  }

  .htAllBorder-2 {
    border-left: none;
  }

  .htAllBorder-3 {
    border-bottom: none;
  }

  .htAllBorder-4 {
    border-right: none;
  }

  .htTopRightBottomBorder {
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .htTopRightBottomBorder-1 {
    border-top: none;
  }

  .htTopRightBottomBorder-2 {
    border-bottom: none;
  }

  .htTopRightBottomBorder-3 {
    border-right: none;
  }

  .htLeftRightBottomBorder {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .htLeftRightBottomBorder-1 {
    border-left: none;
  }

  .htLeftRightBottomBorder-2 {
    border-bottom: none;
  }

  .htLeftRightBottomBorder-3 {
    border-right: none;
  }

  .htBottomRightBorder {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .htBottomRightBorder-1 {
    border-bottom: none;
  }

  .htBottomRightBorder-2 {
    border-right: none;
  }

  .htNoneBorder {
    border: 0px solid #ccc;
  }

  .wtBorder {
    background-color: #ee7800 !important;
  }

  .handsontableInput {
    -webkit-box-shadow: 0 0 0 2px #ee7800 inset !important;
    box-shadow: 0 0 0 2px #ee7800 inset !important;
    line-height: 28px !important;
  }
  //可拖拽组件
  .ebr-vdr {
    z-index: 100 !important;
    background: white;
    border: 1px solid #ee7800;
    .handle {
      background: #ee7800;
      border: 1px solid #ee7800;
      border-radius: 50%;
    }
    .handle-tl {
      top: -7px;
      left: -7px;
    }
    .handle-tm {
      top: -7px;
    }
    .handle-tr {
      top: -7px;
      right: -7px;
    }
    .handle-mr {
      right: -7px;
    }
    .handle-br {
      right: -7px;
      bottom: -7px;
    }
    .handle-bm {
      bottom: -7px;
    }
    .handle-bl {
      left: -7px;
      bottom: -7px;
    }
    .handle-ml {
      left: -7px;
    }
  }
}
.app_excel {
  position: relative;
  height: 100%;
  width: 100%;
  .htRadioEditor {
    padding: 5px 7px;
    position: absolute;
    /*
   * This hack enables to change <select> dimensions in WebKit browsers
   */
    -webkit-appearance: menulist-button !important;
  }
  .excute-btn {
    color: white;
    background: #eb6100;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .hot-revise-btn {
    background: blue;
    color: white;
  }
  #excutece {
    height: calc(100% - 52px);
    width: 100%;
  }
  #hot-display-license-info {
    display: none;
  }
  .extend_date {
    height: 100%;
    .ivu-input-icon {
      height: 100%;
      // line-height: 24px;
    }
    .ivu-input {
      height: 100%;
      width: 100%;
      padding: 0 3px;
      background: #eb6100;
      color: #fff;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 3px;
    }
    ::-webkit-input-placeholder {
      color: #fff;
    }
    .ivu-date-picker {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      .ivu-date-picker-rel {
        height: 100%;
        width: 100%;
        .ivu-input-wrapper {
          height: 100%;
          display: flex;
        }
      }
      .ivu-select-dropdown {
        // margin-top: 30px;
        // top: inherit !important;
        left: inherit !important;
        .ivu-time-picker-cells-list {
          border: none;
        }
        .ivu-picker-confirm {
          .ivu-btn-default {
            display: none;
          }
        }
      }
    }
    .ivu-input-suffix {
      display: none;
    }
  }
  .extend_enum {
    height: 100%;
    .ivu-select {
      height: 100%;
      .ivu-select-selection {
        height: 100%;
        border: none;
        div {
          height: 100%;
          .ivu-select-selected-value {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ivu-select-placeholder {
            height: 100%;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
    .ivu-radio-group {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .ivu-radio-wrapper {
        display: inline;
      }
    }
  }
  .extend_sign {
    .ivu-tooltip {
      height: 100%;
      .ivu-tooltip-rel {
        height: 100%;
        .ivu-btn {
          height: 100%;
          margin-left: 0px;
        }
      }
    }
  }
  // 设置偏差颜色
  .setblias {
    background: red;
    color: #fff !important;
  }
  //设置强制颜色
  .setforce {
    background: yellow;
    color: black;
  }
  .hot-err-input {
    .ivu-input {
      color: red;
    }
  }
  .htAllBorder {
    border-color: #000;
  }
  .htAllBorder-bottom {
    border-bottom-color: #000;
  }
  .htAllBorder-right {
    border-right-color: #000;
  }
  .htAllBorder-left {
    border-left: 1px solid #000;
  }
  .htAllBorder-top {
    border-top: 1px solid #000;
  }
  .htAllBorder-1 {
    border-top: none;
  }
  .htAllBorder-2 {
    border-left: none;
  }
  .htAllBorder-3 {
    border-bottom: none;
  }
  .htAllBorder-4 {
    border-right: none;
  }
  .htTopRightBottomBorder {
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .htTopRightBottomBorder-1 {
    border-top: none;
  }
  .htTopRightBottomBorder-2 {
    border-bottom: none;
  }
  .htTopRightBottomBorder-3 {
    border-right: none;
  }
  .htLeftRightBottomBorder {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .htLeftRightBottomBorder-1 {
    border-left: none;
  }
  .htLeftRightBottomBorder-2 {
    border-bottom: none;
  }
  .htLeftRightBottomBorder-3 {
    border-right: none;
  }
  .htBottomRightBorder {
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .htBottomRightBorder-1 {
    border-bottom: none;
  }
  .htBottomRightBorder-2 {
    border-right: none;
  }
  .htNoneBorder {
    border: 0px solid #ccc;
  }
  .wtBorder {
    background-color: #ee7800 !important;
  }
  .handsontableInput {
    -webkit-box-shadow: 0 0 0 2px #ee7800 inset !important;
    box-shadow: 0 0 0 2px #ee7800 inset !important;
    line-height: 28px !important;
  }
}
</style>