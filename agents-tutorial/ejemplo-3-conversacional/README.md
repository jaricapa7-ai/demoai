# 💬 Ejemplo 3: Agente Conversacional con Memoria

## ¿Qué aprenderás?

Este ejemplo te enseña conceptos **avanzados** de agentes:
- Memoria conversacional completa
- Gestión de contexto entre mensajes
- Perfil de usuario persistente
- Motor de razonamiento contextual
- Conversaciones multi-turn (múltiples turnos)
- Arquitectura profesional

## Comparación con Ejemplos Anteriores

| Aspecto | Ejemplo 1 | Ejemplo 2 | Ejemplo 3 |
|---------|-----------|-----------|-----------|
| **Memoria** | Ninguna | Estado básico | Memoria conversacional completa |
| **Contexto** | No | Limitado | Sí, completo |
| **Persistencia** | No | JSON simple | Múltiples archivos (memoria + perfil) |
| **Razonamiento** | Reglas simples | NLP básico | Motor contextual |
| **Personalización** | No | No | Perfil de usuario |
| **Herramientas** | 1 | 5 | 4 + extensible |
| **Complejidad** | Básica | Intermedia | Avanzada |

## Características

✅ **Memoria conversacional** - Recuerda toda la conversación
✅ **Perfil de usuario** - Aprende sobre ti
✅ **Contexto persistente** - Usa historial para responder
✅ **Múltiples herramientas** - Cálculos, fecha, estadísticas
✅ **Motor de razonamiento** - Decide qué hacer basándose en contexto
✅ **Multi-turn** - Conversaciones naturales de múltiples turnos

## Arquitectura

```
agente_conversacional.py
│
├── Mensaje                    # Modelo de mensaje individual
│
├── MemoriaConversacional      # Sistema de memoria
│   ├── agregar_mensaje()      # Guarda mensajes
│   ├── obtener_contexto()     # Obtiene últimos N mensajes
│   ├── buscar_en_historial()  # Búsqueda semántica
│   └── _guardar/_cargar()     # Persistencia
│
├── PerfilUsuario              # Perfil del usuario
│   ├── actualizar()           # Actualiza datos
│   ├── agregar_interes()      # Registra intereses
│   └── incrementar_interacciones() # Stats
│
├── HerramientasAgente         # Tools del agente
│   ├── calcular()             # Calculadora
│   ├── contar_palabras()      # Análisis de texto
│   ├── obtener_fecha_hora()   # Fecha/hora
│   └── generar_resumen_estadisticas() # Stats
│
├── MotorRazonamiento          # El "cerebro"
│   ├── analizar_intencion()   # Detecta qué quiere el user
│   └── generar_respuesta()    # Crea respuesta contextual
│
└── AgenteConversacional       # Orquestador principal
    ├── procesar_mensaje()     # Método principal
    └── obtener_resumen_sesion() # Resumen de la sesión
```

## Cómo Ejecutar

```bash
# Navega a la carpeta
cd agents-tutorial/ejemplo-3-conversacional

# Ejecuta el agente
python agente_conversacional.py
```

## Ejemplo de Conversación

```
👤 Tú: Hola
🤖 Agente: ¡Hola! 👋 Soy un agente conversacional con memoria.
          ¿Cómo te llamas?

👤 Tú: Me llamo Juan
🤖 Agente: ¡Encantado de conocerte, Juan! 🎉
          Recordaré tu nombre para futuras conversaciones.

👤 Tú: ¿Cuánto es 15 * 7?
🤖 Agente: 🧮 El resultado de '15 * 7' es: **105**

👤 Tú: ¿Qué hora es?
🤖 Agente: 📅 Fecha: 2025-11-20
          🕐 Hora: 14:30:25
          📆 Día: Wednesday

👤 Tú: Muéstrame estadísticas
🤖 Agente: 📊 Estadísticas de nuestra conversación:
          💬 Total de mensajes: 10
          👤 Tus mensajes: 5
          🤖 Mis mensajes: 5

-- CIERRAS EL PROGRAMA Y LO VUELVES A ABRIR --

👤 Tú: Hola
🤖 Agente: ¡Hola de nuevo, Juan! 😊
          ¿En qué puedo ayudarte hoy?

          👈 ¡RECUERDA TU NOMBRE!
```

## Conceptos Clave

### 1. Memoria Conversacional

```python
class MemoriaConversacional:
    def __init__(self, max_memoria: int = 50):
        self.historial: deque = deque(maxlen=max_memoria)
```

**Ventana de memoria**: El agente mantiene los últimos 50 mensajes en memoria activa.

**¿Por qué una ventana?**
- Evita saturar la memoria con conversaciones muy largas
- Los mensajes más recientes son más relevantes
- Mantiene el rendimiento óptimo

### 2. Contexto en Respuestas

```python
def procesar_mensaje(self, mensaje: str) -> str:
    # 1. Guardar mensaje
    self.memoria.agregar_mensaje("usuario", mensaje)

    # 2. Obtener contexto (últimos 10 mensajes)
    contexto = self.memoria.obtener_contexto(ultimos_n=10)

    # 3. Usar contexto para entender intención
    intencion = self.motor.analizar_intencion(mensaje, contexto)

    # 4. Generar respuesta basada en contexto
    respuesta = self.motor.generar_respuesta(intencion, mensaje)
```

**El agente "piensa" así:**
1. "¿Qué me acaba de decir el usuario?"
2. "¿Qué hemos hablado antes?"
3. "Basándome en todo eso, ¿qué quiere ahora?"
4. "¿Cómo respondo de manera coherente?"

### 3. Perfil de Usuario

```python
{
    "nombre": "Juan",
    "preferencias": {},
    "intereses": ["programación", "IA"],
    "interacciones_totales": 42,
    "primera_interaccion": "2025-11-01T10:00:00",
    "ultima_interaccion": "2025-11-20T14:30:00"
}
```

**Personalización**: El agente usa tu nombre en respuestas.

**Estadísticas**: Sabe cuántas veces han interactuado.

**Aprendizaje**: Puede registrar tus intereses para futuras conversaciones.

### 4. Motor de Razonamiento

```python
def analizar_intencion(self, mensaje: str, contexto: List[Mensaje]):
    # Analiza el mensaje + contexto
    # Retorna la intención detectada

    # Ejemplo:
    # Mensaje: "¿y en Francia?"
    # Contexto: Última pregunta fue "¿Cuál es la capital de España?"
    # Intención: Pregunta sobre capital de Francia (usa contexto!)
```

**Razonamiento contextual**: No solo mira el mensaje actual, también el historial.

### 5. Conversaciones Multi-Turn

**Single-turn** (Ejemplo 1):
```
Usuario: ¿Clima en Madrid?
Agente: 22°C, soleado
Usuario: ¿Y en Londres?
Agente: [No sabe que preguntaste por clima antes]
```

**Multi-turn** (Ejemplo 3):
```
Usuario: ¿Clima en Madrid?
Agente: 22°C, soleado
Usuario: ¿Y en Londres?
Agente: [Sabe que preguntas por clima] 15°C, lluvioso
```

## Flujo Completo de una Interacción

```
Usuario escribe: "Hola"
          ↓
AgenteConversacional.procesar_mensaje("Hola")
          ↓
1. memoria.agregar_mensaje("usuario", "Hola")
          ↓
2. contexto = memoria.obtener_contexto(ultimos_n=10)
   → [últimos 10 mensajes de la conversación]
          ↓
3. intencion = motor.analizar_intencion("Hola", contexto)
   → Detecta: {"tipo": "saludo", "accion": "saludar"}
          ↓
4. respuesta = motor.generar_respuesta(intencion, "Hola")
   → Verifica perfil: ¿Tiene nombre guardado?
   → Si nombre = "Juan": "¡Hola de nuevo, Juan!"
   → Si no: "¡Hola!"
          ↓
5. memoria.agregar_mensaje("agente", respuesta)
          ↓
6. perfil.incrementar_interacciones()
          ↓
Retorna respuesta al usuario
```

## Archivos de Persistencia

El agente crea automáticamente estos archivos:

```
ejemplo-3-conversacional/
├── agente_conversacional.py
├── memoria.json              # Historial de conversaciones
└── perfil_usuario.json       # Tu perfil
```

### memoria.json
```json
[
  {
    "rol": "usuario",
    "contenido": "Hola",
    "timestamp": "2025-11-20T14:30:00"
  },
  {
    "rol": "agente",
    "contenido": "¡Hola! ¿Cómo te llamas?",
    "timestamp": "2025-11-20T14:30:01"
  }
]
```

### perfil_usuario.json
```json
{
  "nombre": "Juan",
  "interacciones_totales": 10,
  "primera_interaccion": "2025-11-20T14:30:00"
}
```

## Personalización y Extensión

### Agregar nueva herramienta:

```python
# En HerramientasAgente
@staticmethod
def traducir_texto(texto: str, idioma: str) -> Dict:
    # Tu lógica de traducción aquí
    return {"success": True, "traduccion": resultado}

# En MotorRazonamiento.analizar_intencion()
if "traduce" in mensaje_lower:
    return {
        "tipo": "traduccion",
        "accion": "usar_herramienta",
        "parametros": {"herramienta": "traducir_texto", ...}
    }

# En MotorRazonamiento.generar_respuesta()
elif tipo == "traduccion":
    resultado = self.herramientas.traducir_texto(...)
    return f"Traducción: {resultado['traduccion']}"
```

### Integrar LLM real (GPT, Claude):

```python
import anthropic  # o openai

class MotorRazonamiento:
    def __init__(self):
        self.cliente = anthropic.Anthropic(api_key="tu-api-key")

    def generar_respuesta(self, intencion, mensaje):
        # Preparar contexto
        contexto_texto = self._formatear_contexto()

        # Llamar al LLM
        respuesta = self.cliente.messages.create(
            model="claude-3-5-sonnet-20241022",
            messages=[
                {"role": "user", "content": f"{contexto_texto}\n\n{mensaje}"}
            ]
        )

        return respuesta.content[0].text
```

### Agregar memoria a largo plazo (vectorial):

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

class MemoriaVectorial:
    def __init__(self):
        self.vectorstore = Chroma(
            embedding_function=OpenAIEmbeddings()
        )

    def agregar_memoria(self, texto: str):
        self.vectorstore.add_texts([texto])

    def buscar_similar(self, consulta: str, k=5):
        return self.vectorstore.similarity_search(consulta, k=k)
```

## Mejores Prácticas

### 1. Gestión de Memoria
```python
# Limitar tamaño de memoria
memoria = MemoriaConversacional(max_memoria=100)

# Comprimir mensajes viejos
def comprimir_historial_antiguo():
    # Resumir mensajes viejos en lugar de eliminarlos
    pass
```

### 2. Manejo de Errores
```python
try:
    respuesta = agente.procesar_mensaje(mensaje)
except Exception as e:
    logger.error(f"Error procesando: {e}")
    respuesta = "Disculpa, tuve un error. ¿Puedes repetir?"
```

### 3. Privacidad
```python
# No guardar información sensible
def sanitizar_mensaje(mensaje: str) -> str:
    # Eliminar números de tarjetas, contraseñas, etc.
    return mensaje_limpio
```

## Limitaciones

❌ No usa IA real (solo reglas programadas)
❌ Memoria limitada a 50-100 mensajes
❌ Sin comprensión semántica profunda
❌ No aprende de interacciones previas
❌ Sin capacidades de razonamiento complejo

## Llevar a Producción

Para un agente de producción, necesitarías:

1. **LLM real**: GPT-4, Claude, Llama
2. **Memoria vectorial**: Pinecone, Weaviate, ChromaDB
3. **Base de datos**: PostgreSQL para perfiles
4. **Caché**: Redis para respuestas rápidas
5. **Monitoreo**: Logs, métricas, alertas
6. **Seguridad**: Validación, sanitización, rate limiting
7. **Escalabilidad**: Múltiples instancias, load balancer

## Frameworks Recomendados

Si quieres construir agentes profesionales, usa:

- **LangChain**: Framework completo para LLM apps
- **CrewAI**: Multi-agente colaborativo
- **AutoGPT**: Agentes autónomos
- **LlamaIndex**: Para RAG (Retrieval Augmented Generation)

## Ejercicios Propuestos

1. **Memoria emocional**: Detecta el sentimiento del usuario y adáptate
2. **Aprendizaje de preferencias**: Registra lo que le gusta al usuario
3. **Búsqueda semántica**: Implementa búsqueda vectorial en memoria
4. **Multi-idioma**: Detecta y responde en el idioma del usuario
5. **Exportar conversación**: Comando para exportar a PDF/MD
6. **Integración con API real**: Conecta con OpenAI o Anthropic

## Preguntas Frecuentes

**P: ¿Por qué no usar un LLM directamente?**
R: Este ejemplo enseña los fundamentos. Con LLMs, muchos de estos conceptos (memoria, contexto) se manejan automáticamente, pero es importante entender cómo funcionan.

**P: ¿Cuánta memoria es suficiente?**
R: Depende. Para chat casual: 50-100 mensajes. Para soporte técnico: hasta 500. Para memoria a largo plazo: usa vectorstore.

**P: ¿Cómo escalo a miles de usuarios?**
R: Una instancia por usuario, datos en DB centralizada, caché distribuido, y load balancing.

**P: ¿Puedo combinar los 3 ejemplos?**
R: ¡Sí! Podrías tener un agente conversacional que también gestione tareas y consulte clima.

## Conclusión

Has completado los **3 ejemplos de agentes**:

1. **Ejemplo 1**: Fundamentos básicos
2. **Ejemplo 2**: Estado y persistencia
3. **Ejemplo 3**: Memoria y contexto avanzado

Ahora entiendes:
✅ Qué es un agente
✅ Cómo funcionan las herramientas
✅ Gestión de estado y memoria
✅ Razonamiento contextual
✅ Arquitectura de agentes

**Próximos pasos**: Experimenta, modifica, y construye tus propios agentes! 🚀
