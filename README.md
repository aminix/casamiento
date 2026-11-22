# Casamiento Nuria & Amina · 04.09.2027

Web de la boda: invitación, guía para los invitados de fuera y formulario de confirmación.

- **Web:** https://nuria.aminix.io — GitHub Pages, servida desde la rama `main` (carpeta raíz).
- **Confirmaciones:** se guardan en la Google Sheet "Casamiento invitados".

## Dominio

`aminix.io` está registrado en GoDaddy. La web usa el subdominio `nuria.aminix.io`, con estos registros DNS:

| Tipo | Nombre | Valor | Para qué |
|---|---|---|---|
| CNAME | `nuria` | `aminix.github.io` | Lleva `nuria.aminix.io` a GitHub Pages. |
| TXT | `_github-pages-challenge-aminix` | (código de verificación de GitHub) | Verifica `aminix.io` en la cuenta de GitHub, para que nadie más pueda usar el dominio ni sus subdominios en GitHub Pages. **No lo borres.** |

El archivo `CNAME` del repo le dice a GitHub qué dominio usar; no lo borres tampoco. `resume.aminix.io` sigue apuntando a la web personal (repo `aminix.github.io`), y `aminix.io` / `www.aminix.io` no se usan.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la web en un único archivo: invitación y guía (`#guia`). CSS, JS y dibujos van dentro. |
| `apps-script/Code.gs` | Copia del Google Apps Script que recibe el formulario y añade una fila en la hoja. |
| `.nojekyll` | Para que GitHub Pages sirva los archivos tal cual. |
| `CNAME` | El dominio propio de la web (`nuria.aminix.io`). |

## Cómo funciona la confirmación

1. El invitado rellena el formulario: nombres, si viene y si necesita bus.
2. La web envía los datos por `POST` a la aplicación web de Apps Script (`SCRIPT_URL` en `index.html`).
3. El script (`apps-script/Code.gs`) añade una fila en la primera pestaña de la hoja: **Fecha · Nombres · ¿Viene? · ¿Necesita bus?**

La hoja es privada. La URL del script solo permite enviar respuestas, no leerlas. Hay un campo oculto anti-bots (`website`) y los nombres que empiezan por `= + - @` se guardan como texto, no como fórmula.

### Si cambias el script

Edita el código en Apps Script (en la hoja: Extensions → Apps Script, proyecto "Confirmaciones boda") y actualiza esta copia. Para que el cambio se publique **sin cambiar la URL**:

Deploy → Manage deployments → ✏️ Edit → Version: **New version** → Deploy.

Si creas una implementación nueva en vez de editar la existente, la URL cambia y hay que actualizar `SCRIPT_URL` en `index.html`.

## Idiomas (español / inglés)

- La web elige el idioma según el navegador: si alguna de sus lenguas preferidas empieza por `es`, sale en español; si no, en inglés.
- Arriba a la derecha hay dos banderas (España / Reino Unido) para cambiarlo. La elección se recuerda en ese navegador.
- Se puede forzar con un enlace: `?lang=es` o `?lang=en` (por ejemplo, `https://nuria.aminix.io/?lang=en`).
- El español está escrito directamente en el HTML. Cada texto traducible lleva `data-i18n="kN"`, y su versión en inglés está en `I18N_EN` dentro del `<script>` final. Los mensajes que genera el JavaScript (errores del formulario, "gracias", etc.) están en `I18N_JS`.
- Si cambias un texto en español, cambia también su `kN` en `I18N_EN`.

## Editar la web

Todo está en `index.html`. Los colores de la invitación están en el bloque `:root` del principio del `<style>`, y los de la guía andaluza en `body.in-guia`. Haz el cambio, súbelo a `main` y GitHub Pages lo publica en uno o dos minutos.
