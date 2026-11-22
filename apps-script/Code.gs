/**
 * Confirmaciones de la boda de Nuria & Amina
 * Recibe cada respuesta del formulario de la web y la añade como fila en la hoja.
 * No tiene ninguna función para leer la hoja: desde la web solo se puede enviar.
 */

const SHEET_ID = '1iP6ZXp_03XOYDfuuU1Zt-vl_ZZfu3AvV9LTl45ZMHBU';
const HEADERS = ['Fecha', 'Nombres', '¿Viene?', '¿Necesita bus?'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Filtro anti-bots: campo oculto que una persona nunca rellena
  if (p.website) return respuesta_(true);

  const nombre = limpiar_(p.nombre);
  const asiste = p.asiste === 'si' ? 'Sí' : p.asiste === 'no' ? 'No' : '';
  if (!nombre || !asiste) return respuesta_(false, 'Faltan datos');
  const bus = asiste === 'Sí' ? (p.bus === 'si' ? 'Sí' : 'No') : '';

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    sheet.appendRow([new Date(), nombre, asiste, bus]);
  } finally {
    lock.releaseLock();
  }
  return respuesta_(true);
}

// Si alguien abre la URL en el navegador solo ve "OK", nunca los datos
function doGet() {
  return ContentService.createTextOutput('OK');
}

function limpiar_(texto) {
  let t = String(texto || '').trim().slice(0, 200);
  // Evita que un nombre que empiece por = + - @ se interprete como fórmula
  if (/^[=+\-@]/.test(t)) t = "'" + t;
  return t;
}

function respuesta_(ok, error) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, error: error || null }))
    .setMimeType(ContentService.MimeType.JSON);
}
