import * as jwt from "jsonwebtoken";

export interface IContext {
  models: any;
  request: any;
  secret: any;
}
// To be used for authorization
export const getUserId = (ctx: IContext) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string };
    return userId;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
