
## Secciones del CV

| Página | Contenido |
|--------|-----------|
| `index.html` | Perfil profesional y datos de contacto básicos |
| `formacion.html` | Ingeniería de Sistemas (UCB) y bachillerato |
| `habilidades.html` | Lenguajes, bases de datos, herramientas y habilidades blandas |
| `proyectos.html` | My Virtual Buddy, Budget Buddy y Toque Fama |
| `idiomas.html` | Español, inglés y certificación técnica |
| `contacto.html` | Datos de contacto y formulario validado |

## Funcionalidades

### Modo oscuro / claro
- Botón en la cabecera para alternar entre ambos temas.
- La preferencia se guarda en `localStorage` y se mantiene al navegar entre páginas.
- Si no hay preferencia guardada, se detecta la del sistema operativo.

### Navegación activa
- La página actual se resalta automáticamente en el menú.
- Se usa el atributo `aria-current="page"` para accesibilidad.

### Validación del formulario
- Se validan los campos: nombre, correo, asunto y mensaje.
- Los errores se muestran debajo de cada campo.
- Si todo está correcto, aparece un mensaje de confirmación.

## Diseño

- **Paleta:** morado, vino y negro (con variante clara).
- **Tipografías:** Cinzel para títulos, Plus Jakarta Sans para el cuerpo (Google Fonts).
- **Layout:** Flexbox para la cabecera y el perfil, CSS Grid para las tarjetas de habilidades.
- **Responsive:** adaptado a móvil, tablet y escritorio mediante `@media queries`.
- **Variables CSS:** definidas en `:root` y `[data-theme="light"]`.

## Accesibilidad

- Enlace "Saltar al contenido principal" al inicio de cada página.
- Etiquetas `aria-label` y `aria-labelledby` en secciones y navegación.
- Atributos `alt` descriptivos en imágenes.
- Contraste adecuado entre texto y fondo en ambos temas.
- Formulario con `aria-invalid` dinámico.


