import { userRepository } from "../repositories/userRepository.js";
import { RequestError } from "../helpers/RequestError.js";

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      throw RequestError(404, "Users not found");
    }
    return users;
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw RequestError(404, "User not found");
    }
    return user;
  }

  addUser(data) {
    const users = this.getAll();
    const duplicates = users.some(
      ({ email, phoneNumber }) =>
        email.toLowerCase() === data.email.toLowerCase() ||
        phoneNumber === data.phoneNumber
    );

    if (duplicates) {
      throw RequestError(
        400,
        "A user with such email or phone already exists."
      );
    }

    const newUser = userRepository.create(data);
    if (!newUser) {
      throw RequestError(
        500,
        "An error occurred while adding the data into the database."
      );
    }
    return newUser;
  }

  updateUserById(id, data) {
    this.getUserById(id);
    // Checks if user with current id exists, if not, getUserById
    // throws an error and the method breaks.
    const updatedUser = userRepository.update(id, data);
    if (!updatedUser) {
      throw RequestError(
        500,
        "An error occurred while updating user in database."
      );
    }
    return updatedUser;
  }

  deleteUserById(id) {
    this.getUserById(id);
    // Checks if user with current id exists, if not, getUserById
    // throws an error and the method breaks.
    const deletedUser = userRepository.delete(id);
    if (!deletedUser) {
      throw RequestError(
        500,
        "An error occurred while deleting user in database."
      );
    }
    return deletedUser;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
