import axios from "axios";

const baseUrl = 'http://localhost:3001/reviews';

const getAll=()=>{
    return axios.get(baseUrl)
        .then(response=>response.data);
}
const getByApartment=(apartmentId)=>{
    return axios.get(`${baseUrl}/apartment/${apartmentId}`).then(response =>
        response.data
    );
};

const create=(newObject)=>{
    return axios.post(baseUrl,newObject)
        .then(response=>response.data);

};

const update=(id,newObject)=>{
    return axios.put(`${baseUrl}/${id}`,newObject)
        .then(response=>response.data);
};

export default {getAll,getByApartment,create,update}
