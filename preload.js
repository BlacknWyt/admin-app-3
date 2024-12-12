const { contextBridge, ipcRenderer } = require('electron')
const path = require('path');
const fs = require('node:fs');

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args)
});

//new client windows
contextBridge.exposeInMainWorld('createClient',{
    addNewClient: () => {
        ipcRenderer.send("addNewClient");
    } 
})

contextBridge.exposeInMainWorld('deleteClient',{
    delete: () => {
        ipcRenderer.send("deleteClient");
    } 
})

contextBridge.exposeInMainWorld('updateClient', {
    update: (data) => {
        let res = ipcRenderer.invoke('updateClient',data);
        console.log(res);
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

contextBridge.exposeInMainWorld('listClient',{
    clientView: () => {
        let data = ipcRenderer.invoke('getClientData');
        return data;
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


