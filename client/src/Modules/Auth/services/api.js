import { toast } from "react-toastify"
import { routes } from "../../../common/constants"
import { publicGateway } from "../../../services/apiGateways"

export const login = async (
    email,
    dob,
    navigate,
    setIsLoading,
    setEmail,
    setDob
) => {
    setIsLoading(true)
    try {
        const response = await publicGateway.post(routes?.loginRoute, {
            email, dob
        })
        console.log(response?.data?.accessToken)
        toast.success("Login successful", {
            theme: "colored",
            position: "bottom-center"
        })
        localStorage.setItem('accessToken', response?.data?.accessToken);
        setIsLoading(false);
        setTimeout(() => {
            navigate('/')
        }, 500);
    } catch (error) {
        setIsLoading(false)
        toast.error(error?.response?.data?.message, {
            theme: "colored",
            position: "bottom-center"
        })
        setEmail('');
        setDob('')
    }
}