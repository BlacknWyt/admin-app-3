//npx electromon . - restarts app on save like nodemon

const path = require('path');
const { app, BrowserWindow, ipcMain }  = require('electron');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const cDB = new PouchDB("ClientDB");
const csDB = new PouchDB("ClientSessionDB");
// cDB.destroy();
// csDB.destroy();

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'development';
//h-500
let window = () => {
    const mainWindow = new BrowserWindow({
        title: 'Admin',
        width: isDev ? 1000 : 1000,
        minWidth: 700,
        minHeight: 400,
        height: 500,
        // alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    mainWindow.setMenuBarVisibility(false);
    //open dev tools in dev env
    if(isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
}

//new client
let client = () => {
    const newClient = new BrowserWindow({
        title: 'Admin',
        width: 1000,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    newClient.setMenuBarVisibility(false);
    //open dev tools in dev env
    
    newClient.loadFile(path.join(__dirname, 'renderer/newClient.html'));
}
//new session
let  session = (data) => {
    const newClientSession = new BrowserWindow({
        title: 'Admin',
        width: 1000,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    newClientSession.setMenuBarVisibility(false);
    //open dev tools in dev env
    
    
    newClientSession.loadFile(path.join(__dirname, 'renderer/newSession.html'));
    newClientSession.once('ready-to-show', () => {
        newClientSession.webContents.send('getName', data);
        // console.log(data)
      })
   
}

app.whenReady().then(() => {
    window();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        window();
        }
    })
});

// app.isReady()
ipcMain.on('addNewClient', () => {
    client();
})
ipcMain.on('addClientSession', (e, data) => {
    console.log(data)
    session(data);
})

cDB.createIndex({
    index: {fields: ['name', 'surname']}
});

csDB.createIndex({
    index: {fields: ['name', 'surname']}
});

let data = [{
    client: 0,
    name: 'Anna',
    surname: 'Burg',
    session: 1,
    clientNotes: ['Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in. Would day nor ask walls known. But preserved advantage are but and certainty earnestly enjoyment',
         'Passage weather as up am exposed. And natural related man subject. Eagerness get situation his was delighted.','qwdqwdqwdqdwqwdqwdqwdqwdqw']
},{
    client: 0,
    name: 'Anna',
    surname: 'Burg',
    session: 3,
    clientNotes: ['Smile spoke total few great had never their too. Amongst moments do in arrived at my replied',
         'Fat weddings servants but man believed prospect. Companions understood is as especially pianoforte connection introduced.',
         ' Nay newspaper can sportsman are admitting gentleman belonging his. Is oppose no he summer lovers twenty in. Not his difficulty boisterous surrounded bed. Seems folly if in given scale. Sex contented dependent conveying advantage can use.']
},{
    client: 0,
    name: 'Anna',
    surname: 'Burg',
    session: 2,
    clientNotes: ['cool text 1 plus awespme','reallly thats crazy ']
},{
    client: 0,
    name: 'Anna',
    surname: 'Burg',
    session: 4,
    clientNotes: ['cupcakes  are delicious','womp womp lmao.']
}]
// csDB.bulkDocs(data).then(()=>{console.log('done')}).catch()

ipcMain.handle('getClientData', async () => {
     let g = await cDB.find({selector:{name: {$gte: null }, surname:{$gte: null}}});
    //  await csDB.find({selector:{name: '2', surname:'2'}}).then(i => {console.log(i.docs)}).then()
    //  console.log(g.docs[0])
     return g.docs
    
});
// cDB.info().then(i=>{console.log(i)}).catch()

ipcMain.handle('clientData', (req, data) => {
    // console.log(data);
    let res = cDB.post(data)
    .then(() => {
        return {success: true}
    }).catch(()=>{
        return {success: false}
    });
    return res;
})

ipcMain.handle('seshData', (req, data) => {
    // console.log(data);
    let res = csDB.post(data)
    .then(() => {
        return {success: true}
    }).catch(()=>{
        return {success: false}
    });
    return res;
})
// csDB.allDocs({include_docs: true}).then((i) => {console.log(i.rows)})

ipcMain.handle('updateClient', async(req, data) => {
    let res = await csDB.get(data._id).then(function(res) {
        console.log();
            return csDB.put({
                _id: data._id,
                _rev: data._rev,
                client: res.client,
                name: res.name,
                surname: res.surname,
                session: res.session,
                clientNotes: data.clientNotes,
            });
      }).then(function(response) {
        // handle response
      }).catch(function (err) {
        console.log(err);
      });

      return res;
})

ipcMain.handle('clientExists', async(req, data) => {
    console.log(data);
    let exist = await cDB.find({selector :{name:data.name, surname:data.surname}}).then(i => {return i}).then()
    // console.log(exist.docs)
    return exist;
})

ipcMain.handle('getSessions', async(req, data) => {
    let res = await csDB.find({selector : {name:data.name, surname:data.surname}}).then(i => {return i}).then()
    // console.log(res.docs)
    return res.docs
})
// csDB.get('16e53b6d-b78a-4fed-8916-a5fd391ca85d').then((doc)=>{console.log(doc.clientSurname)})
// csDB.get(data._id).then(function(res) {
    // console.log(data);
    //     return csDB.put({
    //         res,
    //         _id: data._id,
    //         _rev: data._rev,
    //         clientNotes: data.clientNotes
    //     });})







//menu template
// const menu = [{
//     label: 'file'
//     submenu:[
//         {
//             label: 'quit',
//             click: () => app.quit()
//         }
//     ]
// }]

app.on('window-all-closed', () => {
    if (process.platform !== isMac) {
      app.quit()
    }
  })





















