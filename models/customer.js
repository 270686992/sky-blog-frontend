import {
    post,
} from '@/services/http/axios'

class Customer {
    async register(params) {
        const res = await post('v1/customer/register', params)
        return res
    }

}

export default new Customer()
