import { CometChat } from "@cometchat-pro/chat";
const authKey = "c06c5b53163288fc24b1ad1effad558b9ad7f221"

const registration = async (name, uid, role) => {
    try {
      let userExists;
      try {
        userExists = await CometChat.getUser(uid);
      } catch (getUserError) {
        if (getUserError.code === "ERR_UID_NOT_FOUND") {
          // User does not exist, proceed with registration
          let user = new CometChat.User(uid, role);
          user.setName(name);
          user.setRole(role);
          const createUser = await CometChat.createUser(user, authKey);
          console.log("User create success", { createUser });
        } else {
          // Other errors, rethrow
          throw getUserError;
        }
      }
  
      // Proceed with login
      const loggedInUser = await CometChat.login(uid,authKey);
      console.log(uid, "logged in successfully");
    } catch (error) {
      console.log("Error creating or logging in user", error);
      throw error;
    }
  };


const login = async (uid) => {
    try {
        const user = await CometChat.login(uid, authKey);
        console.log("User logged in successfully", { user });
        return user;  
    } catch (error) {
        console.log("Login failed", error);
        throw error; 
    }
} 

export { registration, login };