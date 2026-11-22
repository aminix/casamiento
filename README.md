# Casamiento Nuria & Amina · 04.09.2027

Web de la boda: invitación, guía para los invitados de fuera y formulario de confirmación.

- **Web:** GitHub Pages, servida desde la rama `main` (carpeta raíz).
- **Confirmaciones:** se guardan en la Google Sheet "Casamiento invitados".

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la web en un único archivo: invitación y guía (`#guia`). CSS, JS y dibujos van dentro. |
| `apps-script/Code.gs` | Copia del Google Apps Script que recibe el formulario y añade una fila en la hoja. |
| `.nojekyll` | Para que GitHub Pages sirva los archivos tal cual. |

## Cómo funciona la confirmación

1. El invitado rellena el formulario: nombres, si viene y si necesita bus.
2. La web envía los datos por `POST` a la aplicación web de Apps Script (`SCRIPT_URL` en `index.html`).
3. El script (`apps-script/Code.gs`) añade una fila en la primera pestaña de la hoja: **Fecha · Nombres · ¿Viene? · ¿Necesita bus?**

La hoja es privada. La URL del script solo permite enviar respuestas, no leerlas. Hay un campo oculto anti-bots (`website`) y los nombres que empiezan por `= + - @` se guardan como texto, no como fórmula.

### Si cambias el script

Edita el código en Apps Script (en la hoja: Extensions → Apps Script, proyecto "Confirmaciones boda") y actualiza esta copia. Para que el cambio se publique **sin cambiar la URL**:

Deploy → Manage deployments → ✏️ Edit → Version: **New version** → Deploy.

Si creas una implementación nueva en vez de editar la existente, la URL cambia y hay que actualizar `SCRIPT_URL` en `index.html`.

## Editar la web

Todo está en `index.html`. Los colores de la invitación están en el bloque `:root` del principio del `<style>`, y los de la guía andaluza en `body.in-guia`. Haz el cambio, súbelo a `main` y GitHub Pages lo publica en uno o dos minutos.
