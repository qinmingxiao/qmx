// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('test:', event)
  const wxContext = cloud.getWXContext()
  let teacherId = [20201111,20201112,20201113]
  let {id} = event
  let isTeacherId = false
  let flag = 0
for(i=0;i<teacherId.length;i++){
   if(id==teacherId[i]){
     flag = 1;
     break;
   }
}
if(flag==1){
  isTeacherId = true
}else if(flag==0){
  isTeacherId = false
}
  return {
    event,
    isTeacherId,
  }
}