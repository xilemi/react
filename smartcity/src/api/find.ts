import requset from "../utils/request"
export const getCityListApi = () => {
    return requset.get("https://m.maizuo.com/gateway", {
        headers: {
            'X-Host': 'mall.film-ticket.city.list',
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16793835041819386801291265"}'
        }
    })
}