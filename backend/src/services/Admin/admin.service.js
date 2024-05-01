import HttpStatusCodes from "../../utils/httpStatusCodes.utils.js";
import { ApiError } from "../../utils/ApiError.utils.js";
import AuthService from "../../middlewares/AuthService.middleware.js";
class AdminService {
  constructor(AdminRepository) {
    this.AdminRepository = AdminRepository;
  }

  async loginAdmin(email, password) {
    console.log("email: ", email, " Password: ", password);
    const user = await this.AdminRepository.checkAdminExists(email);
    console.log("Inside user service login user", user);
    console.log(user.password);
    if (!user || user.length === 0) {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, "User not found");
    }
    return user;
  }

  async getAllUsersByAdmin() {
    return await this.AdminRepository.getAllUsersByAdmin();
  }

  async getUserByAdmin(id) {
    return await this.AdminRepository.getUserByAdmin(id);
  }

  async updateUserByAdmin(params, id) {
    return await this.AdminRepository.updateUserByAdmin(params, id);
  }

  async deleteUserByAdmin(id) {
    return await this.AdminRepository.deleteUserByAdmin(id);
  }
}

export { AdminService };
