# Kuroneko Clean 🐱✨

App móvil que combina **tareas de aseo** con el **cuidado de un gatito virtual**. Completa tareas de limpieza y mantén feliz a tu mascota.

---

## 🆕 Primera vez: ¿Dónde está el QR?

**Tu correo (mewnekosama@gmail.com) no tiene que estar “asociado” a la app.** Expo Go solo usa tu cuenta para iniciar sesión; la app Kuroneko Clean no guarda usuarios ni correos.

El **código QR no está dentro de Expo Go**. Aparece en la **computadora** cuando alguien enciende el proyecto. Pasos:

1. **En la computadora** (la misma donde tu amigo te dejó el proyecto):
   - Abrir **PowerShell** o **Símbolo del sistema**.
   - Ir a la carpeta del proyecto, por ejemplo:  
     `cd C:\Users\Usuario\kuronekoclean`
   - Ejecutar:  
     `npx expo start`
2. En la pantalla de la compu va a salir un **código QR** y un menú (letras como `a`, `i`, `w`).
3. **En el celular**:
   - Conectar el celular al **mismo WiFi** que la computadora.
   - Abrir **Expo Go** (con tu cuenta mewnekosama@gmail.com ya no importa para el QR).
   - **Android:** en Expo Go, toca “Escanear código QR” y apunta a la pantalla de la compu.
   - **iPhone:** abre la app **Cámara**, enfoca el QR y cuando salga el aviso, elige “Abrir en Expo Go”.

Si la compu está apagada o no se ha ejecutado `npx expo start`, el QR **no va a aparecer** en ningún lado. Tu amigo (o tú en esa compu) tiene que dejar el proyecto corriendo para que puedas escanear.

---

## Cómo funciona la app

- **Aseo**: Lista de tareas diarias (barrer, cocina, baño, camas, basura, polvo). Marca lo que ya hiciste.
- **Gatito**: Tu mascota Kuroneko tiene hambre y felicidad. Alimenta y juega con él; si cumples tareas de aseo, ¡se pone más feliz!

## Requisitos

- Node.js (LTS) en la computadora
- Expo Go en tu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

## Instalación y ejecución (en la computadora)

Desde la carpeta del proyecto (si acabas de clonar o descargar, entra antes con `cd kuronekoclean`):

```bash
npm install
npx expo start
```

Ahí aparecerá el QR para escanear con el celular.

## Imagen de fondo (pantalla principal)

Por defecto se usa una foto gratuita de [Unsplash](https://unsplash.com) (rincon de estudio). Para **usar tu propia imagen** (por ejemplo la que guardes de Pinterest):

1. Guarda la imagen en la carpeta **`assets`** del proyecto con nombre **`study-bg.jpg`** (o .png).
2. En `src/screens/GatitoScreen.js` cambia la línea del fondo a:
   - `source={require('../assets/study-bg.jpg')}`  
   y comenta o borra la línea de `FONDO_STUDY` con la URL.

**Programas gratuitos útiles:** para buscar fotos libres → [Unsplash](https://unsplash.com), [Pexels](https://pexels.com). Para editar la imagen → [GIMP](https://www.gimp.org) (gratis). Para guardar la de Pinterest: clic derecho → "Guardar imagen como..." (solo uso personal).

## Estructura

- `App.js` – Navegación (Gatito → Tareas)
- `src/context/CatContext.js` – Estado global: tareas, hambre y felicidad del gatito
- `src/screens/AseoScreen.js` – Pantalla de tareas de limpieza
- `src/screens/GatitoScreen.js` – Pantalla del gatito (alimentar, jugar, estado)

## Tecnologías

- React Native + Expo
- React Navigation (bottom tabs)
