import axios from "axios";
import bcrypt from "bcryptjs";
const api = "http://localhost:9999/users";

//login
export const login = async (user) => {
    try {
      console.log(user);
      const response = await axios.get(api);
      const users = response.data;
  
      // Find user by email
      const foundUser = users.find(u => u.email === user.email);
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }
  
      // Return user data if the password matches
      return foundUser;
    } catch (error) {
      throw error;
    }
  };

export const register = async (user) => {
    try {
      const response = await axios.get(api); // Check all users
      const users = response.data;
      
      // Check for email existence only
      const found = users.find((u) => u.email === user.email);
      if (found) {
        throw new Error("Email Already Exists");
      }
  
      // Assign a new ID and create the user
      user.id = (users.length + 2).toString();
      const res = await axios.post(api, {
        ...user,
        role: "guest"
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

//getUsers
export const getUsers = async () => {
    try{
        const response = await axios.get(api);
        return response.data;
    }catch(error){
        throw error;
    }
}

//deleteUser
export const deleteUser = async (id) => {
    try{
        const response = await axios.delete(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

//updateUser
export const updateUser = async (user) => {
    try{
        const response = await axios.put(`${api}/${user.id}`, user);
        return response.data;
    }catch(error){
        throw error;
    }
}

//getUser
export const getUser = async (id) => {
    try{
        const response = await axios.get(`${api}/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

//createUser
export const createUser = async (user) => {
    try{
        //random
        user.id = (Math.floor(Math.random() * 1000)).toString();
        const response = await axios.post(api, user);
        return response.data;
    }catch(error){
        throw error
    }
}