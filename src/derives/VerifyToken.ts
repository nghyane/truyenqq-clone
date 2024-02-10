import { decrypt } from "@/lib/crypto";
import { Context } from "elysia";

const EXPIRE_TIME = 600;

const getKey = () => {
  return ["lo" + "ca" + "ti" + "on", "ho" + "st" + "na" + "me"].join("");
};

const verifyToken = async ({ headers, set }: Context) => {
  const key = getKey();

  if (!headers.token) {
    set.status = 401;

    return {
      verify: null,
      error: "No token provided",
    };
  }

  const verify = (await decrypt(headers.token, key)) as VerifyToken;

  if (!verify || verify.time < Date.now() - EXPIRE_TIME * 1000) {
    set.status = 401;
    return {
      verify: null,
      error: "Invalid token",
    };
  }

  return {
    verify,
    error: null,
  };
};

export type VerifyContext = Context & {
  verify: VerifyToken;
};

export default verifyToken;
