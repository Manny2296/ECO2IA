import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';
const strapiUrl = process.env.STRAPI_URL;


const options = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "test@test.com" },
          password: {  label: "Password", type: "password" }
        },
      async authorize(credentials) {
          try {
            const { data } = await axios.post(`${strapiUrl}/api/auth/local`, {
              identifier: credentials.email,
              password: credentials.password
            });
            if (data) {
                console.log(data);
                const token = { id:  data.user.id,  name: data.user.username, email: data.user.email , jwt: data.jwt };
                
              return {...data, ...token};
            }
            else {
              return null;
            }
          } catch (e) {
            // console.log('caught error');
            // const errorMessage = e.response.data.message
            // Redirecting to the login page with error message          in the URL
            console.log(e);
             throw new Error("Invalid credentials " + e)
            //return null;
          }
        }
      })
    ],
  
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  
    callbacks: {
        session: async ({ session, token }) => {
            
            session.id = token.id;
            session.jwt = token.jwt;
            //console.log("Estoy aqui" + JSON.stringify(session));
            return Promise.resolve(session);
          },  
          jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
              token.id = user.id;
              token.jwt = user.jwt;
            }
            return Promise.resolve(token);
          },
   
    },
    
  }
  
  export default (req, res) => NextAuth(req, res, options)