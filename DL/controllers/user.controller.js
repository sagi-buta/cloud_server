const usersModel = require('../models/users.model');


const read = async (filterBy) => {
    let data = await usersModel.find(filterBy)
    return data
}
const readOne = async (filterBy) => {
    let data = await usersModel.findOne(filterBy)
    return data
}
const create = async (newData) => {
    let data = await usersModel.create(newData)
    return data
}
const deleteOne = async (id) => {
    let data = await usersModel.findByIdAndRemove(id)
    return data
}
const update = async (id, newData) => {
    let data = await usersModel.findByIdAndUpdate(id, newData, { new: true })
    return data
}


module.exports = { read, readOne, create, deleteOne, update }
