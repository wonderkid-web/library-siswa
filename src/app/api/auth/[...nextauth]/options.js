import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import CredentialsProvider from "next-auth/providers/credentials";

// async function refreshToken(token) {
//   // console.log("token di refresh");
//   const refreshLama = token.tokens.refresh.token;

//   // console.log("lama: ", token);

//   const raw = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth/token`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       refreshToken: refreshLama,
//     }),
//   });
//   const refresh = await raw.json();

//   if (!raw.ok) {
//     throw refresh;
//   }

//   // console.log("hasil refresh: ", refresh);

//   const refreshed = {
//     ...token,
//     tokens: {
//       access: {
//         token: refresh.access.token,
//         expires: refresh.access.expires,
//       },
//       refresh: {
//         token: refresh.refresh.token,
//         expires: refresh.refresh.expires,
//       },
//     },
//   };

//   // console.log('yang mau dikirim', refreshed);
//   // const refreshBaru = refresh.refresh.token;
//   // console.log("baru: ", refreshBaru);

//   return refreshed;
// }

const onLogin = async (payload) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    return data
  } catch (error) {
    console.error(error.message);


    return null;
  }
};

const pages = {
  signIn: "/signin",
}

export const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "test@test.com" };
        try {
          const user = {
            email: credentials.email,
            password: credentials.password,
          };

          const data = await onLogin(user);

          if (data) {
            // Any object returned will be saved in `user` property of the JWT
            return data;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          console.log(e.message);
        }
      },
    }),
  ],
  
  pages,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const now = new Date().getTime() / 1000;
      if (token)
        return {
          ...token,
          ...user,
        };

      // if (now < token?.expires_in - (180000 - 3600)) {
      //   console.log("token belum expired");

      //   return token;
      // }

      // console.log("token expired!!!");
      // revalidatePath("/");
      // return await refreshToken(token);

      // if (trigger == "update") {
      //   console.log("access: ", session.data.data.accessToken);
      //   console.log("refresh: ", session.data.data.refresh_token);
      //   return {
      //     ...token,
      //     ...user,
      //     refreshToken: session.data.data.refresh_token,
      //     accessToken: session.data.data.accessToken,
      //     // refreshToken: session
      //   };
      // }
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET
};
