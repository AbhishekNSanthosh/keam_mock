import { toast } from 'react-toastify'
import { privateGateway } from '../../../services/apiGateways'
import { routes } from '../../../common/constants'

export const getRandomQuestions = async (
    setQues
) => {
    try {
        const response = await privateGateway.get(routes?.getQuestions);
        console.log(response)
        setQues(response?.data?.data)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}