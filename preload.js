const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fs', {
    readFile: (file)=> {
        let res = ipcRenderer.invoke('fsRead', file)
        return res;
    }
});

//new client windows
contextBridge.exposeInMainWorld('makeNewClient',{
    addNewClient: () => {
        ipcRenderer.send("addNewClient");
    } 
})

contextBridge.exposeInMainWorld('openSchedule',{
    open: () => {
        ipcRenderer.send("openSchedule");
    } 
})

contextBridge.exposeInMainWorld('search',{
    client: (data) => {
        let res = ipcRenderer.invoke("search", data);
        return res;
    } 
})

contextBridge.exposeInMainWorld('delClient',{
    delete: (data) => {
        let res = ipcRenderer.invoke("delClient", data);
        return res;
    } 
})

contextBridge.exposeInMainWorld('delSession',{
    delete: (data) => {
        let res = ipcRenderer.invoke("delSession", data);
        return res;
    } 
})

contextBridge.exposeInMainWorld('updateClient', {
    update: (data) => {
        let res = ipcRenderer.invoke('updateClientSession',data);
        // console.log(res);
        return res;
    }
})
contextBridge.exposeInMainWorld('updateEvent', {
    update: (data) => {
        let res = ipcRenderer.invoke('updateEvent',data);
        // console.log(res);
        return res;
    }
})

contextBridge.exposeInMainWorld('newSession',{
    addClientSession: (name) => {
        ipcRenderer.send("addClientSession", name);
    } 
})

contextBridge.exposeInMainWorld( 'electron',{
    getInput: (channel,func) => {ipcRenderer.once(channel,func);},
});

contextBridge.exposeInMainWorld("dbClient", {
    create: (data) => {
        let res = ipcRenderer.invoke('clientData', data);
        return res;
    }
})

contextBridge.exposeInMainWorld('dbSession', {
    create: (data) => {
        let res = ipcRenderer.invoke('seshData', data);
        return res;
    }
})

contextBridge.exposeInMainWorld('dbScheduler', {
    create: (data) => {
        let res = ipcRenderer.invoke('schedData', data);
        console.log(data);
        return res;
    }
})

contextBridge.exposeInMainWorld('listClient',{
    clientView: () => {
        let data = ipcRenderer.invoke('getClientData');
        return data;
    }
})

contextBridge.exposeInMainWorld('listEvents',{
    eventsView: () => {
        let data = ipcRenderer.invoke('getEvents');
        return data;
    }
})

contextBridge.exposeInMainWorld('checkEvents',{
    exist: (data) => {
        let res = ipcRenderer.invoke('checkEvents', data);
        return res;
    }
})

contextBridge.exposeInMainWorld('clientCheck',{
    exist: (data) => {
        let res = ipcRenderer.invoke('clientExists',data);
        return res;
    }
})

contextBridge.exposeInMainWorld('getClientSessions',{
    data: (data) => {
        let res = ipcRenderer.invoke('getSessions', data);
        return res;
    }
}) 


