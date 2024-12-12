import { Confirm } from "./confirm.mjs"; 

//Submit
let addNewClient = document.getElementById("addNewClient");
let clientName = document.getElementById("clientName");
let clientSurname = document.getElementById("clientSurname");
let clientAbout = document.getElementById("clientAbout");
let clientNotes = document.getElementById("clientNotes");

addNewClient.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked")
    let data = {
        client: 0,
        name: clientName.value,
        surname: clientSurname.value,
        clientAbout: clientAbout.value,
        clientNotes: clientNotes.value
    }
    
    let client = {name: clientName.value, surname: clientSurname.value}

    if(clientName.value == ''|| clientSurname.value == ''|| clientAbout.value == ''|| clientNotes.value == ''){
        Confirm.open({
            title: 'custom window',
            message: 'You have left some options blank',
            okText: 'proceed',
            cancelText: 'cancel',
            onok: () => {checkExistClient(client,data);
                console.log('click ok');
            },
            oncancel: () => {},
        })
    }
    else{
        console.log('the second thing ran')
        checkExistClient(client,data)
    }
})

async function checkExistClient(client,data){
    let res = await clientCheck.exist(client);
    console.log(res.docs)
    if(res.docs.length > 0){
        Confirm.open({
            title: 'custom window',
            message: 'client has same name',
            okText: 'proceed',
            cancelText: 'cancel',
            onok: async () => {
                let res = await dbClient.create(data);
                console.log(res)
                if (res.success == true) {
                    window.close();
                }
                else if(res.success == false){
                    alert('Something went wrong');
                }
            // console.log('if work [erfect')
            },
            oncancel: () => {
                console.log('else 2 work perfect')
                // return
            },
        })
    }
    else{
        // console.log('else work perfect')
        // console.log('else work')
        let res = await dbClient.create(data);
        console.log(res)
        if (res.success == true) {
            window.close();
        }
        else if(res.success == false){
            alert('Something went wrong');
        }
    }
}
// db.info().then((i) => {console.log(i)}).catch();


