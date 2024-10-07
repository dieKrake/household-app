"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";
import { secret } from "@aws-amplify/backend";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    // userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    // userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    userPoolId: String(secret("NEXT_PUBLIC_USER_POOL_ID")),
    userPoolClientId: String(secret("NEXT_PUBLIC_USER_POOL_CLIENT_ID")),
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
