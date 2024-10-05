import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
    { id: 1, username: 'itsrenzosamaaa', password: '1234567890', firstName: 'Renzo Roberto', lastName: 'Flestado' }
];

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
                    const user = users.find((user) => user.username === username && user.password === password);
                    if(!user){
                        return null;
                    }
                    return { id: user.id, username:  user.username, firstName: user.firstName, lastName: user.lastName };
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
                session.username = token.username;
                session.firstName = token.firstName;
                session.lastName = token.lastName;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };