import { useSelector } from "react-redux";

const useHeaders = () => {
    const userToken = useSelector(state => state.user.token);
    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }
    return headers;
};
export default useHeaders;