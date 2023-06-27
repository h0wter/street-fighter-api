import { userService } from "./userService.js";
import { RequestError } from "../helpers/RequestError.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw RequestError(404, "User not found");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
