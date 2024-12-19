import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import CredentialProvider from "next-auth/providers/credentials";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    CredentialProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        await connectToDatabase();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect credentials.");
            }
          } else {
            throw new Error("user not found");
          }
        } catch (error) {
          return NextResponse(error);
        }
      },
    }),
  ],
});

export { handler as POST, handler as GET };
