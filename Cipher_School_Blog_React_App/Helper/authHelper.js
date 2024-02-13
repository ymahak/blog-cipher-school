import bcrypt from "bcrypt";

export const hashedPassword = async (password)=>{
    try {
        const saltRounds=10;
    const hashPassword = await bcrypt.hash(password, saltRounds );
    return hashPassword;
    } catch (error) {
        console.log("Error in password hashing",error);
    }
}

export const comparePassword = async (Password, hashedPassword) => {
    return bcrypt.compare(Password, hashedPassword);
  };
  
