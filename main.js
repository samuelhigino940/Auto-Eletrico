console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')



// Esta Linha esta relacionada a preload.js
const path= require('node:path')




// Janela principal
let win
const createWindow = () => {
    nativeTheme.themeSource = 'light' //(dark ou light)
    win = new BrowserWindow({
        width: 800,
        height: 600,
        //autoHideMenuBar: true,
        //minimizable: false,
        resizable: false,
        //Ativação do preload.js
        webPreferences:{
            preload: path.join(__dirname,'preload.js')
        }
    })

    // menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

    //Recebimento dos pedidos do renderizador para abertura de janelas (botoes)
    ipcMain.on('client-window', () => {
        clientWindow()
    })
    
    ipcMain.on('os-window', () => {
        osWindow()
    })
}

// Janela sobre
function aboutWindow() {
    nativeTheme.themeSource = 'light'
    // a linha abaixo obtém a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let about
    if (main) {
        // Criar a janela sobre
        about = new BrowserWindow({
            width: 360,
            height: 220,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true
        })
    }
    //carregar o documento html na janela
    about.loadFile('./src/views/sobre.html')
}

// Janela clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        client = new BrowserWindow({
            width: 1010,
            height: 720,
            //autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    client.loadFile('./src/views/cliente.html')
    client.center()
}

// Janela OS
let os
function osWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        os = new BrowserWindow({
            width: 1010,
            height: 720,
            autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    os.loadFile('./src/views/os.html')
    os.center
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')

// template do menu
const template = [
    {
        label: 'Cadastro',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientWindow()
            },
            {
                label: 'OS',
                click: () => osWindow()
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Relatórios',
      submenu:[
        {
          label:'Clientes'
        },
        {
          label:'OS Abertas'
        },
        {
          label:'OS Concluídas'
        },
        {
          label:`Relatorios Baterias`
        }
      ]
    },
    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Veiculos',
        submenu: [
            {
                label: 'Baterias',
            },
            {
                 label: `Cadastro de Baterias`
            },
            {
                label: `Cadastro de Veiculos`
            },
            {
              label: 'Relatorios Veiculos'
            }
        ]
      },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
    
]