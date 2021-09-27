const fs = require('fs')
const ExcelJS = require('exceljs')
const mimeDb = require('mime-db')
const moment = require('moment')

const saveHistorial = async ({ number, message }) => {
  const pathExcel = `./assets/chats/${number}.xlsx`
  const workbook = new ExcelJS.Workbook()
  const today = moment().format('DD-MM-YYYY hh:mm')

  if (fs.existsSync(pathExcel)) {
    // Si existe el archivo de conversacion lo actualizamos
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.readFile(pathExcel)
      .then(() => {
        const worksheet = workbook.getWorksheet(1)
        const lastRow = worksheet.lastRow
        const getRowInsert = worksheet.getRow(++(lastRow.number))
        getRowInsert.getCell('A').value = today
        getRowInsert.getCell('B').value = message
        getRowInsert.commit()
        workbook.xlsx.writeFile(pathExcel)
      })
  } else {
    // NO existe el archivo de conversacion lo creamos
    const worksheet = workbook.addWorksheet(`Chats-${number}`)
    worksheet.columns = [
      { header: 'Fecha', key: 'number_customer' },
      { header: 'Mensajes', key: 'message' }
    ]
    worksheet.addRow([today, message])
    workbook.xlsx.writeFile(pathExcel)
      .then(() => {
        console.log('saved')
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}

const saveMedia = (media) => {
  const extensionProcess = mimeDb[media.mimetype]
  const ext = extensionProcess.extensions[0]
  fs.writeFile(`./assets/media/${media.filename}.${ext}`, media.data, { encoding: 'base64' }, function (err) {
    if (err) console.log(err)
    else console.log('** Archivo Media Guardado **')
  })
}

module.exports = {
  saveHistorial,
  saveMedia
}
