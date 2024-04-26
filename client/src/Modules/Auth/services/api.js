import { toast } from "react-toastify"
import { routes } from "../../../common/constants"
import { publicGateway } from "../../../services/apiGateways"

export const login = async (
    email,
    dob,
    navigate
) => {
    try {
        const response = publicGateway.post(routes?.loginRoute, {
            email, dob
        })
        console.log(response)
        localStorage.setItem(response?.data?.accessToken);
        toast.success("Login successful")
    } catch (error) {

    }
}