"""
EJEMPLO 2: AGENTE DE TAREAS (TO-DO LIST) 📝

Este agente es más avanzado que el Ejemplo 1 porque:
- Tiene ESTADO: recuerda tareas entre interacciones
- Múltiples herramientas: crear, listar, completar, eliminar
- Persistencia: guarda datos en archivo JSON
- Interpreta intención del usuario

Conceptos nuevos:
- Stateful Agent (agente con estado)
- Persistencia de datos
- Múltiples tools
- Procesamiento de lenguaje natural básico
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Any, Optional
from enum import Enum


# ============================================
# PASO 1: DEFINIR ESTRUCTURA DE DATOS
# ============================================

class EstadoTarea(Enum):
    """Estados posibles de una tarea."""
    PENDIENTE = "pendiente"
    EN_PROGRESO = "en_progreso"
    COMPLETADA = "completada"


class Tarea:
    """
    Representa una tarea individual.
    Esta es la estructura de datos que el agente manipula.
    """

    def __init__(self, titulo: str, descripcion: str = "", prioridad: int = 1):
        self.id = self._generar_id()
        self.titulo = titulo
        self.descripcion = descripcion
        self.prioridad = prioridad  # 1 (baja) a 5 (alta)
        self.estado = EstadoTarea.PENDIENTE
        self.fecha_creacion = datetime.now().isoformat()
        self.fecha_completada = None

    def _generar_id(self) -> str:
        """Genera un ID único basado en timestamp."""
        return f"tarea_{datetime.now().timestamp()}"

    def completar(self):
        """Marca la tarea como completada."""
        self.estado = EstadoTarea.COMPLETADA
        self.fecha_completada = datetime.now().isoformat()

    def to_dict(self) -> Dict:
        """Convierte la tarea a diccionario para serialización."""
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion,
            "prioridad": self.prioridad,
            "estado": self.estado.value,
            "fecha_creacion": self.fecha_creacion,
            "fecha_completada": self.fecha_completada
        }

    @staticmethod
    def from_dict(data: Dict) -> 'Tarea':
        """Crea una tarea desde un diccionario."""
        tarea = Tarea(data["titulo"], data["descripcion"], data["prioridad"])
        tarea.id = data["id"]
        tarea.estado = EstadoTarea(data["estado"])
        tarea.fecha_creacion = data["fecha_creacion"]
        tarea.fecha_completada = data.get("fecha_completada")
        return tarea


# ============================================
# PASO 2: DEFINIR HERRAMIENTAS (TOOLS)
# ============================================

class GestorTareas:
    """
    Herramientas para gestionar tareas.
    Cada método es una herramienta que el agente puede usar.
    """

    def __init__(self, archivo_datos: str = "tareas.json"):
        self.archivo_datos = archivo_datos
        self.tareas: List[Tarea] = []
        self._cargar_tareas()

    def _cargar_tareas(self):
        """Carga tareas desde archivo JSON."""
        if os.path.exists(self.archivo_datos):
            try:
                with open(self.archivo_datos, 'r', encoding='utf-8') as f:
                    datos = json.load(f)
                    self.tareas = [Tarea.from_dict(t) for t in datos]
            except Exception as e:
                print(f"Error cargando tareas: {e}")
                self.tareas = []

    def _guardar_tareas(self):
        """Guarda tareas en archivo JSON."""
        try:
            with open(self.archivo_datos, 'w', encoding='utf-8') as f:
                datos = [t.to_dict() for t in self.tareas]
                json.dump(datos, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error guardando tareas: {e}")

    # TOOL 1: Crear tarea
    def crear_tarea(self, titulo: str, descripcion: str = "", prioridad: int = 1) -> Dict:
        """Crea una nueva tarea."""
        tarea = Tarea(titulo, descripcion, prioridad)
        self.tareas.append(tarea)
        self._guardar_tareas()
        return {
            "success": True,
            "mensaje": f"✅ Tarea creada: '{titulo}'",
            "tarea_id": tarea.id
        }

    # TOOL 2: Listar tareas
    def listar_tareas(self, filtro: Optional[EstadoTarea] = None) -> List[Tarea]:
        """Lista todas las tareas, opcionalmente filtradas por estado."""
        if filtro:
            return [t for t in self.tareas if t.estado == filtro]
        return self.tareas

    # TOOL 3: Completar tarea
    def completar_tarea(self, tarea_id: str = None, indice: int = None) -> Dict:
        """Marca una tarea como completada."""
        tarea = None

        if tarea_id:
            tarea = next((t for t in self.tareas if t.id == tarea_id), None)
        elif indice is not None and 0 <= indice < len(self.tareas):
            tarea = self.tareas[indice]

        if tarea:
            tarea.completar()
            self._guardar_tareas()
            return {
                "success": True,
                "mensaje": f"✅ Tarea completada: '{tarea.titulo}'"
            }
        else:
            return {
                "success": False,
                "mensaje": "❌ Tarea no encontrada"
            }

    # TOOL 4: Eliminar tarea
    def eliminar_tarea(self, tarea_id: str = None, indice: int = None) -> Dict:
        """Elimina una tarea."""
        tarea = None

        if tarea_id:
            tarea = next((t for t in self.tareas if t.id == tarea_id), None)
        elif indice is not None and 0 <= indice < len(self.tareas):
            tarea = self.tareas[indice]

        if tarea:
            self.tareas.remove(tarea)
            self._guardar_tareas()
            return {
                "success": True,
                "mensaje": f"🗑️  Tarea eliminada: '{tarea.titulo}'"
            }
        else:
            return {
                "success": False,
                "mensaje": "❌ Tarea no encontrada"
            }

    # TOOL 5: Obtener estadísticas
    def obtener_estadisticas(self) -> Dict:
        """Obtiene estadísticas de las tareas."""
        total = len(self.tareas)
        pendientes = len([t for t in self.tareas if t.estado == EstadoTarea.PENDIENTE])
        en_progreso = len([t for t in self.tareas if t.estado == EstadoTarea.EN_PROGRESO])
        completadas = len([t for t in self.tareas if t.estado == EstadoTarea.COMPLETADA])

        return {
            "total": total,
            "pendientes": pendientes,
            "en_progreso": en_progreso,
            "completadas": completadas,
            "porcentaje_completado": (completadas / total * 100) if total > 0 else 0
        }


# ============================================
# PASO 3: DEFINIR EL AGENTE
# ============================================

class AgenteTareas:
    """
    Agente inteligente para gestionar tareas.

    Este agente es STATEFUL (con estado):
    - Mantiene una lista de tareas en memoria
    - Persiste datos entre ejecuciones
    - Recuerda el contexto de operaciones anteriores
    """

    def __init__(self, archivo_datos: str = "tareas.json"):
        """Inicializa el agente con sus herramientas."""
        self.gestor = GestorTareas(archivo_datos)
        self.nombre = "Asistente de Tareas"
        self.comandos = {
            "crear": self._comando_crear,
            "listar": self._comando_listar,
            "completar": self._comando_completar,
            "eliminar": self._comando_eliminar,
            "estadisticas": self._comando_estadisticas,
            "ayuda": self._comando_ayuda,
        }

    def _interpretar_intencion(self, mensaje: str) -> tuple[str, Dict]:
        """
        Interpreta la intención del usuario.
        Esta es una versión simple de NLP (procesamiento de lenguaje natural).
        """
        mensaje_lower = mensaje.lower().strip()

        # Detectar comando de crear
        if any(palabra in mensaje_lower for palabra in ["crear", "agregar", "nueva", "añadir"]):
            # Extraer el título después del comando
            for palabra_clave in ["crear", "agregar", "nueva", "añadir"]:
                if palabra_clave in mensaje_lower:
                    titulo = mensaje_lower.split(palabra_clave, 1)[1].strip()
                    return "crear", {"titulo": titulo}

        # Detectar comando de listar
        if any(palabra in mensaje_lower for palabra in ["listar", "mostrar", "ver", "lista"]):
            if "pendientes" in mensaje_lower:
                return "listar", {"filtro": EstadoTarea.PENDIENTE}
            elif "completadas" in mensaje_lower:
                return "listar", {"filtro": EstadoTarea.COMPLETADA}
            return "listar", {}

        # Detectar comando de completar
        if any(palabra in mensaje_lower for palabra in ["completar", "terminar", "hecho"]):
            # Intentar extraer número
            palabras = mensaje_lower.split()
            for palabra in palabras:
                if palabra.isdigit():
                    return "completar", {"indice": int(palabra)}
            return "completar", {}

        # Detectar comando de eliminar
        if any(palabra in mensaje_lower for palabra in ["eliminar", "borrar", "quitar"]):
            palabras = mensaje_lower.split()
            for palabra in palabras:
                if palabra.isdigit():
                    return "eliminar", {"indice": int(palabra)}
            return "eliminar", {}

        # Detectar comando de estadísticas
        if any(palabra in mensaje_lower for palabra in ["estadisticas", "estadísticas", "resumen", "progreso"]):
            return "estadisticas", {}

        # Detectar ayuda
        if any(palabra in mensaje_lower for palabra in ["ayuda", "help", "comandos"]):
            return "ayuda", {}

        return "desconocido", {}

    # Comandos del agente
    def _comando_crear(self, params: Dict) -> str:
        """Ejecuta el comando de crear tarea."""
        titulo = params.get("titulo", "").strip()
        if not titulo:
            return "❌ Por favor especifica un título para la tarea.\nEjemplo: 'crear Comprar leche'"

        resultado = self.gestor.crear_tarea(titulo)
        return resultado["mensaje"]

    def _comando_listar(self, params: Dict) -> str:
        """Ejecuta el comando de listar tareas."""
        filtro = params.get("filtro")
        tareas = self.gestor.listar_tareas(filtro)

        if not tareas:
            return "📭 No hay tareas en la lista."

        respuesta = "\n📋 Lista de Tareas\n" + "="*50 + "\n"
        for i, tarea in enumerate(tareas):
            icono = "✅" if tarea.estado == EstadoTarea.COMPLETADA else "⏳"
            prioridad_texto = "⭐" * tarea.prioridad
            respuesta += f"\n{i}. {icono} {tarea.titulo}"
            if tarea.prioridad > 1:
                respuesta += f" {prioridad_texto}"
            if tarea.descripcion:
                respuesta += f"\n   📝 {tarea.descripcion}"
            respuesta += "\n"

        return respuesta

    def _comando_completar(self, params: Dict) -> str:
        """Ejecuta el comando de completar tarea."""
        indice = params.get("indice")
        if indice is None:
            return "❌ Especifica el número de la tarea.\nEjemplo: 'completar 0'"

        resultado = self.gestor.completar_tarea(indice=indice)
        return resultado["mensaje"]

    def _comando_eliminar(self, params: Dict) -> str:
        """Ejecuta el comando de eliminar tarea."""
        indice = params.get("indice")
        if indice is None:
            return "❌ Especifica el número de la tarea.\nEjemplo: 'eliminar 0'"

        resultado = self.gestor.eliminar_tarea(indice=indice)
        return resultado["mensaje"]

    def _comando_estadisticas(self, params: Dict) -> str:
        """Ejecuta el comando de estadísticas."""
        stats = self.gestor.obtener_estadisticas()
        return f"""
📊 Estadísticas de Tareas
{'='*50}
📝 Total: {stats['total']}
⏳ Pendientes: {stats['pendientes']}
🔄 En progreso: {stats['en_progreso']}
✅ Completadas: {stats['completadas']}
📈 Progreso: {stats['porcentaje_completado']:.1f}%
        """

    def _comando_ayuda(self, params: Dict) -> str:
        """Muestra ayuda de comandos."""
        return """
🤖 Comandos Disponibles
{'='*50}

📝 Crear tarea:
   - "crear [título]"
   - "agregar [título]"
   Ejemplo: "crear Comprar leche"

📋 Listar tareas:
   - "listar"
   - "mostrar tareas"
   - "listar pendientes"

✅ Completar tarea:
   - "completar [número]"
   - "terminar [número]"
   Ejemplo: "completar 0"

🗑️  Eliminar tarea:
   - "eliminar [número]"
   - "borrar [número]"

📊 Estadísticas:
   - "estadisticas"
   - "resumen"

❓ Ayuda:
   - "ayuda"
        """

    def procesar_mensaje(self, mensaje: str) -> str:
        """
        Método principal del agente.

        Ciclo de procesamiento:
        1. Recibe mensaje del usuario
        2. Interpreta la intención (NLP básico)
        3. Ejecuta el comando apropiado
        4. Retorna respuesta

        Args:
            mensaje: Mensaje del usuario

        Returns:
            Respuesta del agente
        """
        # Interpretar intención
        comando, params = self._interpretar_intencion(mensaje)

        # Ejecutar comando
        if comando in self.comandos:
            return self.comandos[comando](params)
        else:
            return f"❌ No entendí el comando. Escribe 'ayuda' para ver los comandos disponibles."


# ============================================
# PASO 4: INTERFAZ INTERACTIVA
# ============================================

def main():
    """
    Función principal con interfaz interactiva.
    """
    print("="*60)
    print("📝 AGENTE DE TAREAS - EJEMPLO 2")
    print("="*60)
    print("\nEste agente puede:")
    print("  • Crear y gestionar tareas")
    print("  • Recordar tareas entre sesiones")
    print("  • Entender lenguaje natural básico")
    print("\nEscribe 'ayuda' para ver todos los comandos")
    print("Escribe 'salir' para terminar")
    print("="*60)

    # Crear agente
    agente = AgenteTareas()

    # Demostración automática
    print("\n🎯 DEMOSTRACIÓN AUTOMÁTICA:\n")

    demos = [
        "crear Comprar leche",
        "crear Hacer ejercicio",
        "crear Estudiar Python",
        "listar",
        "completar 0",
        "listar",
        "estadisticas",
    ]

    for demo in demos:
        print(f"\n👤 Usuario: {demo}")
        respuesta = agente.procesar_mensaje(demo)
        print(f"🤖 Agente: {respuesta}")

    # Modo interactivo
    print("\n" + "="*60)
    print("💬 MODO INTERACTIVO (escribe tus propios comandos)")
    print("="*60)

    while True:
        try:
            mensaje = input("\n👤 Tú: ").strip()

            if not mensaje:
                continue

            if mensaje.lower() in ["salir", "exit", "quit"]:
                print("\n👋 ¡Hasta luego!")
                break

            respuesta = agente.procesar_mensaje(mensaje)
            print(f"🤖 Agente: {respuesta}")

        except KeyboardInterrupt:
            print("\n\n👋 ¡Hasta luego!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")


# ============================================
# CONCEPTOS CLAVE APRENDIDOS
# ============================================
"""
✅ AGENTE CON ESTADO (Stateful):
   - Mantiene datos en memoria (self.tareas)
   - Persiste entre sesiones (archivo JSON)
   - Recuerda el contexto

✅ MÚLTIPLES HERRAMIENTAS:
   - Crear, listar, completar, eliminar
   - Cada tool tiene una responsabilidad específica
   - El agente decide cuál usar

✅ INTERPRETACIÓN DE INTENCIÓN:
   - NLP básico para entender comandos
   - Mapeo de sinónimos ("crear", "agregar", "nueva")
   - Extracción de parámetros del texto

✅ PERSISTENCIA:
   - Datos guardados en JSON
   - Carga automática al iniciar
   - Guarda después de cada cambio

✅ ARQUITECTURA MÁS ROBUSTA:
   - Separación de capas (Datos, Tools, Agente, UI)
   - Manejo de errores
   - Validaciones

DIFERENCIAS CON EJEMPLO 1:
   Ejemplo 1: Sin estado, una herramienta, respuesta simple
   Ejemplo 2: Con estado, múltiples herramientas, persistencia

PRÓXIMO NIVEL: En el Ejemplo 3 veremos un agente con memoria
conversacional que puede mantener contexto complejo.
"""


if __name__ == "__main__":
    main()
