/**
 * Aquivos de pré carregamento e reforço de segurança na comunicação entre processos (IPC)
 */
  // Importação dos recursos do framework electron
  //contextBridge (segurança) ipcRenderer(Comunicação)
const {contextBridge, ipcRenderer} = require('electron')

//Expor (autorizar a comunicação entre processo)
contextBridge.exposeInMainWorld('api',{
    clientWindow: () => ipcRenderer.send('client-window'),
    osWindow:()=>ipcRenderer.send('os-window')
})