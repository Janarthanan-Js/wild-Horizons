export const sendJsonResponse=(res,statuscode,payload)=>{
    res.setHeader('Content-Type',"application/json")
    res.setHeader('Access-Control-Allow-origin','*')
    res.setHeader("Access-Control-Allow-Methods","GET")
    res.statusCode=statuscode
    res.end(JSON.stringify(payload))
}