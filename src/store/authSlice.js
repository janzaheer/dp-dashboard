// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL, LOGIN_ENDPOINT,SIGNUP_ENDPOINT,API_VERSION } from "../utlis/apiUrls";
// import axios from "axios";

// const initialState = {
//     user: '',
//     token: '',
//     loading: false,
//     message: '',
//     error: false,
//     isAuthenticated: false,
// }

// export const signUpUser = createAsyncThunk('signupuser', async (body) => {
//     let SignUpUrl = BASE_URL + API_VERSION() +SIGNUP_ENDPOINT()
//     const res = await fetch(SignUpUrl, {
//         method: "post",
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(body)
//     })
//     return await res.json();
// })

// export const signInUser = createAsyncThunk('signinuser', async ({ username, password },thunkAPI) => {
//     let LoginURL = BASE_URL + API_VERSION() + LOGIN_ENDPOINT()
//     const res = await fetch(LoginURL, {
//         method: "post",
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify({
//             username,
//             password,
//         }),
//     })
//     const data = await res.json()
//     // console.log('user',data)
//     return data

// })
// export const SocialsignInUser = createAsyncThunk('SocialsignInUser', async (payload ,thunkAPI) => {
//     let SocialLoginURL = BASE_URL +  `api/social-login/`
//     const res = await axios.post(SocialLoginURL,payload)
//     return res.data
// })

// const authSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         logout: (state, action) => {
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;
//             // localStorage.clear()
//         },
//     },
//     extraReducers: (builder) => {
//         /* signin  */
//         builder
//         .addCase(signInUser.pending, (state, action) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(signInUser.fulfilled, (state, { payload: { message, token, user } }) => {
//             state.loading = false;

//             if (user) {
//                 state.isAuthenticated = true;
//                 state.message = message;
//                 state.token = token;
//                 state.user = user;
//             }
//         })
//         .addCase(signInUser.rejected, (state, action) => {
//             state.loading = true;
//             state.error = true;
//             state.message = action.payload;
//             state.user = null;
//         });
//          /* Socialsignin  */
//         builder
//         .addCase(SocialsignInUser.pending, (state, action) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(SocialsignInUser.fulfilled, (state, { payload: { message, token, user } }) => {
//             state.loading = false;
//             if (user) {
//                 state.isAuthenticated = true;
//                 state.message = message;
//                 state.token = token;
//                 state.user = user;
//             }
//         })
//         .addCase(SocialsignInUser.rejected, (state, action) => {
//             state.loading = true;
//             state.error = true;
//             state.message = action.payload;
//             state.user = null;
//         });

//         builder
//         .addCase(signUpUser.pending, (state, action) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(signUpUser.fulfilled, (state, { payload: { message, token, user } }) => {
//             state.loading = false;

//             if (user) {
//                 state.isAuthenticated = true;
//                 state.message = message;
//                 state.token = token;
//                 state.user = user;
//             }
//         })
//         .addCase(signUpUser.rejected, (state, action) => {
//             state.loading = true;
//             state.error = true;
//             state.message = action.payload;
//             state.user = null;
//         });
//         /* signup  */
//         // [signUpUser.pending]: (state, action) => {
//         //     state.loading = true;
//         // }, [signUpUser.fulfilled]: (state, { payload: { message, token, user } }) => {
//         //     state.loading = false;
//         //     if (user) {
//         //         state.isAuthenticated = true;
//         //         state.message = message;
//         //         state.token = token;
//         //         state.user = user;
//         //     }
//         // }, [signUpUser.rejected]: (state, action) => {
//         //     state.loading = true;
//         //     state.error = true
//         //     state.message = action.payload
//         //     state.user = null;
//         // },
//     }
// })

// export const { addToken, addUser, logout } = authSlice.actions;
// export const selectUser = (state) => state.user.isAuthenticated;
// export default authSlice.reducer



// export const getToken = () => {
//     return localStorage.getItem('token') || '';
// }

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_ENDPOINT,SIGNUP_ENDPOINT,API_VERSION } from "../utlis/apiUrls";

import axios from "axios"

let BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = {
    user: null,
    token: '',
    loading: false,
    message: '',
    error: false,
    isAuthenticated: false,
};

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    const SignUpUrl = BASE_URL + API_VERSION() + SIGNUP_ENDPOINT();
    const res = await fetch(SignUpUrl, {
        method: "post",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    });
    return await res.json();
});

export const signInUser = createAsyncThunk('signinuser', async ({ username, password }) => {
    const LoginURL = BASE_URL + API_VERSION() + LOGIN_ENDPOINT();
    const res = await fetch(LoginURL, {
        method: "post",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    return await res.json();
});

export const SocialsignInUser = createAsyncThunk('SocialsignInUser', async (payload) => {
    const SocialLoginURL = BASE_URL + `api/social-login/`;
    const res = await axios.post(SocialLoginURL, payload);
    return res.data;
});

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, { payload: { message, token, user } }) => {
                state.loading = false;
                if (user) {
                    state.isAuthenticated = true;
                    state.message = message;
                    state.token = token;
                    state.user = user;
                }
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = true;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(SocialsignInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SocialsignInUser.fulfilled, (state, { payload: { message, token, user } }) => {
                state.loading = false;
                if (user) {
                    state.isAuthenticated = true;
                    state.message = message;
                    state.token = token;
                    state.user = user;
                }
            })
            .addCase(SocialsignInUser.rejected, (state, action) => {
                state.loading = true;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, { payload: { message, token, user } }) => {
                state.loading = false;
                if (user) {
                    // state.isAuthenticated = true;
                    state.message = message;
                    state.token = token;
                    state.user = user;
                }
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = true;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});

export const { logout } = authSlice.actions;
export const selectUser = (state) => state.user.isAuthenticated;
export default authSlice.reducer;
