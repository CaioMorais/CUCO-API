let Result = require("../Domain/Entities/Result.js")
exports.autenticar = (req, res, next) =>{
    result = new Result({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM", "type": "Bearer"}, true, "Logado com sucesso")
    res.status(200).send(result)
}