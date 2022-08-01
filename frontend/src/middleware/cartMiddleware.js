import axios from "axios";
// export const cartMiddleware = async (data) => {
//   const response = await axios.get("http://localhost:3332/api/v1/cart/get", {
//     headers: {
//       'Authorization': `Bearer ${data.data}` 
//     }
//   });
//   return response;
// };

export const cartMiddleware = async (data) => {
  console.log("hi"+data.data);
  const response = await axios.get("http://localhost:3332/api/v1/cart/get", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${data.data}` 
    }
  });
  console.log(response.data);
  return response;
};
export const orderMiddleware = async (data) => {
  const response = await axios.post("http://localhost:3332/api/v1/order/createOrder", {data} , {
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${data.data}` 
  }
});
return response;
};


// export const getcart = async (localToken) => {
//   const response = await axios.get("http://localhost:3332/api/v1/cart/get", {
//     headers: {
//       'Authorization': `Bearer ${localToken}` 
//     }
//   });
//   return response;
// };

export const addcart = async (item,localToken) => {
  const response = await axios.post("http://localhost:3332/api/v1/cart/createCart",{item,localToken}, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localToken}` 
    },
  });

  return response;
};
export const updateCartQTY = async (item,qty,localToken) => {
  const response = await axios.put("http://localhost:3332/api/v1/cart/updateCartQTY",{item,qty,localToken}, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localToken}` 
    },
  });

  return response;
};
export const removeCartId = async (item,localToken) => {
  const response = await axios.put("http://localhost:3332/api/v1/cart/RemoveArrayCart",{item,localToken}, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localToken}` 
    },
  });

  return response;
};
export const deleteAllCart = async (payload) => {
  const response = await axios.delete("http://localhost:3332/api/v1/cart/deleteCart", {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${payload.localToken}` 
    }
  });
  return response;
};
//export default cartMiddleware;
