// Renderer

import { Confirm,Warn, Schedule} from "./confirm.mjs";

let searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", (e) => {
    let client = document.getElementsByClassName('clientBtn')
    let searchRes = document.getElementById('searchFillList')
    searchRes.innerHTML = ''
    if(e.currentTarget.value != ' ' || e.currentTarget.value != ""){
        document.getElementById('searchFill').style.visibility = 'visible'
        for (let i = 0; i < client.length; i++) {
            if(client[i].innerHTML.includes(e.currentTarget.value)){
                let li = document.createElement("li");
                let but = document.createElement("button");

                but.addEventListener("click",() => {
                    document.getElementById('deleteSesh').style.visibility = 'hidden';
                    let name = {
                        name: client[i].innerHTML.slice(0, client[i].innerHTML.indexOf(' ')),
                        surname: client[i].innerHTML.slice(client[i].innerHTML.indexOf(' ') + 1, client[i].innerHTML.length)
                    }
                    document.getElementById('addSesh2').style.visibility = 'visible';
                    edit.style.visibility = 'hidden';
                    getSessions(name)
                    document.getElementById('searchFill').style.visibility = 'hidden'
                    searchBar.value = '';
                })

                but.textContent = client[i].innerHTML
                li.appendChild(but);
                searchRes.append(li);
            }
        }
    }
})
document.addEventListener("click",() =>{
    if(document.activeElement !== searchBar){
        document.getElementById('searchFill').style.visibility = 'hidden'
        searchBar.value = '';
    }
})

// async function m (){
//     let n = await fs.readFile('./renderer/check.json')
//     console.log(n)
//     if(n.open == 0){
//         Confirm.open({
//             title: 'err',
//             message: 'Hello user and welecome to you admin app, would you like o see a tutorial on how to use this app',
//             okText: 'Yes',
//             cancelText: 'No',
//             onok: async function () {
                
//             },
//             oncancel: function (){
//                 return
//             }
//         }); 
//     }
// }
// m();

let createClient = document.getElementById("createClient");
let createSession = document.getElementsByClassName("newClientSession");
let deleteClient = document.getElementById("deleteClient");
let menubutton = document.getElementById('menuButton');
let checkSchedule = document.getElementById('checkSchedule');
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

if(createClient != null){
    createClient.addEventListener("click", function(){
        makeNewClient.addNewClient();
        let pop = document.getElementById('popUp');
        pop.classList.remove("popShow");
        pop.classList.add("popHide");
    })
}

if(createSession != null){
    [...createSession].forEach(el => {
        el.addEventListener("click", function(){
        newSession.addClientSession(gName);
        let pop = document.getElementById('popUp');
        pop.classList.remove("popShow");
        pop.classList.add("popHide");
        })
    })
}

let listClientView = document.getElementById('listClientView');
let sessionView = document.getElementById('sessionClientView');
let sessionPage = document.getElementById('sessionPage');
let clientName = document.getElementById('clientName');
let scheduleView = document.getElementById('scheduleView');
// let placeH = document.getElementById('placeH');

async function loadScheduleView(){
    let data = await listEvents.eventsView();
    scheduleView.innerHTML = '';
    for(let i = 0; i < data.length; i++){
        let event = {
            eventName:data[i].eventName,
            date:data[i].date,
            from:data[i].from,
            till:data[i].till,
            note:data[i].note,
            color: (data[i].color)? data[i].color : '#69e6ff',
            _id: data[i]._id,
            _rev: data[i]._rev
        }

        let eventList = document.createElement('li')
        let eventButton = document.createElement('button')
        let eventCol = document.createElement('div')
        let eventNoteHolder = document.createElement('div')
        let editButton = document.createElement('button')

        eventList.classList.add('eventList')
        eventButton.classList.add('eventExpand')
        eventCol.classList.add('eventColor')
        eventNoteHolder.classList.add('eventDetails')

        eventCol.style.backgroundColor = event.color;
        eventNoteHolder.style.backgroundColor = event.color;

        editButton.innerHTML = 'edit'
        editButton.classList.add('editEvent');

        let eventName = document.createElement('p')
        eventName.innerHTML = event.eventName

        let eventDate = document.createElement('p')
        eventDate.innerHTML = 'Date: ' + event.date

        let eventFrom = document.createElement('p')
        eventFrom.innerHTML = 'From: ' + event.from

        let eventTill = document.createElement('p')
        eventTill.innerHTML = 'Till: ' + event.till

        let eventNote = document.createElement('p')
        eventNote.innerHTML = 'Note: ' + event.note

        let id = document.createElement('p')
        id.id = 'id'
        id.innerHTML = event._id
        id.hidden = true

        let rev = document.createElement('p')
        rev.id = 'rev'
        rev.innerHTML = event._rev
        rev.hidden = true

        eventCol.style.backgroundColor = event.color;

        eventList.appendChild(id)
        eventList.appendChild(rev)
        eventList.appendChild(eventButton)

        scheduleView.appendChild(eventList)
        scheduleView.appendChild(eventNoteHolder)

        eventButton.appendChild(eventCol);
        eventButton.appendChild(eventName);
    
        eventButton.appendChild(editButton)

        eventNoteHolder.appendChild(eventDate);
        eventNoteHolder.appendChild(eventFrom);
        eventNoteHolder.appendChild(eventTill);
        eventNoteHolder.appendChild(eventNote);

        eventNoteHolder.style.display = 'none';
        editButton.style.display = 'none'

        if(eventCol )

        editButton.addEventListener('click', function(){
            Schedule.open({
                onok:async function () {
                    let eventName = document.getElementById('eventName');
                    let date = document.getElementById('date');
                    let from = document.getElementById('from');
                    let till = document.getElementById('till');
                    let note = document.getElementById('notes');
                    let color = document.getElementById('col');
                    let rev = document.getElementById('rev');
                    let id = document.getElementById('id');
                    let data = {
                        eventName: eventName.value,
                        date: date.value,
                        from: from.value,
                        till: till.value,
                        note: note.value,
                        color: color.value,
                        _rev: rev.textContent,
                        _id: id.textContent
                    }
                    let res = await updateEvent.update(data);
                    loadScheduleView();
                },
                oncancel: function (){}
            })
            let eventName = document.getElementById('eventName');
            let date = document.getElementById('date');
            let from = document.getElementById('from');
            let till = document.getElementById('till');
            let note = document.getElementById('notes');
            let color = document.getElementById('col');

            eventName.value = event.eventName
            date.value = event.date
            from.value = event.from
            till.value = event.till
            note.value = event.note
            color.value = event.color
        })
        
        eventButton.addEventListener("click", function(){
            if(eventNoteHolder.style.display == 'block'){
                eventButton.classList.remove('viewing')
                editButton.style.display = 'none'
                eventNoteHolder.style.display = 'none';
            }
            else{
                eventNoteHolder.style.display = 'block'
                editButton.style.display = 'block'
                eventButton.classList.add('viewing');
            }
        });
    }
    if(scheduleView.hasChildNodes() == false){
        document.getElementById('emptySchedule').style.display = 'block';
    }
    else{
        document.getElementById('emptySchedule').style.display = 'none';
    }
}

loadScheduleView();

async function loadClientView(){
    let data = await listClient.clientView();
    for(let i = 0; i < data.length; i++){
        let name = {name:data[i].name, surname:data[i].surname}
        let clientList = document.createElement('li')
        let clientButton = document.createElement('button')
        clientButton.classList.add('clientBtn')
        clientButton.innerHTML = name.name + ' ' + name.surname;

        clientButton.addEventListener("click", function(){
            document.getElementById('deleteSesh').style.visibility = 'hidden';
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

    if(!listClientView.hasChildNodes()){
        listClientView.innerHTML = '<p>Add your first client!</p>'
    }
}

loadClientView();

checkSchedule.addEventListener("click", function(){
    openSchedule.open();
});
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
        document.getElementById('deleteSesh').style.visibility = 'visible';
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
        // console.log(s)
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
        okText: 'Delete',
        cancelText: 'Nevermind',
        onok: function async() {
            let name = document.getElementById('deleteName').value
            let surname = document.getElementById('deleteSurname').value
            let clientName = {
                name: name,
                surname: surname
            }
            Confirm.open({
                title: 'err',
                message: 'Are you sure you want to delete{} this action can not be undone',
                colour: 'rgb(226, 0, 0)',
                okText: 'Yes',
                cancelText: 'No',
                onok: async function () {
                    console.log(clientName.name + clientName.surname)
                    let res = await delClient.delete(clientName)
                    if(res == -1){
                        alert('That client doesnt exist')
                    }
                    if(res == 1){
                        alert('Client deleted successfully')
                    }
                    if( res == 0){
                        alert('Something went wrong')
                    }
                    // console.log(res)
                },
                oncancel: function (){
                    return
                }
            }); 
        },
        oncancel: function (){
            return;
        }
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
document.getElementById('deleteSesh').addEventListener('click', () => {
    let searchSesh = {
        _id: document.getElementById('id').textContent,
        _rev: document.getElementById('rev').textContent
    }
    // let seshNum = Number(document.getElementsByClassName('seshButton btnFocus')[0].textContent.at(-1))
    // searchSesh.session = seshNum
    
    Confirm.open({
        title: 'err',
        message: 'Are You sure you want to delete this session?',
        colour: 'rgb(226, 0, 0)',
        okText: 'Delete',
        cancelText: 'Cancel',
        onok: async function () {
            let res = await delSession.delete(searchSesh)
       
            if(res == 1){
                alert('Session deleted successfully')
            }
            if( res == 0){
                alert('Something went wrong')
            }
        },
        oncancel: function () {
            return
        }
    })
});

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




