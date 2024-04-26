import axios from "axios"
import { toast } from "react-toastify"
import { backend, routes } from "../../../common/constants/constants"

export const winners = async (
    setWinner
) => {
    try {
        const response = await axios.get(backend + routes?.getWinners);
        console.log(response)
        setWinner(response?.data?.winners)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}