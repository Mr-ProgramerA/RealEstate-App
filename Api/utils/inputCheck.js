import { errorHandler } from "./error.js";
export const inputCheck = (req,res,next) => {
    if (
        req.body === null || // Check if req.body is null
        typeof req.body !== "object" || // Check if req.body is an object
        Object.keys(req.body).length === 0 || // Check if req.body is an empty object // Check if any of the required fields are missing or empty
        req.body.username === null ||
        req.body.username === undefined ||
        req.body.username.trim() === "" ||
        req.body.email === null ||
        req.body.email === undefined ||
        req.body.email.trim() === "" 
        // ||
        // req.body.password === null ||
        // req.body.password === undefined ||
        // req.body.password.trim() === ""
      ) {
        return next(
          errorHandler(400, "Please fill in all required fields correctly.")
        );
      }
    
      if (
        /^\d+$/.test(req.body.username.trim()) || // Check if username is all numbers
        /^\d/.test(req.body.username.trim()) // Check if username starts with a number
      ) {
        return next(errorHandler(400, "Incorrect Username!"));
      }
      next()
}