# 🚀 EMPIEZA AQUÍ - Guía para Principiantes

## ¡Bienvenido! 👋

Esta guía te llevará de la mano, paso a paso. **No necesitas saber nada**, solo seguir las instrucciones.

---

## 📋 PASO 1: Lee la Teoría (5 minutos)

Antes de tocar código, entiende qué es un agente:

```bash
cat QUE_ES_UN_AGENTE.md
```

**¿Qué hace este comando?**
- `cat` = mostrar contenido de un archivo
- Lee el archivo que explica qué es un agente

**¿Qué aprenderás?**
- Qué es un agente (piensa en él como un asistente virtual)
- Cómo funciona (recibe mensaje → piensa → responde)
- Por qué son útiles

---

## ⭐ PASO 2: Ejecuta tu Primer Agente (EJEMPLO 1)

### 2.1 - Ve a la carpeta del ejemplo 1:

```bash
cd agents-tutorial/ejemplo-1-clima
```

**¿Qué hace?**
- `cd` = cambiar directorio (entrar a una carpeta)
- Entras a la carpeta del primer ejemplo

### 2.2 - Ejecuta el agente:

```bash
python agente_clima.py
```

**¿Qué hace?**
- `python` = ejecutar un programa de Python
- `agente_clima.py` = el archivo del agente

### 2.3 - ¡Observa la magia! ✨

Verás algo como esto:

```
==================================================
🌤️  AGENTE DE CLIMA - EJEMPLO 1
==================================================

🤖 Agente del Clima: Consultando el clima de Madrid...

📍 Clima en Madrid
========================================
🌡️  Temperatura: 22°C
☁️  Condición: soleado
💧 Humedad: 45%

📋 Recomendaciones:
   • 👕 Ropa ligera, temperatura agradable
   • 😎 Día perfecto para salir
```

**¡Felicidades! Acabas de ejecutar tu primer agente.** 🎉

### 2.4 - Entiende qué pasó:

Lee el README del ejemplo:

```bash
cat README.md
```

O abre el archivo `agente_clima.py` en tu editor favorito para ver cómo funciona.

**Conceptos que aprendiste:**
- ✅ Un agente puede usar herramientas (en este caso, obtener clima)
- ✅ Procesa información y genera respuestas
- ✅ Puede razonar (dar recomendaciones según el clima)

---

## ⭐⭐ PASO 3: Agente con Memoria (EJEMPLO 2)

Ahora vas a crear un agente que **recuerda** cosas.

### 3.1 - Ve a la carpeta del ejemplo 2:

```bash
cd ../ejemplo-2-tareas
```

**¿Qué hace?**
- `../` = subir una carpeta (salir de ejemplo-1)
- Entrar a `ejemplo-2-tareas`

### 3.2 - Ejecuta el agente:

```bash
python agente_tareas.py
```

### 3.3 - Interactúa con él:

El agente te mostrará una demostración automática y luego podrás escribir tus propios comandos:

```
💬 MODO INTERACTIVO (escribe tus propios comandos)
===========================================================

👤 Tú: crear Comprar pan
🤖 Agente: ✅ Tarea creada: 'Comprar pan'

👤 Tú: listar
🤖 Agente:
📋 Lista de Tareas
==================================================
0. ⏳ Comprar pan

👤 Tú: completar 0
🤖 Agente: ✅ Tarea completada: 'Comprar pan'
```

### 3.4 - ¡Cierra y vuelve a abrir!

```bash
# Cierra el programa (Ctrl+C o escribe 'salir')
# Vuelve a ejecutar:
python agente_tareas.py

# ¡Las tareas que creaste siguen ahí! 🎉
```

**Esto se llama PERSISTENCIA**: el agente recuerda lo que hiciste.

**Conceptos nuevos:**
- ✅ Agente con estado (recuerda información)
- ✅ Múltiples comandos (crear, listar, completar, eliminar)
- ✅ Guarda datos en un archivo (tareas.json)

---

## ⭐⭐⭐ PASO 4: Agente Conversacional (EJEMPLO 3)

El más avanzado: ¡un agente que conversa contigo y te recuerda!

### 4.1 - Ve a la carpeta del ejemplo 3:

```bash
cd ../ejemplo-3-conversacional
```

### 4.2 - Ejecuta el agente:

```bash
python agente_conversacional.py
```

### 4.3 - Ten una conversación:

```
👤 Tú: Hola
🤖 Agente: ¡Hola! 👋 ¿Cómo te llamas?

👤 Tú: Me llamo María
🤖 Agente: ¡Encantado de conocerte, María! 🎉

👤 Tú: ¿Cuánto es 25 * 4?
🤖 Agente: 🧮 El resultado de '25 * 4' es: **100**

👤 Tú: ¿Qué hora es?
🤖 Agente: 📅 Fecha: 2025-11-20
          🕐 Hora: 15:30:00

-- Cierra el programa --

-- Vuelve a abrirlo al día siguiente --

👤 Tú: Hola
🤖 Agente: ¡Hola de nuevo, María! 😊
          ¿En qué puedo ayudarte hoy?

          👈 ¡RECUERDA TU NOMBRE!
```

**Conceptos nuevos:**
- ✅ Memoria conversacional (recuerda TODO lo que hablaron)
- ✅ Perfil de usuario (guarda tu nombre, preferencias)
- ✅ Contexto (usa mensajes anteriores para responder mejor)

---

## 🎯 RESUMEN: ¿Qué acabas de aprender?

| Ejemplo | Qué hace | Concepto clave |
|---------|----------|----------------|
| **1. Clima** | Consulta clima y da consejos | Herramientas básicas |
| **2. Tareas** | Lista de tareas que recuerda | Estado y persistencia |
| **3. Conversacional** | Chat que te recuerda | Memoria completa |

---

## 🤔 ¿Y ahora qué?

### Opción A: Modifica los ejemplos

Abre los archivos `.py` en tu editor y cambia cosas:

**Ejemplo 1:**
```python
# En agente_clima.py, línea ~30
# Agrega tu ciudad favorita:
clima_simulado = {
    "madrid": {"temp": 22, "condicion": "soleado", "humedad": 45},
    "tucudad": {"temp": 25, "condicion": "lluvioso", "humedad": 70},  # ← NUEVA
}
```

Guarda y ejecuta de nuevo: `python agente_clima.py`

### Opción B: Lee el código con calma

Cada archivo `.py` está **súper comentado**. Ábrelo y lee línea por línea.

### Opción C: Experimenta

En el Ejemplo 2 (tareas):
- Crea 5 tareas
- Marca algunas como completadas
- Pide estadísticas

En el Ejemplo 3 (conversacional):
- Dile tu nombre
- Pregúntale cálculos
- Pide estadísticas de la conversación
- Cierra y abre para ver que te recuerda

---

## 📚 Cuando quieras profundizar:

Lee los README de cada ejemplo:
```bash
cd agents-tutorial/ejemplo-1-clima
cat README.md

cd ../ejemplo-2-tareas
cat README.md

cd ../ejemplo-3-conversacional
cat README.md
```

Cada README explica **en detalle** cómo funciona ese ejemplo.

---

## ❓ ¿Problemas?

### No funciona el comando `python`:
```bash
# Intenta con:
python3 agente_clima.py
```

### Error "No such file":
```bash
# Verifica que estás en la carpeta correcta:
pwd  # muestra dónde estás
ls   # muestra qué archivos hay
```

### Quieres empezar de cero:
```bash
# Vuelve a la carpeta principal:
cd /home/user/demoai/agents-tutorial
```

---

## 🎉 ¡Listo!

**Siguiente paso inmediato:**
```bash
cd /home/user/demoai/agents-tutorial/ejemplo-1-clima
python agente_clima.py
```

**¡Diviértete aprendiendo sobre agentes!** 🚀

---

## 💡 Tip Final

No te preocupes si no entiendes todo al principio. La idea es:

1. **Ejecutar** primero (ver que funciona)
2. **Leer** después (entender cómo funciona)
3. **Modificar** al final (hacer tuyo el código)

**¡Tú puedes!** 💪
