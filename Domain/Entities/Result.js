class Result{
    constructor(content, success, messages, status){
        this.content = content;
        this.success = success;
        this.messages = messages;
        this.status = status
    }
}

module.exports = Result;