const fs = require('fs')
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const ora = require('ora')
const chalk = require('chalk')

const listenMessage = require('./src/listenMessage')

const SESSION_FILE_PATH = './private/session.json'
let client
let sessionData

const connectionReady = () => {
  listenMessage(client)
  // readExcel();
}

// -------------------------------------------------------------------------------------------------------

const withSession = () => {
  const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`)
  sessionData = require(SESSION_FILE_PATH)
  spinner.start()

  if (!client) client = new Client({ session: sessionData })

  client.on('ready', () => {
    spinner.stop()
    console.log('Client is ready!')
    connectionReady()
  })

  client.on('auth_failure', () => {
    spinner.stop()
    console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **')
  })

  client.initialize()
}

const withOutSession = () => {
  console.log(chalk.cyan('No tenemos session guardada'))
  const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`)
  spinner.start()
  // client = new Client({ puppeteer: { headless: false }, session: sessionData });
  client = new Client()

  client.on('qr', (qr) => {
    console.log(qr)
    qrcode.generate(qr, { small: true })
  })

  client.on('authenticated', (session) => {
    // Guardamos credenciales de la session para usar luego
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.log('Error al crear archivo de session: ', err)
      }
    })
  })

  client.on('ready', () => {
    spinner.stop()
    console.log('Client is ready!')
    connectionReady()
  })

  client.on('auth_failure', () => {
    spinner.stop()
    console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **')
  })

  client.initialize()
}

(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession()
