const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')
const { BrowserUser } = require('browser-use')

const store = new Store()

let mainWindow
let browserUser

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Initialize BrowserUser
  browserUser = new BrowserUser({
    headless: false,
    defaultViewport: null
  })
}

// Handle CMA research request
ipcMain.handle('perform-cma', async (event, propertyData) => {
  try {
    const browser = await browserUser.launch()
    const results = await performCMAResearch(browser, propertyData)
    await browser.close()
    return results
  } catch (error) {
    console.error('CMA Research Error:', error)
    throw error
  }
})

async function performCMAResearch(browser, propertyData) {
  const page = await browser.newPage()
  const results = {
    comparables: [],
    marketTrends: [],
    propertyDetails: {}
  }

  try {
    // Search property details
    await page.goto('https://www.zillow.com')
    // Add property search logic here

    // Search comparable properties
    // Add comparables search logic here

    // Gather market trends
    // Add market research logic here

    return results
  } catch (error) {
    console.error('Research Error:', error)
    throw error
  } finally {
    await page.close()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
