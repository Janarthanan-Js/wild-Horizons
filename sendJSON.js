export const sendJSON=(res,statuscode,payload)=>{
    res.setHeader('Content-Type', 'application/json');
    res.statusCode=statuscode
    res.end(JSON.stringify(payload))
}