import { useSelector } from "react-redux";

// const useHeaders = () => {
//     const userToken = useSelector(state => state.user.token);
//     let headers = {}
//     if (userToken) {
//         headers = {
//             'Content-Type': "application/json",
//             Authorization: `Token ${userToken}`
//         }
//     }
//     return;
// };
// export default useHeaders;

export async function useHeaders() {
    const userToken = useSelector(state => state.user.token);
    let headers = {};
    if (userToken) {
      headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${userToken}`
      };
    }
    console.log('Headers:', headers); // Log headers for debugging
    return headers;
  }