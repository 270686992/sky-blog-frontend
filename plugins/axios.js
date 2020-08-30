import {Message} from "element-ui";


export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        // console.log('Making request to ')
        // console.log(config.url)
    })

    $axios.onResponse(response => {
        // if(response.data.success == false){
        //     console.log("请求失败");
        //     return;
        // }
        // console.log('拦截;')
        // console.log(response)
        // console.log(response.data);
        return response
    })

    $axios.onError(error => {
        const res = error.response
        const data = error.response.data

        if (!(data.code === 10003 && res.config.url === 'http://localhost:8081/v1/customer/information')) {
            Message.error(data.message)
        }
    })

}
