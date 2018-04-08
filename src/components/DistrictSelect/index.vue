<template>
  <div style="display:inline-block">
    <el-select style="display:inline-block" v-model="provinceId" placeholder="请选择省" @change="cityArr=[],areaArr=[],getCityArr(provinceId),areaId='',cityId=''">
      <el-option v-for="item in provinceArr" :key="item.id" :label="item.name+item.suffix" :value="item.id">
      </el-option>
    </el-select>
    <el-select style="display:inline-block" v-model="cityId" placeholder="请选择市" @change="areaArr=[],getAreaArr(cityId),areaId=''"
      v-show="cityArr&&cityArr[0]">
      <el-option v-for="item in cityArr" :key="item.id" :label="item.name+item.suffix" :value="item.id">
      </el-option>
    </el-select>
    <el-select required style="display:inline-block" v-model="areaId" placeholder="请选择区" v-show="areaArr&&areaArr[0]" @change="areaChange">
      <el-option v-for="item in areaArr" :key="item.id" :label="item.name+item.suffix" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {
    select,
    option
  } from 'element-ui'
  import { getDistrictByParentId } from '@/api/districtAPI'
  export default {
    data() {
      return {
        provinceArr: [],
        areaArr: [],
        cityArr: [],
        districtCache: {},
        provinceId: '',
        cityId: '',
        areaId: ''
      }
    },
    mounted() {
      this.getProvinceArr()
    },
    computed: {
    },
    components: {
      'el-select': select,
      'el-option': option,
    },
    props: {
      value: {
        default: 1
      }
    },
    watch: {
      value(val) {
        this.areaId = val
      },
      areaId(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      async getDisByParentId(id) {
        const params = { id: id || 0 }
        try {
          let data = (await getDistrictByParentId({ params: params })).data
          if (data.returnCode == 0) {
            return data.data
          }
        } catch (err) {
          throw Error(err, '请求出错')
        }
      },
      async getProvinceArr(id) {
        this.provinceArr = await this.getDisByParentId(id)
      },
      async getCityArr(id) {
        if (this.districtCache[id]) {
          if (this.districtCache[id][0].suffix == '区' || this.districtCache[id][0].suffix == '堂区') {
            this.areaArr = this.districtCache[id]
          } else {
            this.cityArr = this.districtCache[id]
          }
          // this.cityArr = this.districtCache[id]
          return false
        }
        let data = await this.getDisByParentId(id)
        if ((data[0].suffix == '区') || (data[0].suffix == '堂区')) {
          this.areaArr = data
        } else {
          this.cityArr = data
        }
        this.districtCache[id] = data
      },
      async getAreaArr(id) {
        if (this.districtCache[id]) {
          this.areaArr = this.districtCache[id]
          return false
        }
        this.areaArr = await this.getDisByParentId(id)
        this.districtCache[id] = this.areaArr
      },
      areaChange() {
        this.$emit('areaChange', {
          provinceId: this.provinceId,
          cityId: this.cityId,
          areaId: this.areaId
        })
      },
      async filterDistrictId(districtVO) {
        if (districtVO.parentVO) {
          if (districtVO.parentVO.parentVO) {
            const provinceId = districtVO.parentVO.parentVO.id
            const cityId = districtVO.parentVO.id
            const areaId = districtVO.id
            this.provinceId = provinceId
            await this.getCityArr(provinceId)
            this.cityId = cityId
            await this.getAreaArr(cityId)
            this.areaId = areaId
          } else {
            const provinceId = districtVO.parentVO.id
            const areaId = districtVO.id
            this.provinceId = provinceId
            await this.getAreaArr(provinceId)
            this.areaId = areaId
          }
        }
        console.log(districtVO, 'ggggggggggggggggggggg')
        // if (data.suffix == '省') {
        //   await this.getCityArr(data.id)
        //   this.provinceId = data.id
        // } else if (data.parent_id == 1) {
        //   this.provinceId = data.id
        //   await this.getAreaArr(data.id)
        // } else if (data.suffix == '市') {
        //   await this.getAreaArr(data.id)
        //   this.cityId = data.id
        // } else if (data.suffix == '区' || data.suffix == '县' || data.suffix == '堂区') {
        //   this.areaId = data.id
        // }
      },
      clearDistrictData() {
        this.cityArr = []
        this.areaArr = []
        this.provinceId = ''
        this.cityId = ''
        this.areaId = ''
      }
    }
  }

</script>