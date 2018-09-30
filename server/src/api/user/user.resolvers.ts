import { UserInputError } from "apollo-server";
import * as jwt from "jsonwebtoken";

import { IContext } from "../../utils/utils";

export const createToken = async (user, secret, expiresIn) =>
  jwt.sign(user, secret, {
    expiresIn,
  });

export const createUser = async (
  userModel: any,
  userInput: any,
  secret: any,
): Promise<any> => {
  try {
    const user = await userModel.create(userInput);
    return {
      token: createToken({ userId: user.id }, secret, "90m"),
      user: user.get(),
    };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new UserInputError(error.errors[0].message);
    }
  }
};

export const findUser = async (userModel: any, input: any, secret: any) => {
  try {
    const user = await userModel.findOne({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error(`No such user found for email: ${input.email}`);
    }

    const isValid = await user.validatePassword(input.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    return {
      token: createToken({ userId: user.id }, secret, "90m"),
      user,
    };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const signup = async (parent, args, ctx: IContext, info) =>
  createUser(ctx.models.User, args.input, ctx.secret);

export const login = async (parent, args, ctx: IContext, info) =>
  findUser(ctx.models.User, args.input, ctx.secret);

export default {
  Mutation: {
    signup,
    login,
  },
};
