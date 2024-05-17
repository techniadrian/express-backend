import User from "../../models/User/index.js";

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isTrusted = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const login = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!email) throw new AppError("The 'email' field is required", 422);
  if (!password) throw new AppError("The 'password' field is required", 422);

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("Invalid credentials", 401);

  const isCorrectPassword = await user.comparePasswords(password);
  if (!isCorrectPassword) throw new AppError("Invalid credentials", 401);

  const token = "abc"; // tu powinnismy wygenerowac

  res.status(200).json({ data: [] });
};
