import axios from 'axios';

export const getGoals = () => axios.get('http://198.211.105.95:8080/goals');

export const createGoal = (data: any) => axios.post('http://198.211.105.95:8080/goals', data);

export const updateGoal = (id: number, data: any) =>
    axios.patch(`http://198.211.105.95:8080/goals/${id}`, data);