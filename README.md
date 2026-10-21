# PokeMemory

**Nombre y apellidos:** Silvia Blanco Fumadó

**Aplicación desplegada:** https://practica-mid-term-silviablancofumad.vercel.app/

**Vídeo de demostración:** https://www.youtube.com/watch?v=ZDTw-9sdezI

---

## Descripción

PokeMemory es un juego de memoria con temática Pokémon, hecho con HTML, CSS y JavaScript sin frameworks de frontend, usando Vite. Los Pokémon se obtienen de [PokeAPI](https://pokeapi.co/) mediante `fetch`.

## Funcionalidades

- **Perfil de jugador:** username de 3 a 15 caracteres y buscador de Pokémon favorito con lista reducida de coincidencias.
- **Sesión:** el perfil se guarda en `sessionStorage` y se puede cerrar sesión sin perder el historial.
- **Partida:** número de cartas par entre 4 y 48 (con opciones rápidas y campo personalizado), temporizador que arranca con la primera carta y botón de reinicio.
- **Lógica del Memory:** solo dos cartas descubiertas a la vez, parejas con Pokémon aleatorios sin repetir y control de acciones rápidas o incorrectas.
- **Historial y ranking:** las partidas terminadas se guardan en `localStorage`. El ranking se ordena por mayor número de cartas y, en caso de empate, por menor tiempo. Se muestra siempre en pantalla. Con más de 5 resultados se muestran las primeras posiciones y la última partida queda resaltada.
- **Diseño responsive** para ordenador, tablet y móvil.

## Tecnologías

HTML, CSS y JavaScript (módulos ES), Vite, ESLint y HTMLHint. Despliegue en Vercel.

## Estructura del código

```text
src/
├── main.js       Arranque de la aplicación
├── game/         Reglas del juego (sin tocar el HTML)
├── services/     Acceso a PokeAPI
├── stores/       sessionStorage y localStorage
└── ui/           Todo lo que toca el HTML
```

## Uso de inteligencia artificial

La IA ha sido una herramienta de apoyo constante durante el desarrollo.

### Cómo la he usado

- **Para aprender:** me explicaba cada concepto (`fetch`, módulos, `localStorage` y `sessionStorage`, eventos...) antes de aplicarlo.
- **Para avanzar paso a paso:** yo decidía qué debía hacer la aplicación y cómo debía comportarse (por ejemplo, que el temporizador arranque al girar la primera carta, el formato del ranking para que quede bien visible y legible en la pantalla), con el razonamiento de por qué lo quería así, y la IA proponía cómo implementarlo.
- **Para diagnosticar errores:** cuando algo fallaba, le enseñaba el error o el código y me ayudaba a encontrar la causa.

### Reflexión sobre el uso de IA

Debido a mi nivel actual de experiencia y al tiempo disponible para la práctica, me apoyé en la IA más de lo que me habría gustado en algunos momentos. En determinadas partes generó propuestas de código a partir de mis indicaciones, que posteriormente revisé, adapté e integré en el proyecto.

Por ejemplo:

- La reorganización del proyecto en módulos fue realizada siguiendo las sugerencias de la IA.
- Parte del código CSS se generó a partir de un diseño propio elaborado previamente en Figma.
- Algunas funcionalidades se implementaron mediante iteraciones entre mis requisitos y las propuestas de la IA.

Considero que la IA ha sido una herramienta de apoyo al aprendizaje y al desarrollo, pero también soy consciente de que aún necesito adquirir más práctica para poder implementar de forma autónoma todas las soluciones y por eso voy a seguir trabajando conscientemente hacia mi objetivo que es aprender el máximo.
