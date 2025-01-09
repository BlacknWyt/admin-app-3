import { Confirm, Warn } from "./confirm.mjs";
//New Session

let addPage = document.getElementById("addPage");
let addNote = document.getElementById("clientNotes");

addPage.addEventListener("click", () => {
    let newPage = document.createElement("li");
    let textA = document.createElement("textarea");
    let removeNote = document.createElement("button");

    removeNote.innerHTML = "Remove note";
    textA.id = "extraNote";
    newPage.appendChild(textA);
    newPage.appendChild(removeNote)

    removeNote.addEventListener("click", () => {
        newPage.remove()
    })
    
    addNote.appendChild(newPage);
    // console.log("page added")
});

//Submit
let addNewSession = document.getElementById("addNewSession");
let clientName = document.getElementById("clientName");
let clientSurname = document.getElementById("clientSurname");
let clientSession = document.getElementById("sessionNum");
let clientNote = document.getElementById("note");

// console.log("hello");
addNewSession.addEventListener("click", async() => {
    let clientExtraNotes = document.querySelectorAll("#extraNote");
    let cNotes = [];
    cNotes.push(clientNote.value);
    let client = {name: clientName.value, surname: clientSurname.value}

    clientExtraNotes.forEach(note => {
        if(note.value != ''){
            console.log(note.value)
            cNotes.push(note.value)
        }
    })
    console.log(cNotes[0])
    let data = {
        client: 0,
        name: clientName.value,
        surname: clientSurname.value,
        session: clientSession.value,
        clientNotes: cNotes
    }
    
    if(clientName.value == ''|| clientSurname.value == ''|| clientSession.value == ''|| clientNotes.value == ''){
        Confirm.open({
            title: 'err',
            message: 'You have left some boxes blank. Do you still wish to continue anyway?',
            okText: 'Proceed',
            cancelText: 'Cancel',
            onok: function () {checkExistClient(client,data)},
            oncancel: function () {return}
        })
    }
    else{
        checkExistClient(client,data)
    }
})

async function checkExistClient(client,data){
    let res = await clientCheck.exist(client);
    console.log(res.docs)
    if(res.docs.length == 0){
            Confirm.open({
            title: 'err',
            message: 'You dont seem to have a client by that name in the database. Do you still wish to continue?',
            okText: 'Proceed',
            cancelText: 'Cancel',
            onok: async function () {
                let res = await dbSession.create(data);
                console.log(res)
                if (res.success == true) {
                    window.close();
                }
                else if(res.success == false){
                    alert('Something went wrong');
                }
            },
            oncancel: function () {return}
        })
    }
    else{
        console.log('else work')
        let res = await dbSession.create(data);
        console.log(res)
        if (res.success == true) {
            window.close();
        }
        else if(res.success == false){
            alert('Something went wrong');
        }
    }
}

electron.getInput('getName', (e, data) => {
    console.log(data)
    if (data){
        clientName.disabled = true;
        clientSurname.disabled = true;
        clientName.value = data.name
        clientSurname.value = data.surname
    }
});


    

