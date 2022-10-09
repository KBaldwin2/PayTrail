import { ApisauceInstance, create } from "apisauce";
import authStorage from "../utility/storage";
import settings from "../config/settings";

const apiClient: ApisauceInstance = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  }
  request.headers["Authorization"] = `Bearer ${authToken}`;
});

export default apiClient;
