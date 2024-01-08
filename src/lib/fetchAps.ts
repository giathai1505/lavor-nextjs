import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import { getServerSession } from "next-auth";

async function refreshToken(refreshToken: string) {
  const res = await fetch(CLIENT_API_ENPOINT + "auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  const data = await res.json();
  console.log({ data });

  return data.accessToken;
}

export async function AuthGetApi(url: string) {
  const session = await getServerSession();
  console.log("before: ", session?.user.accessToken);

  let res = await fetch(CLIENT_API_ENPOINT + url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.user.accessToken}`,
    },
  });

  if (res.status == 401) {
    if (session)
      session.user.accessToken = await refreshToken(
        session?.user.refreshToken ?? ""
      );
    console.log("after: ", session?.user.accessToken);

    res = await fetch(CLIENT_API_ENPOINT + url, {
      method: "GET",
      headers: {
        Authorization: `bearer ${session?.user.accessToken}`,
      },
    });
    return await res.json();
  }

  return await res.json();
}
