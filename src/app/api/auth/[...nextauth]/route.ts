import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import Docter from "../../../../models/doctor"
import connect from "../../../../lib/md"
import mongoose from "mongoose"


export const authOptions: AuthOptions = {

  pages: {
    signIn: "/auth/signin",
  },


  providers: [

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your Email",
        },
        role: {
          label :"Role",
          type : "text",
          placeholder: "Your Role"
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        connect();

        let user;

        if (credentials?.role == "Doctor"){
          user = await Docter.findOne({email: credentials?.email});
        }else{
          user = await Docter.findOne({email: credentials?.email});
        }

        if (!user) throw new Error("User name or password is not correct");
        
        if (!credentials?.password) throw new Error("Please Provide Your Password");
        const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPassowrdCorrect) throw new Error("User name or password is not correct");

        if (!user.isVerified) throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user ;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
