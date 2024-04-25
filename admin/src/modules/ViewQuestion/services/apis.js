import axios from "axios"
import { backend, routes } from "../../../common/constants/constants"

export const getQuestion = async (
    setQuestions
)=>{
    try {
        const response = await axios.get(backend+routes?.getAllQuestion);
        console.log(response)
        setQuestions(response?.data?.data)
    } catch (error) {
        console.log(error)
    }

}