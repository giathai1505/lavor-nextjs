import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const response = await fetch(CLIENT_API_ENPOINT + "auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const user = await response.json();

            return {
              name: user.access_token,
            };
          } else {
            throw new Error("Error logging in");
          }
        } catch (error) {
          console.error(error);
          throw new Error("Error logging in");
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
