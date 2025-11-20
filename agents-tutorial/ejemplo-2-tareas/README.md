# 📝 Ejemplo 2: Agente de Tareas (To-Do List)

## ¿Qué aprenderás?

Este ejemplo te enseña conceptos **intermedios** de agentes:
- Agentes con **estado** (memoria persistente)
- Múltiples herramientas y operaciones
- Procesamiento de lenguaje natural básico
- Persistencia de datos
- Arquitectura por capas

## Diferencias con Ejemplo 1

| Aspecto | Ejemplo 1 (Clima) | Ejemplo 2 (Tareas) |
|---------|-------------------|---------------------|
| **Estado** | Sin estado (stateless) | Con estado (stateful) |
| **Memoria** | No recuerda nada | Recuerda entre sesiones |
| **Herramientas** | 1 tool (obtener clima) | 5 tools (CRUD + stats) |
| **Persistencia** | No hay | Archivo JSON |
| **Complejidad** | Básica | Intermedia |

## Características

✅ **Agente con estado** - Recuerda tareas entre ejecuciones
✅ **Persistencia** - Guarda datos en JSON
✅ **5 herramientas** - Crear, listar, completar, eliminar, estadísticas
✅ **NLP básico** - Entiende comandos en lenguaje natural
✅ **Modo interactivo** - Puedes chatear con el agente

## Estructura del Código

```
agente_tareas.py
│
├── Tarea                    # Modelo de datos
│   ├── to_dict()           # Serialización
│   └── from_dict()         # Deserialización
│
├── GestorTareas            # Herramientas (Tools)
│   ├── crear_tarea()       # TOOL 1
│   ├── listar_tareas()     # TOOL 2
│   ├── completar_tarea()   # TOOL 3
│   ├── eliminar_tarea()    # TOOL 4
│   └── obtener_estadisticas() # TOOL 5
│
├── AgenteTareas            # El agente
│   ├── _interpretar_intencion() # NLP básico
│   ├── _comando_crear()    # Handler comando 1
│   ├── _comando_listar()   # Handler comando 2
│   └── procesar_mensaje()  # Método principal
│
└── main()                  # Interfaz interactiva
```

## Cómo Ejecutar

```bash
# Navega a la carpeta
cd agents-tutorial/ejemplo-2-tareas

# Ejecuta el agente
python agente_tareas.py
```

## Ejemplos de Uso

### Crear tareas
```
👤 Usuario: crear Comprar leche
🤖 Agente: ✅ Tarea creada: 'Comprar leche'

👤 Usuario: agregar Hacer ejercicio
🤖 Agente: ✅ Tarea creada: 'Hacer ejercicio'
```

### Listar tareas
```
👤 Usuario: listar
🤖 Agente:
📋 Lista de Tareas
==================================================
0. ⏳ Comprar leche
1. ⏳ Hacer ejercicio
```

### Completar tareas
```
👤 Usuario: completar 0
🤖 Agente: ✅ Tarea completada: 'Comprar leche'
```

### Ver estadísticas
```
👤 Usuario: estadisticas
🤖 Agente:
📊 Estadísticas de Tareas
==================================================
📝 Total: 2
⏳ Pendientes: 1
✅ Completadas: 1
📈 Progreso: 50.0%
```

## Conceptos Clave

### 1. Estado Persistente

```python
class AgenteTareas:
    def __init__(self):
        self.gestor = GestorTareas()  # Mantiene estado
        self.gestor._cargar_tareas()  # Carga de archivo
```

El agente **recuerda** entre ejecuciones:
- Si cierras el programa y lo vuelves a abrir
- Las tareas que creaste siguen ahí
- El estado se guarda en `tareas.json`

### 2. Múltiples Herramientas

```python
class GestorTareas:
    def crear_tarea(...)      # TOOL 1
    def listar_tareas(...)    # TOOL 2
    def completar_tarea(...)  # TOOL 3
    def eliminar_tarea(...)   # TOOL 4
    def obtener_estadisticas(...) # TOOL 5
```

Cada herramienta es una **capacidad** del agente.

### 3. Interpretación de Intención (NLP Básico)

```python
def _interpretar_intencion(self, mensaje: str):
    # "crear tarea X" → comando: "crear", params: {"titulo": "X"}
    # "mostrar lista" → comando: "listar", params: {}
    # "completar 0"  → comando: "completar", params: {"indice": 0}
```

El agente puede entender:
- Sinónimos: "crear", "agregar", "nueva", "añadir"
- Contexto: extrae parámetros del texto
- Variaciones: "listar pendientes", "mostrar completadas"

### 4. Persistencia de Datos

```python
def _guardar_tareas(self):
    with open(self.archivo_datos, 'w') as f:
        datos = [t.to_dict() for t in self.tareas]
        json.dump(datos, f)
```

Flujo de persistencia:
1. Operación (crear/completar/eliminar)
2. Actualizar memoria (self.tareas)
3. Guardar en disco (JSON)

## Arquitectura por Capas

```
┌─────────────────────────────────────┐
│  INTERFAZ (main)                    │
│  - Entrada del usuario              │
│  - Muestra respuestas               │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  AGENTE (AgenteTareas)              │
│  - Interpreta intenciones           │
│  - Decide qué tool usar             │
│  - Formatea respuestas              │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  HERRAMIENTAS (GestorTareas)        │
│  - Operaciones CRUD                 │
│  - Lógica de negocio                │
│  - Persistencia                     │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  DATOS (Tarea, JSON)                │
│  - Modelos de datos                 │
│  - Serialización                    │
└─────────────────────────────────────┘
```

## Personalización

### Agregar nuevas herramientas:

```python
# En GestorTareas
def buscar_tareas(self, palabra_clave: str) -> List[Tarea]:
    return [t for t in self.tareas if palabra_clave in t.titulo.lower()]

# En AgenteTareas
def _comando_buscar(self, params: Dict) -> str:
    palabra = params.get("palabra", "")
    resultados = self.gestor.buscar_tareas(palabra)
    # ... formatear respuesta

# Registrar comando
self.comandos["buscar"] = self._comando_buscar
```

### Agregar prioridades:

```python
# Al crear tarea
"crear Estudiar Python prioridad 5"

# En _interpretar_intencion
if "prioridad" in mensaje_lower:
    # extraer número de prioridad
    params["prioridad"] = numero_extraido
```

### Conectar a base de datos:

```python
# En lugar de JSON, usar SQLite
import sqlite3

class GestorTareas:
    def __init__(self):
        self.conn = sqlite3.connect('tareas.db')
        self._crear_tabla()
```

## Flujo de una Operación Completa

```
Usuario escribe: "crear Comprar leche"
              ↓
AgenteTareas.procesar_mensaje()
              ↓
_interpretar_intencion()
    → comando: "crear"
    → params: {"titulo": "Comprar leche"}
              ↓
_comando_crear(params)
              ↓
GestorTareas.crear_tarea("Comprar leche")
    → Crea objeto Tarea
    → Agrega a self.tareas
    → Llama _guardar_tareas()
              ↓
_guardar_tareas()
    → Serializa todas las tareas
    → Escribe JSON en disco
              ↓
Retorna: {"success": True, "mensaje": "✅ Tarea creada"}
              ↓
Agente formatea y retorna mensaje al usuario
```

## Ventajas de Esta Arquitectura

✅ **Modular**: Cada capa tiene una responsabilidad
✅ **Testeable**: Puedes probar cada componente por separado
✅ **Extensible**: Fácil agregar nuevas herramientas
✅ **Mantenible**: Código organizado y claro

## Limitaciones

❌ No tiene conversación contextual (solo comandos directos)
❌ NLP muy básico (no usa IA real)
❌ No maneja tareas complejas con subtareas
❌ Sin colaboración entre múltiples agentes

## Próximo Paso

👉 **Ejemplo 3: Agente Conversacional con Memoria**

En el siguiente ejemplo aprenderás:
- Memoria conversacional completa
- Contexto entre múltiples interacciones
- Razonamiento más avanzado
- Integración con LLMs (opcional)

## Preguntas Frecuentes

**P: ¿Por qué usar JSON en lugar de base de datos?**
R: Para mantener el ejemplo simple. En producción, usa SQLite, PostgreSQL, etc.

**P: ¿El NLP es suficiente para producción?**
R: No, este es NLP básico educativo. Para producción usa spaCy, transformers, o LLMs.

**P: ¿Cómo escalo esto a miles de tareas?**
R: Usa base de datos con índices, paginación, y caché en memoria.

**P: ¿Puedo agregar usuarios múltiples?**
R: Sí, agrega un campo `usuario_id` a las tareas y filtra por usuario.

## Ejercicios Propuestos

1. **Agregar fechas límite**: Modifica `Tarea` para incluir `fecha_limite`
2. **Notificaciones**: Agrega alertas para tareas próximas a vencer
3. **Categorías**: Permite organizar tareas por categorías
4. **Búsqueda**: Implementa búsqueda por palabras clave
5. **Exportar**: Agrega comando para exportar tareas a CSV
