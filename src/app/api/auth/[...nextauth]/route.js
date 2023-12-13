import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      // Add logic here to look up the user from the credentials supplied

      async authorize(credentials) {
        // Add your logic here to verify the credentials and get the user data
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
