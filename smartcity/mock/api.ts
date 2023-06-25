import Mock, { Random } from "mockjs"
import DB from "./utils";
const user=new DB("users")
Mock.mock("/prod-api/api/login", "post", (req, res) => {
    console.log(req.body);
    return {
        code: 200,
        message: "请求成功",
        ...Mock.mock({
            "rows|5": [
                {
                    "name": "@name",
                    "age":"@integer(100,200)"
                }
            ]
        })
    }
})




