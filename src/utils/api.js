// API Configuration
export const apiBaseURL = 'http://10.122.73.131:8700/wh-stockout';

export const checkUserIDAPI = `${apiBaseURL}/api/registration/checkNpk`;
export const registerAccountAPI = `${apiBaseURL}/api/registration/registerNew`;
export const stockoutWithoutInstructionApi = `${apiBaseURL}/api/warehouse/stockOutWithoutInstruction`;
export const getDetailShoppingListApi = `${apiBaseURL}/api/warehouse/getDetailShoppingList`;
export const loginApi = `${apiBaseURL}/api/loginApps/Stockout/confirmLogin`;
export const getCategoryShopping = `${apiBaseURL}/api/warehouse/getCategoryPart`;
export const whStockoutApi = `${apiBaseURL}/api/warehouse/stockoutAndroid`;

// For demo purposes, we'll use mock API responses
export const mockApiCall = (endpoint, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint.includes('login')) {
        resolve({
          data: {
            data: {
              USERNAME: data.USERNAME,
              USERID: data.USERNAME,
              ID: '12345',
              ROLE: 'USER'
            }
          }
        });
      } else if (endpoint.includes('stockout')) {
        resolve({
          data: {
            success: true,
            message: 'Stock out berhasil'
          }
        });
      } else {
        resolve({
          data: {
            success: true,
            data: []
          }
        });
      }
    }, 1000);
  });
};

