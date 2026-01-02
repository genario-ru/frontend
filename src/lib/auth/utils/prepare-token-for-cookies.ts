import { jwtDecode, type JwtPayload } from "jwt-decode";

type PrepareTokenForCookiesParams = {
  name: string;
  value: string;
};

type SetCookieParams = [
  key: string,
  value: string,
  cookie?: {
    secure: boolean;
    httpOnly: boolean;
    expires: Date | undefined;
  },
];

type PrepareTokenForCookiesReturn = SetCookieParams | null;

export const prepareTokenForCookies = (
  params: PrepareTokenForCookiesParams,
): PrepareTokenForCookiesReturn => {
  const { name, value } = params;

  try {
    const decodedToken = jwtDecode<JwtPayload>(value);
    const currentDate = new Date();

    if (decodedToken.exp && decodedToken.exp * 1000 > currentDate.getTime()) {
      return [
        name,
        value,
        {
          expires: new Date(decodedToken.exp * 1000),
          secure: process.env._ENV !== "development",
          httpOnly: false,
        },
      ];
    } else {
      console.error(`Error: ${name} has invalid expiration date`);
    }
  } catch (error) {
    console.error(`Error: ${value} is not a valid JWT token (${error})`);
  }

  return null;
};
