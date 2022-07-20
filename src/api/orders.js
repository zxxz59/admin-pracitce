import request from '@/utils/request'
export function getOrdersListAPI(params) {
  return request({
    method: 'get',
    url: 'orders',
    params
  })
}
// consignee_addr: ""
// create_time: 1658147663
// is_send: "否"
// order_fapiao_company: ""
// order_fapiao_content: ""
// order_fapiao_title: "个人"
// order_id: 67
// order_number: "itcast-g7kmck71vjaujfgoi"
// order_pay: "0"
// order_price: 203
// pay_status: "0"
// trade_no: ""
// update_time: 1658147663
// user_id: 1
