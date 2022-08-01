import axios from "axios";

export const paymentMiddleware = async (payload,localToken) => {


    const response = await axios.put("http://localhost:3332/api/v1/order/payment", {payload,localToken} , {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localToken}` 
        }
    });
        
    if(response.data.success) {
       
    }
};
