<template>
  <div class="common-layout">
    <el-container>
      <el-header style="position: sticky;top:0px;background-color: white;z-index: 100;" height="52px">
        <el-page-header :icon="EditPen" title="修改参数" @back="drawer = true" style="padding: 14px 0;">
          <template #content>
            塔板数计算器
          </template>
          <template #extra>
          </template>
        </el-page-header>
      </el-header>
      <el-divider style="margin: 0;position: sticky;top:52px" />
      <el-main>
        <table cellspacing="0" style="margin: 0 auto;text-align:center;">
          <tr>
            <th>投料量(q<sub>nF</sub>)</th>
            <th>塔顶采出(q<sub>nD</sub>)</th>
            <th>塔底采出(q<sub>nW</sub>)</th>
          </tr>
          <tr>
            <td>{{ round(s.qnF) }}</td>
            <td>{{ round(s.qnD) }}</td>
            <td>{{ round(s.qnW) }}</td>
          </tr>
          <tr>
            <th>Q点(x<sub>q</sub>)</th>
            <th>Q点(y<sub>q</sub>)</th>
            <th>回流比(R<sub></sub>)</th>
          </tr>
          <tr>
            <td>{{ round(s.xe) }}</td>
            <td>{{ round(s.ye) }}</td>
            <td>{{ round(s.R) }}</td>
          </tr>
          <tr>
            <th>塔板数(n<sub></sub>)</th>
            <th>液相组成(x<sub>n</sub>)</th>
            <th>气相组成(y<sub>n</sub>)</th>
          </tr>
          <tr v-for="i in s.x.length - 1">
            <td>{{ i }}</td>
            <td>{{ round(s.x[i]) }}</td>
            <td>{{ round(s.y[i]) }}</td>
          </tr>
        </table>
      </el-main>
      <el-divider style="margin: 0; background-color: white;" />
      <el-footer style="background-color: white">
        <div style="text-align: center;line-height: 1.5em;padding: 1em 0;">
          如有使用中的疑问、建议或问题反馈欢迎在
          <a href="https://github.com/Drelf2018/vue-plate-number-calculator">项目</a>
          留言。
        </div>
      </el-footer>
    </el-container>
    <img class="elaina" :src="image">
  </div>
  <el-drawer v-model="drawer" direction="ltr" :show-close="true" title="参数列表" class="drawer" :lock-scroll="false">
    <template #default>
      <el-input v-model="inputs[i][1]" v-for="_, i in inputs" class="btn">
        <template #prepend><div v-html="inputs[i][0]"></div></template>
      </el-input>
      <el-input v-model="r" class="btn" min="0" max="100" maxlength="2">
        <template #prepend>小数</template>
      </el-input>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="modify_parameter">修改</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Solution from './solution'
import { EditPen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const s = ref(new Solution(140, 0.65, 0.99, 0.01, 1.4399, 1.5, 1))
const drawer = ref(false)
const inputs = ref([
  ["q<sub>nF</sub>", "140"],
  ["x<sub>F</sub>", "0.65"],
  ["x<sub>D</sub>","0.99"],
  ["x<sub>W</sub>", "0.01"],
  ["alpha", "1.4399"],
  ["beta", "1.5"],
  ["q", "1"],
])
const r = ref("4")


function round(x: number): number {
  let f = parseInt(r.value)
  if (f < 0) {
    f = 0
  }
  return Number(x.toFixed(f))
}

function get_input(idx: number): number {
  let x = parseFloat(inputs.value[idx][1])
  inputs.value[idx][1] = String(x)
  return x
}

function modify_parameter() {
  drawer.value = false
  try {
    let data = new Solution(get_input(0), get_input(1), get_input(2), get_input(3), get_input(4), get_input(5), get_input(6))
    s.value = data
  } catch (error) {
    ElMessage({
      showClose: true,
      duration: 0,
      message: "参数设置错误："+String(error),
      offset: 6,
      type: "error"
    })
  }
} 

const image = ref("/elaina" + Math.floor(Math.random() * 3) + ".webp")
</script>

<style>
.el-drawer__header {
  margin-bottom: 0px !important;
  line-height: 52px;
  padding: 0 var(--el-drawer-padding-primary) !important;
}

.el-drawer__body {
  border-top: 1px var(--el-border-color) var(--el-border-style); 
  border-bottom: 1px var(--el-border-color) var(--el-border-style); 
}

.elaina {
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: -1;
  filter: opacity(0.8);
  width: 25%;
}

.el-footer {
  height: auto !important;
}

.drawer {
  width: 25% !important;
}

.btn {
  margin-bottom: 12px;
}

.btn .el-input-group__prepend {
  width: 20px !important;
}

th, td {
  padding: 8px;
}

@media (max-width: 768px) {
  tr:nth-child(even) {
    background-color: rgba(242, 242, 242, 0.8) !important;
  }

  tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }

  .elaina {
    width: 100%;
    filter: opacity(0.5) !important;
  }

  .drawer {
    width: 100% !important;
  }
}

tr:nth-child(even) {
  background-color: rgb(242, 242, 242);
}

tr:nth-child(odd) {
  background-color: rgb(255, 255, 255);
}

tr:first-of-type th, tr:nth-of-type(3) th, tr:nth-of-type(5) th {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}

tr:last-child td {
  border-bottom: 2px solid black;
}
</style>
