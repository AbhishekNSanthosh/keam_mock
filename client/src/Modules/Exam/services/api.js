import { toast } from 'react-toastify'
import { privateGateway } from '../../../services/apiGateways'
import { routes } from '../../../common/constants'

export const getRandomQuestions = async (
    setQues,
    setIsLoading
) => {
    setIsLoading(true)
    try {
        const response = await privateGateway.get(routes?.getQuestions);
        console.log(response)
        setQues(response?.data?.data);
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        toast.error(error?.response?.data?.message)
    }
}

export const submitAnswersApi = async (
    selectedOptions,
    navigate
) => {
    try {
        const response = await privateGateway.post(routes?.submitAnswers, {
            answers: selectedOptions
        });
        localStorage.setItem('status', 'completed')
        navigate('/dashboard/home');
        toast.success(response?.data?.message)
        console.log(response)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}