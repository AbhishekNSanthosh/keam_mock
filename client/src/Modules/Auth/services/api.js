import { toast } from "react-toastify"
import { routes } from "../../../common/constants"
import { privateGateway, publicGateway } from "../../../services/apiGateways"

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
        toast.success("Login successful", {
            theme: "colored",
            position: "bottom-center"
        })
        localStorage.setItem('accessToken', response?.data?.accessToken);
        const user = await privateGateway.get(routes?.userDetailRoute);
        localStorage.setItem('user', JSON.stringify(user?.data?.data))
        setIsLoading(false);
        setTimeout(() => {
            navigate('/home')
        }, 800);
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