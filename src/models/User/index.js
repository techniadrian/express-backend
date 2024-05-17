import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      select: false,
      match: /\S+@\S+\.\S+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 30,
      select: false,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    methods: {
      comparePasswords: async function (candidatePassword) {
        const isCorrectPassword = await bcrypt.compare(
          candidatePassword,
          this.password
        );
        return isCorrectPassword;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model("User", UserSchema);

export default User;
