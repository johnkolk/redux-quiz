import axios from 'axios'
export default axios.create({
    baseURL: 'https://react-quiz-15008.firebaseio.com/'
})