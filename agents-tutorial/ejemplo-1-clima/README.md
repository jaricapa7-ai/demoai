# 🌤️ Ejemplo 1: Agente Simple de Clima

## ¿Qué aprenderás?

Este ejemplo te enseña los **fundamentos básicos** de un agente:
- Cómo definir herramientas (tools)
- Cómo procesar consultas
- Cómo generar respuestas inteligentes
- Arquitectura básica de un agente

## Características

✅ **Simple y fácil de entender**
✅ **Sin dependencias externas**
✅ **Código comentado línea por línea**
✅ **Agente sin estado (stateless)**

## Estructura del Código

```
agente_clima.py
│
├── ClimaTool           # Herramienta para obtener clima
│   └── obtener_clima() # Simula consulta a API
│
├── AgenteClima         # El agente principal
│   ├── __init__()      # Inicialización
│   ├── _generar_recomendaciones()  # Lógica de razonamiento
│   └── procesar_consulta()  # Método principal
│
└── main()              # Función de demostración
```

## Cómo Ejecutar

```bash
# Navega a la carpeta
cd agents-tutorial/ejemplo-1-clima

# Ejecuta el agente
python agente_clima.py
```

## Salida Esperada

```
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

## Conceptos Clave

### 1. Herramientas (Tools)
```python
class ClimaTool:
    @staticmethod
    def obtener_clima(ciudad: str) -> Dict:
        # Obtiene datos del clima
```

Las herramientas son funciones que el agente puede **usar** para obtener información o realizar acciones.

### 2. Procesamiento
```python
def procesar_consulta(self, ciudad: str) -> str:
    # 1. Obtener datos
    clima = self.clima_tool.obtener_clima(ciudad)

    # 2. Razonar
    recomendaciones = self._generar_recomendaciones(clima)

    # 3. Responder
    return respuesta_formateada
```

### 3. Agente Sin Estado
Este agente **no recuerda** conversaciones pasadas:
```python
# Cada llamada es independiente
agente.procesar_consulta("Madrid")   # ✓
agente.procesar_consulta("Londres")  # ✓ (no recuerda Madrid)
```

## Personalización

Puedes extender este agente fácilmente:

### Agregar más ciudades:
```python
clima_simulado = {
    "madrid": {"temp": 22, "condicion": "soleado", "humedad": 45},
    "tu_ciudad": {"temp": 20, "condicion": "nublado", "humedad": 60},
}
```

### Agregar más recomendaciones:
```python
def _generar_recomendaciones(self, clima):
    # Agrega tu lógica aquí
    if clima["temperatura"] > 30:
        recomendaciones.append("🏖️ Perfecto para la playa")
```

### Conectar API real:
```python
import requests

def obtener_clima(ciudad: str):
    api_key = "tu_api_key"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={ciudad}"
    response = requests.get(url)
    return response.json()
```

## Limitaciones

❌ No tiene memoria (olvida conversaciones)
❌ No puede manejar conversaciones complejas
❌ Una sola herramienta
❌ Lógica de decisión simple

## Próximo Paso

👉 **Ejemplo 2: Agente de Tareas**

En el siguiente ejemplo aprenderás:
- Agentes CON estado (con memoria)
- Persistencia de datos
- Múltiples operaciones (CRUD)
- Gestión de contexto

## Preguntas Frecuentes

**P: ¿Por qué usar una clase para las herramientas?**
R: Para organizar el código y facilitar agregar más herramientas en el futuro.

**P: ¿Puedo usar esto en producción?**
R: Este es un ejemplo educativo. Para producción, usa frameworks como LangChain o CrewAI.

**P: ¿Cómo agrego más inteligencia?**
R: Puedes integrar modelos de IA como GPT, Claude, o usar reglas más complejas.
