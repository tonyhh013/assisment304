// Side effects Services
export const getAuthToken = () => {
    return JSON.parse(localStorage.getItem("authorization"));
  };
  
  export const setAuthToken = async(token) => {
    localStorage.setItem("authorization", JSON.stringify(token));
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem("authorization");
  };
  //authToken