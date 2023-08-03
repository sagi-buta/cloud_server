const fs = require('fs');
// const { arrayBuffer } = require('node:stream/consumers');
// const { run } = require('node:test');

let root = `./root/`
//let userNow

const setRoot = (id, dir) => {
    id == dir ? root = `./root/`: root = `./root/${id}/`
    //userNow = id
}

function readfile(paht) {
    paht = root + paht
    if (fs.existsSync(paht)) {
        // let file = fs.readFileSync(paht, { encoding: 'utf8' });
        let file = fs.readFileSync(paht);
        console.log(file);
        return file// returns the info inside of the file
    }
    else {
        console.log("file not exsist")
        throw "File not found"
    }
}
// readfile("a1.js")


function readfolderfils(folder) {
    const paht = root + folder
    if (fs.existsSync(paht) && fs.statSync(paht).isDirectory()) {
        let filesArr = fs.readdirSync(paht)
        console.log(filesArr);
        return filesArr
    } else {
        console.log('folder not exist');
        throw "folder not exist"
    }
}
//readfolderfils('/a2')

//<={creatfile or folder by location & name
function creatfile(filenNme, content, loc) {
    const paht = root + loc + "/" + filenNme;
    fs.writeFileSync(paht, content)//for now only text
}
function creatfolder(folderName, loc) {
    loc = loc ? loc : ""
    const paht = root + loc + "/" + folderName;
    if (fs.existsSync(root + loc)) {
        if (!fs.existsSync(paht)) {
            fs.mkdirSync(paht)
        }
        else {
            console.log("folder already exist")
            throw 'folder already exist'
        }
    }
    else {
        console.log('folder not exist');
        throw "folder not exist"
    }
}
//creatfolder("sagi", "a1")

function runInFoldersDelete(folder) {
    let arrInFolder = fs.readdirSync(folder)

    if (arrInFolder.length < 1) {//check if folder empty 
        return fs.rmdirSync(folder)// delete the folder & stop the fun:
    }
    else {
        arrInFolder.forEach(val => {
            if (!fs.statSync(`${folder}/${val}`).isDirectory()) {

                fs.unlinkSync(`${folder}/${val}`)//delete files
            }
            else { runInFoldersDelete(`${folder}/${val}`) } //call fun again to get in folder
        })
    }
    runInFoldersDelete(folder)//call fun again for deleted outside emptyed folders
}
//runInFoldersDelete(root + "oooo")

function deletes(paht) {
    paht = root + paht
    if (fs.existsSync(paht)) { //if file exists

        if (fs.statSync(paht).isDirectory()) {//if folder
            runInFoldersDelete(paht)// run the delete fun
            console.log("folder deleted");
        }
        else {
            fs.unlinkSync(paht)//delete files
            console.log("file deleted");

        }
    }
    else {
        console.log("not exsist")
        throw "file not exsist"
    }
}
//deletes("a1")

function rename(file, to) {//transfer file to new loc ||  file rename 
    file = root + file
    to = root + to
    let myFile = file.split("/")
    let myTo = to.split("/")
    myFile.pop()
    myTo.pop()
    myFile = myFile.join("")
    myTo = myTo.join("")

    if (myFile != myTo) {
        console.log("location not same");
        throw "location  is not same"
    }// until here chack if the  all route loc is the same
    else {
        if (fs.existsSync(file)) {// check if file exsist

            if (!fs.existsSync(to)) {//check if found file wite the same name in folder

                fs.renameSync(file, to)// fun do
            }
            else {
                console.log("the newname is exsisit, choise a difrent newname");
                throw "the newname is exsisit, choise a difrent newname"
            }
        }
        else {
            console.log("file not exsist");
            throw "file not exsist"
        }
    }
}
//rename('a1', '2')

function cut(file, loc) {
    loc = root + loc
    if (fs.existsSync(file)) {
        if (!fs.existsSync(loc)) {
            fs.renameSync(file, loc);
        }
        else {
            console.log("the newname is exsisit, choise a difrent newname")
            throw "the newname is exsisit, choise a difrent newname"
        }
    }
    else {
        console.log("file not exsist");
        throw "file not exsist"
    }
}
const downloadFile = (dir,fileName)=>{
    return `${dir}/${fileName}`
}
//cut('vv', 'a2/vv')


module.exports = { downloadFile,readfile, readfolderfils, creatfile, creatfolder, deletes, rename, cut, setRoot }