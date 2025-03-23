# grid-table sample

```html
<template>
  <div class="order-team-info resolve-49">
    <grid-table
      ref="table"
      :columns="tableColumns"
      :data="datas"
      :queryParams="queryParams"
      :pagerConfigs="pagerConfigs"
      :select-configs="selectConfigs"
      :edit-configs="editConfigs"
      :rowConfigs="rowConfigs"
      :filter-configs="filterConfigs"
      :sortConfigs="{ remote: false }"
      @select-change="handleSelectChange"
    >
      <template slot="headerLeft">
        <span>手动触发</span>
      </template>
      <template slot="headerRight">
        <a-button class="button" type="primary" @click="handleAdd"
          >新增行
        </a-button>
        <a-button
          class="button"
          :type="loadType === 'completion' ? 'primary' : 'default'"
          @click="handleSaveAll"
          >整体保存
        </a-button>
      </template>
    </grid-table>
  </div>
</template>

<script>
export default {
  data() {
    const _this = this;
    return {
      // 表格配置唯一标识
      uniqueId: "",
      rowConfigs: {
        keyField: "id" // 行唯一标识
      },
      tableColumns: [
        {
          title: "单选框",
          field: "b",
          filter: {
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          editor: {
            type: "radio",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          minWidth: "150",
          sort: {
            enabled: true,
            sortType: "string"
          }
        },
        {
          title: "数字",
          field: "c",
          minWidth: "150",
          filter: {
            type: "number"
          },
          editor: {
            type: "number",
            rules: [
              {
                type: "number",
                min: 1,
                max: 100,
                message: "1~100之间"
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉多选",
          field: "d",
          minWidth: "150",
          filter: {
            type: "multiSelect",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          editor: {
            type: "multiSelect",
            prop: "progressStatusList",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                validator({
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex,
                  column,
                  columnIndex
                }) {
                  console.log(cellValue);
                  if (!cellValue || cellValue.length < 1) {
                    return new Error("最少选择一个");
                  }
                }
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉单选",
          field: "e",
          minWidth: "150",
          editor: {
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "多选框",
          field: "f",
          minWidth: "150",
          editor: {
            type: "checkbox",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "单个日期",
          field: "g",
          minWidth: "150",
          editor: {
            type: "date"
          },
          sort: true
        },
        {
          title: "日期范围",
          field: "h",
          minWidth: "150",
          editor: {
            type: "daterange",
            bind: {
              showTime: true,
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          },
          sort: { enabled: true, prop: "nvl(SFJJDD,'N')" }
        },
        {
          title: "日期带时分秒",
          field: "i",
          minWidth: "150",
          editor: {
            type: "date",
            bind: {
              showTime: true,
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          }
        },
        {
          title: "自定义render",
          field: "j-1",
          minWidth: "150",
          editor: {
            render(h, value, scoped) {
              // 模拟选人等 需要存储多个值的处理
              return (
                <a-tree-select
                  v-model={scoped.row.j}
                  show-search
                  style="width: 100%"
                  dropdown-style={{ maxHeight: "400px", overflow: "auto" }}
                  placeholder="Please select"
                  allow-clear
                  tree-default-expand-all
                  on={{
                    change(value, label) {
                      scoped.row["j-1"] = Array.isArray(label)
                        ? label[0]
                        : label;
                    }
                  }}
                >
                  <a-tree-select-node key="0-1" value="0-1" title="parent 1">
                    <a-tree-select-node
                      key="0-1-1"
                      value="0-1-1"
                      title="parent 1-0"
                    >
                      <a-tree-select-node
                        key="random"
                        value="0-1-1-1"
                        title="my leaf"
                      />
                      <a-tree-select-node
                        key="random1"
                        value="0-1-1-2"
                        title="your leaf"
                      />
                    </a-tree-select-node>
                    <a-tree-select-node
                      key="random2"
                      value="0-1-2"
                      title="parent 1-1"
                    >
                      <a-tree-select-node key="random3" value="0-1-2-1">
                        <b slot="title" style="color: #08c">
                          sss
                        </b>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select-node>
                </a-tree-select>
              );
            }
          }
        },
        {
          title: "文本1",
          field: "a1",
          minWidth: "150",
          editor: {
            type: "input",
            rules: [
              {
                min: 5,
                max: 20,
                message: "文本长度5~20之间"
              }
            ]
          }
        },
        {
          title: "单选框1",
          field: "b1",
          editor: {
            type: "radio",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          minWidth: "150",
          sort: true
        },
        {
          title: "数字1",
          field: "c1",
          minWidth: "150",
          editor: {
            type: "number",
            rules: [
              {
                type: "number",
                min: 1,
                max: 100,
                message: "1~100之间"
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉多选1",
          field: "d1",
          minWidth: "150",
          editor: {
            type: "multiSelect",
            prop: "progressStatusList",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                validator({
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex,
                  column,
                  columnIndex
                }) {
                  if (!cellValue || cellValue.length < 1) {
                    return new Error("最少选择一个");
                  }
                }
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉单选1",
          field: "e1",
          minWidth: "150",
          editor: {
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "多选框1",
          field: "f1",
          minWidth: "150",
          editor: {
            type: "checkbox",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "单个日期1",
          field: "g1",
          minWidth: "150",
          editor: {
            type: "date"
          },
          sort: true
        },
        {
          title: "日期范围1",
          field: "h1",
          minWidth: "150",
          editor: {
            type: "daterange"
          },
          sort: { enabled: true, prop: "nvl(SFJJDD,'N')" }
        },
        {
          title: "日期带时分秒1",
          field: "i1",
          minWidth: "150",
          editor: {
            type: "date",
            bind: {
              showTime: true,
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          }
        },
        {
          title: "自定义render1",
          field: "j-11",
          minWidth: "150",
          editor: {
            render(h, value, scoped) {
              // 模拟选人等 需要存储多个值的处理
              return (
                <a-tree-select
                  v-model={scoped.row.j}
                  show-search
                  style="width: 100%"
                  dropdown-style={{ maxHeight: "400px", overflow: "auto" }}
                  placeholder="Please select"
                  allow-clear
                  tree-default-expand-all
                  on={{
                    change(value, label) {
                      scoped.row["j-11"] = Array.isArray(label)
                        ? label[0]
                        : label;
                    }
                  }}
                >
                  <a-tree-select-node key="0-1" value="0-1" title="parent 1">
                    <a-tree-select-node
                      key="0-1-1"
                      value="0-1-1"
                      title="parent 1-0"
                    >
                      <a-tree-select-node
                        key="random"
                        value="0-1-1-1"
                        title="my leaf"
                      />
                      <a-tree-select-node
                        key="random1"
                        value="0-1-1-2"
                        title="your leaf"
                      />
                    </a-tree-select-node>
                    <a-tree-select-node
                      key="random2"
                      value="0-1-2"
                      title="parent 1-1"
                    >
                      <a-tree-select-node key="random3" value="0-1-2-1">
                        <b slot="title" style="color: #08c">
                          sss
                        </b>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select-node>
                </a-tree-select>
              );
            }
          }
        },
        {
          title: "文本",
          field: "a",
          minWidth: "150",
          filter: {
            type: "input"
          },
          editor: {
            type: "input",
            rules: [
              {
                min: 5,
                max: 20,
                message: "文本长度5~20之间"
              }
            ]
          }
        },
        {
          title: "文本2",
          field: "a2",
          minWidth: "150",
          editor: {
            type: "input",
            rules: [
              {
                min: 5,
                max: 20,
                message: "文本长度5~20之间"
              }
            ]
          }
        },
        {
          title: "单选框2",
          field: "b2",
          editor: {
            type: "radio",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          minWidth: "150",
          sort: true
        },
        {
          title: "数字2",
          field: "c2",
          minWidth: "150",
          editor: {
            type: "number",
            rules: [
              {
                type: "number",
                min: 1,
                max: 100,
                message: "1~100之间"
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉多选2",
          field: "d2",
          minWidth: "150",
          editor: {
            type: "multiSelect",
            prop: "progressStatusList",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                validator({
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex,
                  column,
                  columnIndex
                }) {
                  if (!cellValue || cellValue.length < 1) {
                    return new Error("最少选择一个");
                  }
                }
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉单选2",
          field: "e2",
          minWidth: "150",
          editor: {
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "多选框2",
          field: "f2",
          minWidth: "150",
          editor: {
            type: "checkbox",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "单个日期2",
          field: "g2",
          minWidth: "150",
          editor: {
            type: "date"
          },
          sort: true
        },
        {
          title: "日期范围2",
          field: "h2",
          minWidth: "150",
          editor: {
            type: "daterange"
          },
          sort: { enabled: true, prop: "nvl(SFJJDD,'N')" }
        },
        {
          title: "日期带时分秒2",
          field: "i2",
          minWidth: "150",
          editor: {
            type: "date",
            bind: {
              showTime: true,
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          }
        },
        {
          title: "自定义render2",
          field: "j-12",
          minWidth: "150",
          editor: {
            render(h, value, scoped) {
              // 模拟选人等 需要存储多个值的处理
              return (
                <a-tree-select
                  v-model={scoped.row.j}
                  show-search
                  style="width: 100%"
                  dropdown-style={{ maxHeight: "400px", overflow: "auto" }}
                  placeholder="Please select"
                  allow-clear
                  tree-default-expand-all
                  on={{
                    change(value, label) {
                      scoped.row["j-12"] = Array.isArray(label)
                        ? label[0]
                        : label;
                    }
                  }}
                >
                  <a-tree-select-node key="0-1" value="0-1" title="parent 1">
                    <a-tree-select-node
                      key="0-1-1"
                      value="0-1-1"
                      title="parent 1-0"
                    >
                      <a-tree-select-node
                        key="random"
                        value="0-1-1-1"
                        title="my leaf"
                      />
                      <a-tree-select-node
                        key="random1"
                        value="0-1-1-2"
                        title="your leaf"
                      />
                    </a-tree-select-node>
                    <a-tree-select-node
                      key="random2"
                      value="0-1-2"
                      title="parent 1-1"
                    >
                      <a-tree-select-node key="random3" value="0-1-2-1">
                        <b slot="title" style="color: #08c">
                          sss
                        </b>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select-node>
                </a-tree-select>
              );
            }
          }
        },
        {
          title: "文本3",
          field: "a3",
          minWidth: "150",
          editor: {
            type: "input",
            rules: [
              {
                min: 5,
                max: 20,
                message: "文本长度5~20之间"
              }
            ]
          }
        },
        {
          title: "单选框3",
          field: "b3",
          editor: {
            type: "radio",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          minWidth: "150",
          sort: true
        },
        {
          title: "数字3",
          field: "c3",
          minWidth: "150",
          editor: {
            type: "number",
            rules: [
              {
                type: "number",
                min: 1,
                max: 100,
                message: "1~100之间"
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉多选3",
          field: "d3",
          minWidth: "150",
          editor: {
            type: "multiSelect",
            prop: "progressStatusList",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ],
            rules: [
              {
                validator({
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex,
                  column,
                  columnIndex
                }) {
                  if (!cellValue || cellValue.length < 1) {
                    return new Error("最少选择一个");
                  }
                }
              }
            ]
          },
          sort: true
        },
        {
          title: "下拉单选3",
          field: "e3",
          minWidth: "150",
          editor: {
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "多选框3",
          field: "f3",
          minWidth: "150",
          editor: {
            type: "checkbox",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 }
            ]
          },
          sort: true
        },
        {
          title: "单个日期3",
          field: "g3",
          minWidth: "150",
          editor: {
            type: "date"
          },
          sort: true
        },
        {
          title: "日期范围3",
          field: "h3",
          minWidth: "150",
          editor: {
            type: "daterange"
          },
          sort: { enabled: true, prop: "nvl(SFJJDD,'N')" }
        },
        {
          title: "日期带时分秒3",
          field: "i3",
          minWidth: "150",
          editor: {
            type: "date",
            bind: {
              showTime: true,
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          }
        },
        {
          title: "自定义render3",
          field: "j-13",
          minWidth: "150",
          editor: {
            render(h, value, scoped) {
              // 模拟选人等 需要存储多个值的处理
              return (
                <a-tree-select
                  v-model={scoped.row.j}
                  show-search
                  style="width: 100%"
                  dropdown-style={{ maxHeight: "400px", overflow: "auto" }}
                  placeholder="Please select"
                  allow-clear
                  tree-default-expand-all
                  on={{
                    change(value, label) {
                      scoped.row["j-13"] = Array.isArray(label)
                        ? label[0]
                        : label;
                    }
                  }}
                >
                  <a-tree-select-node key="0-1" value="0-1" title="parent 1">
                    <a-tree-select-node
                      key="0-1-1"
                      value="0-1-1"
                      title="parent 1-0"
                    >
                      <a-tree-select-node
                        key="random"
                        value="0-1-1-1"
                        title="my leaf"
                      />
                      <a-tree-select-node
                        key="random1"
                        value="0-1-1-2"
                        title="your leaf"
                      />
                    </a-tree-select-node>
                    <a-tree-select-node
                      key="random2"
                      value="0-1-2"
                      title="parent 1-1"
                    >
                      <a-tree-select-node key="random3" value="0-1-2-1">
                        <b slot="title" style="color: #08c">
                          sss
                        </b>
                      </a-tree-select-node>
                    </a-tree-select-node>
                  </a-tree-select-node>
                </a-tree-select>
              );
            }
          }
        },
        {
          title: "操作",
          field: "action",
          fixed: "right",
          minWidth: "200",
          editor: {
            render(h, value, row) {
              return (
                <section style="text-align:center">
                  <a-button type="link" onClick={() => _this.handleSave(row)}>
                    <span>保存</span>
                  </a-button>

                  <a-button type="link" onClick={() => _this.handleCancel(row)}>
                    <span>取消</span>
                  </a-button>
                </section>
              );
            }
          },
          render(h, scoped) {
            return (
              <section>
                <a-button type="link" onClick={() => _this.handleCopy(scoped)}>
                  <span>复制</span>
                </a-button>

                <a-button
                  type="link"
                  onClick={e => _this.handleEdit(scoped, e)}
                >
                  <span>编辑</span>
                </a-button>

                <a-button
                  type="link"
                  onClick={() => _this.handleDelete(scoped)}
                >
                  <span>删除</span>
                </a-button>
              </section>
            );
          }
        }
      ],

      datas: [],
      queryParams: {
        orderExecGroupType: "TEAM",
        filter: {
          isComplete: "N"
        }
      },
      filterConfigs: {
        remote: false,
        outSearch: true,
        filterAllDataOnStatic: true
      },
      pagerConfigs: {
        enabled: true,
        pageSize: 10,
        // 每页大小选项列表
        pageSizes: [10, 20, 50, 100]
      },
      selectConfigs: {
        enabled: true,
        isMultiple: true,
        defaultSelectedRowKeys: []
      },
      editConfigs: {
        enabled: true,
        trigger: "manual"
      },

      loadType: ""
    };
  },
  created() {
    this.datas = new Array(10).fill("").map((data, index) => {
      const i = index + 1;
      return {
        id: i + "",
        a: "a" + i,
        b: i > 2 ? "b" + i : i,
        c: i,
        d: [],
        e: "e" + i,
        f: [],
        g: "g" + i,
        h: [],
        i: "i" + i,
        j: "j" + i,
        "j-1": ""
      };
    });
  },
  methods: {
    handleAdd() {
      // 先判断是否有编辑中数据
      const editRow = this.$refs.table.handleGetEditorData();
      if (editRow) {
        return this.$message.warn("请先保存");
      }
      /**根据columns 获取新增的行数据
       * 如果知道 也可跳过这一步
       * 插入的数据也需要一个id
       * 如果知道数据格式  可自行创建
       */
      this.$refs.table.handleGetNewInsertData().then(newData => {
        // 插入数据  可批量插入传数组  第二个参数为位置  0：第一  -1：最后
        // 该方法插入的为临时数据
        this.$refs.table.handleInsertDatas(newData, 0).then(() => {
          // 插入后将新数据设置为编辑态
          this.$refs.table.handleEditRowById(newData[this.rowConfigs.keyField]);
        });
      });
    },
    // 如果不单个保存，而需要整体保存时
    handleSaveAll() {
      /**情况一  只保存变化内容 新增跟变化项 */
      // 获取新增的数据
      const addDatas = this.$refs.table.handleGetInsertRows();
      if (addDatas && addDatas.length > 0) {
        addDatas.forEach(data => {
          // 去除新增数据的临时id
          data[this.rowConfigs.keyField] = "";
        });
      }
      // 获取更新的数据
      const updateDatas = this.$refs.table.handleGetUpdateRows();
      // 获取删除的数据
      const removeDatas = this.$refs.table.handleGetRemoveRows();
      console.log(addDatas, updateDatas, removeDatas);
      /* 情况二  保存表格内所有数据 */
      const { tableData } = this.$refs.table.handleAllTableData();
    },
    handleEdit({ row }) {
      const editRow = this.$refs.table.handleGetEditorData();
      if (editRow) {
        return this.$message.warn("请先保存");
      }

      this.$refs.table.handleEditRowById(row[this.rowConfigs.keyField]);
    },
    handleSave(scoped) {
      // 效验
      this.$refs.table.handleTableValidate(errMap => {
        if (!errMap) {
          // 清除编辑态
          this.$refs.table.handleClearEdit().then(() => {
            // 改变数据
            this.$refs.table.handleUpdateData(scoped.row, {
              id: new Date().getTime()
            });
          });
        }
      });
    },
    handleCancel({ row }) {
      // 新增的数据 取消视为删除
      if (row[this.rowConfigs.keyField].startsWith("row_")) {
        this.$refs.table.handleRemoveDatas(row);
      } else {
        // 还原数据
        this.$refs.table.handleClearEdit().then(() => {
          this.$refs.table.handleRevertData();
        });
      }
    },

    handleCopy({ row, rowIndex }) {
      /**三种复制方式  都拥有3个参数
       * data/index/id: 复制的内容
       * toIndex 默认为0 复制带最前面
       *         -1 复制到最后
       *        rowIndex 复制到上方
       *        rowIndex+1 复制到下方
       * hasNewRowKey 默认为true 是否自动生成新id标识
       */
      //
      // 根据数据复制
      // this.$refs.table
      //   .handleCopyDatas(row, rowIndex)
      //   .then(({ row: newData }) => {
      //     // 插入后将新数据设置为编辑态
      //     this.$refs.table.handleEditRowById(newData[this.rowConfigs.keyField]);
      //   });
      // 根据index复制
      // this.$refs.table
      //   .handleCopyDatasByIndex(rowIndex, rowIndex + 1)
      //   .then(newData => {
      //     // 插入后将新数据设置为编辑态
      //     this.$refs.table.handleEditRowById(
      //       newData.row[this.rowConfigs.keyField]
      //     );
      //   });
      // 根据id复制
      this.$refs.table
        .handleCopyDatasById(row[this.rowConfigs.keyField], -1)
        .then(newData => {
          // 插入后将新数据设置为编辑态
          this.$refs.table.handleEditRowById(
            newData.row[this.rowConfigs.keyField]
          );
        });
    },
    handleDelete(scoped) {
      // 当前删除只是假删除 如歌选中数据被删除 不会触发选中变化事件
      // 三种删除方式
      // 根据数据删除
      // this.$refs.table.handleRemoveDatas(scoped.row);
      // 根据index删除
      // this.$refs.table.handleRemoveDatasByIndex(scoped.rowIndex);
      // 根据id删除
      this.$refs.table.handleRemoveDatasById(
        scoped.row[this.rowConfigs.keyField]
      );

      // 真正删除事件
      setTimeout(() => {
        this.$refs.table.handleUpdateData(scoped.row);
      }, 1000);
    },
    handleSelectChange(datas) {
      console.log(datas);
    }
  }
};
</script>

<style lang="less" scoped>
.order-team-info {
  height: calc(100% - 35px);
  padding-top: 8px;
  .ant-btn {
    margin-left: 10px;
  }

  &::v-deep {
    .containerTag {
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
}
</style>

```
