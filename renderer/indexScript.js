// Renderer

import { Confirm,Warn } from "./confirm.mjs";

let getClient = document.getElementById("createClient");
let createSession = document.getElementsByClassName("newClientSession");
let deleteClient = document.getElementById("deleteClient");
let menubutton = document.getElementById('menuButton');
let refresh = document.getElementById('refresh');
let edit = document.getElementById('edit');
let gName = '';
if(menubutton != null){
    menubutton.addEventListener("click",() => {
        let pop = document.getElementById('popUp');
        let popBack = document.getElementById('popBack');
        if(pop.classList.contains("popHide")){
            pop.classList.remove("popHide")
            pop.classList.add("popShow");
            popBack.classList.add("popBack");
            popBack.addEventListener("click",() =>{
                pop.classList.remove("popShow");
                pop.classList.add("popHide");
                popBack.classList.remove("popBack");
            })
        }
        else{
            pop.classList.remove("popShow");
            pop.classList.add("popHide");
            popBack.classList.remove("popBack");
        }
        
    })
}

if(getClient != null){
    getClient.addEventListener("click", function(){
        createClient.addNewClient();
        let pop = document.getElementById('popUp');
        pop.style.visibility = 'hidden';
    })
}

if(createSession != null){
    [...createSession].forEach(el => {
        el.addEventListener("click", function(){
        newSession.addClientSession(gName);
        let pop = document.getElementById('popUp');
        pop.style.visibility = 'hidden';
        })
    })
}

let listViews = document.getElementById('clientView');
let listClientView = document.getElementById('listClientView');
let sessionView = document.getElementById('sessionClientView');
let sessionPage = document.getElementById('sessionPage');
let clientName = document.getElementById('clientName');
let placeH = document.getElementById('placeH');
async function loadClientView(){
    let data = await listClient.clientView();
    for(let i = 0; i < data.length; i++){
        let name = {name:data[i].name, surname:data[i].surname}
        let clientList = document.createElement('li')
        let clientButton = document.createElement('button')
        clientButton.classList.add('clientBtn')
        clientButton.innerHTML = name.name + ' ' + name.surname;

        clientButton.addEventListener("click", function(){
            if(document.querySelector('.btnFocus')){
                document.querySelector('.btnFocus').classList.remove('btnFocus')
            }
            clientButton.classList.add("btnFocus")

            clientName.textContent = name.name + " " + name.surname
            gName = name;
            document.getElementById('addSesh2').style.visibility = 'visible';
            edit.style.visibility = 'hidden';
            getSessions(name)
        });
        clientList.appendChild(clientButton)
        
        listClientView.appendChild(clientList)
    }
}

async function getSessions(name){
    sessionView.innerHTML = '';
    let res = await getClientSessions.data(name);
    res.sort(function(a, b){return a.session - b.session});
    res.forEach(sesh => {
        console.log(sesh)
       let list = document.createElement('li');
       let button = document.createElement('button');
       button.classList.add('seshButton');
       button.innerHTML = 'Session ' + sesh.session
       list.appendChild(button);

       button.addEventListener('click', function (){
        document.getElementById('edit').style.visibility = 'visible';
        if(document.querySelector('.seshButton.btnFocus')){
            document.querySelector('.seshButton.btnFocus').classList.remove('btnFocus')
        }
        button.classList.add("btnFocus")
        let note = '';
        let s = ''
        note += "<p id='id' hidden>" + sesh._id + "</p><p id='rev' hidden>"+ sesh._rev + "</p>"
        console.log(sesh)
        console.log(sesh.clientNotes)
        sesh.clientNotes.forEach(not => {
            not = not.replace(/[\r\n]+/gm, "\n\n")
            
            note += "<p id='seshData' class='seshData' focus>" + not + "</p>";
        })
        console.log(s)
        sessionPage.innerHTML = note
       })
       sessionView.append(list);
    });

    if(sessionView.hasChildNodes()){
        sessionPage.innerHTML = '<p style="text-align:center;">Pick the session you would like to view</p>'
    }
    else{
        sessionPage.innerHTML = '<p style="text-align:center;">You have not had a session with this client before.\nCreate 1 now</p>'
    } 
    // console.log(res);
}

deleteClient.addEventListener('click',() => {
    Warn.open({
        title: 'err',
        message: '',
        okText: '',
        cancelText: '',
        onok: function () {}
})})


//we are currently trying to edit and update session data!
let beforeSave = '';
edit.addEventListener("click", function(){
    if(!sessionPage.isContentEditable){
        beforeSave = sessionPage.innerHTML;
        sessionPage.contentEditable = true;
        edit.textContent = 'Save'
        sessionPage.focus();
    }
    else{
        sessionPage.contentEditable = false;
        edit.textContent = 'Edit'
        Confirm.open({
            title: 'err',
            message: 'Do you wish to save these changes',
            okText: 'Save',
            cancelText: 'Cancel',
            onok: async function () {
                let notes = [];
                let seshData = document.getElementsByClassName('seshData');
                [...seshData].forEach(note => {
                    notes.push(note.textContent)
                });
                let data = {
                    _id: document.getElementById('id').textContent,
                    _rev: document.getElementById('rev').textContent,
                    clientNotes: notes
                }
                let res = await updateClient.update(data);
                
                // if (res.success == true) {
                //     window.close();
                // }
                // else if(res.success == false){
                //     alert('Something went wrong');
                // }
                return
            },
            oncancel: function () {
                sessionPage.innerHTML = beforeSave
                beforeSave = ''
            }
        })
    }
    
});

loadClientView();
refresh.addEventListener('click',()=>{
    location.reload();
})

//Database things
// db.info().then((i) => {console.log(i)}).catch();
// dbI.createIndex({
//     index: {fields: ['name']}
// });

// let clients = await dbF.find({
//     selector: {
//       client: 0
//     }

// }).then((info)=> {console.log(info)}).catch();

// console.log(clients);




