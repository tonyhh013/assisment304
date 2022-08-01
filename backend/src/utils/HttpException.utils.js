class HttpExeption extends Error {
    constructor(status,message,data){
        super(message);
        this.status=status;
        this.message=this.message;
        this.data=data;
    }
}
module.exports=HttpExeption;