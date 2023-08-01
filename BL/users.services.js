const { read, readOne, create, update, deleteOne } = require('../DL/controllers/user.controller')


const readFun = async (filterBy) => {//get all users --OR-- one by id
    let action = await filterBy ? readOne({ _id: filterBy }) : read({})
    if (!action) throw "no found"
    return action
}
const updateFun = async (id, data) => {//uodate user --or-- cancel activity
    let action = await update(id, data)
    if (!action) throw "no data "
    return action
}
const createFun = async (data) => {
    let action = await create(data)
    if (!data) throw "no data "
    return action
}
const deleteFun = async (id) => {//delete user from data
    let action = await deleteOne(id)
    if (!action) throw "no data "
    return action
}

module.exports = { createFun, readFun, deleteFun, updateFun }

