// const appurl = 'http://192.168.1.9:4000'//本地

let base_url = '';
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development"){  // 开发版
  base_url = '/api'
} else {  // 正式版（打包后的）
  base_url = ''
}

// tec.cqmdata.com
export default
{
//   appurl,   // 接口地址
  base_url
}