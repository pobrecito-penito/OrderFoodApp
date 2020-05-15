import axios from 'axios';

const baseUrl = 'http://itbootcamp.westeurope.cloudapp.azure.com';

export const findData = async(entity,condition) => {
    return await axios.get(`${baseUrl}/${entity}${condition}`);
}

export const getData = async(entity,id) => {
    return await axios.get(`${baseUrl}/${entity}/${id}`);
}

export const createData = async(entity,data) => {
    return await axios.post(`${baseUrl}/${entity}`,data);
}

export const updateData = async(entity,id,data) => {
    return await axios.put(`${baseUrl}/${entity}/${id}`,data);
}

export const deleteData = async(entity,id) => {
    return await axios.delete(`${baseUrl}/${entity}/${id}`);
}