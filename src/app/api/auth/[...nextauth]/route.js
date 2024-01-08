import NextAuth from "next-auth";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
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
          const response = await fetch(SERVER_API_ENPOINT + "auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const user = await response.json();
            return user;
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

  callbacks: {
    async jwt({ token, user, account }) {
      console.log({ account });
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
