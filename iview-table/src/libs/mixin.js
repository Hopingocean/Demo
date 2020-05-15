export default {
  data () {
    return {
      receivePiData: '',
      receiveWcData: '',
      receiveBatchData: '',
      receiveForData: '',
      showModal: false,
      wcShowModal: false,
      woShowModal: false,
      formulaShowModal: false,
      keyValue: '',
      keyType: '',
      statusType: '',
      infoForm: {
        woNum: '',
        woState: '',
        batchNum: '',
        woType: 2,
        cmdType: 1, // 指令类型
        woFrom: '',
        quantity: null,
        unit: '',
        formulaCode: ''
      },
      refTag: false,
      // addform是用来存储id
      addForm: {
        formulaId: null,
        mainFormulaId: '',
        sDate: '',
        eDate: ''
      },
      // 配方数据
      formula: {},
      formulaCopy: {},
      // 生产计划
      producePlan: {
        equalWeight: null, // 等价称量
        referQuantity: null // 参考数量
      },
      producePlanCopy: {},
      // 主配方数据
      pi: {}
    }
  }
}