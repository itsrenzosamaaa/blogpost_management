import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { username, password } = credentials;
                    return { username:  username, password: password };
                } catch (error) {
                    console.error("Error authorizing user:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/", // Custom sign-in page
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };