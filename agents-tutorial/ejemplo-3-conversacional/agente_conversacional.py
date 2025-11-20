"""
EJEMPLO 3: AGENTE CONVERSACIONAL CON MEMORIA 💬

Este es el agente más avanzado de los tres ejemplos:
- Memoria conversacional completa
- Mantiene contexto entre mensajes
- Múltiples herramientas integradas
- Razonamiento basado en historial
- Personalización del usuario

Conceptos avanzados:
- Memoria conversacional
- Gestión de contexto
- Ventana de memoria (memory window)
- Perfil de usuario
- Multi-turn conversations
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Any, Optional
from collections import deque


# ============================================
# PASO 1: SISTEMA DE MEMORIA
# ============================================

class Mensaje:
    """Representa un mensaje en la conversación."""

    def __init__(self, rol: str, contenido: str, timestamp: str = None):
        self.rol = rol  # "usuario" o "agente"
        self.contenido = contenido
        self.timestamp = timestamp or datetime.now().isoformat()

    def to_dict(self) -> Dict:
        return {
            "rol": self.rol,
            "contenido": self.contenido,
            "timestamp": self.timestamp
        }

    @staticmethod
    def from_dict(data: Dict) -> 'Mensaje':
        return Mensaje(data["rol"], data["contenido"], data["timestamp"])


class MemoriaConversacional:
    """
    Gestiona la memoria del agente.

    Características:
    - Historial completo de conversaciones
    - Ventana de memoria (últimos N mensajes)
    - Persistencia en disco
    - Búsqueda en historial
    """

    def __init__(self, max_memoria: int = 50, archivo: str = "memoria.json"):
        self.max_memoria = max_memoria  # Máximo de mensajes a recordar
        self.historial: deque = deque(maxlen=max_memoria)
        self.archivo = archivo
        self._cargar_memoria()

    def agregar_mensaje(self, rol: str, contenido: str):
        """Agrega un mensaje a la memoria."""
        mensaje = Mensaje(rol, contenido)
        self.historial.append(mensaje)
        self._guardar_memoria()

    def obtener_contexto(self, ultimos_n: int = 10) -> List[Mensaje]:
        """
        Obtiene los últimos N mensajes para contexto.
        Esto es lo que el agente "recuerda" al responder.
        """
        return list(self.historial)[-ultimos_n:]

    def obtener_historial_completo(self) -> List[Mensaje]:
        """Obtiene todo el historial."""
        return list(self.historial)

    def buscar_en_historial(self, palabra_clave: str) -> List[Mensaje]:
        """Busca mensajes que contengan una palabra clave."""
        return [
            m for m in self.historial
            if palabra_clave.lower() in m.contenido.lower()
        ]

    def limpiar_memoria(self):
        """Limpia toda la memoria."""
        self.historial.clear()
        self._guardar_memoria()

    def _cargar_memoria(self):
        """Carga memoria desde archivo."""
        if os.path.exists(self.archivo):
            try:
                with open(self.archivo, 'r', encoding='utf-8') as f:
                    datos = json.load(f)
                    for msg_dict in datos:
                        mensaje = Mensaje.from_dict(msg_dict)
                        self.historial.append(mensaje)
            except Exception as e:
                print(f"Error cargando memoria: {e}")

    def _guardar_memoria(self):
        """Guarda memoria en archivo."""
        try:
            with open(self.archivo, 'w', encoding='utf-8') as f:
                datos = [m.to_dict() for m in self.historial]
                json.dump(datos, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error guardando memoria: {e}")


# ============================================
# PASO 2: PERFIL DE USUARIO
# ============================================

class PerfilUsuario:
    """
    Almacena información sobre el usuario.
    Permite personalizar las respuestas.
    """

    def __init__(self, archivo: str = "perfil_usuario.json"):
        self.archivo = archivo
        self.datos = {
            "nombre": None,
            "preferencias": {},
            "intereses": [],
            "interacciones_totales": 0,
            "primera_interaccion": None,
            "ultima_interaccion": None
        }
        self._cargar_perfil()

    def actualizar(self, clave: str, valor: Any):
        """Actualiza un dato del perfil."""
        self.datos[clave] = valor
        self._guardar_perfil()

    def agregar_interes(self, interes: str):
        """Agrega un interés del usuario."""
        if interes not in self.datos["intereses"]:
            self.datos["intereses"].append(interes)
            self._guardar_perfil()

    def incrementar_interacciones(self):
        """Incrementa el contador de interacciones."""
        self.datos["interacciones_totales"] += 1
        self.datos["ultima_interaccion"] = datetime.now().isoformat()
        if not self.datos["primera_interaccion"]:
            self.datos["primera_interaccion"] = self.datos["ultima_interaccion"]
        self._guardar_perfil()

    def obtener(self, clave: str, default=None):
        """Obtiene un dato del perfil."""
        return self.datos.get(clave, default)

    def _cargar_perfil(self):
        """Carga perfil desde archivo."""
        if os.path.exists(self.archivo):
            try:
                with open(self.archivo, 'r', encoding='utf-8') as f:
                    self.datos = json.load(f)
            except Exception as e:
                print(f"Error cargando perfil: {e}")

    def _guardar_perfil(self):
        """Guarda perfil en archivo."""
        try:
            with open(self.archivo, 'w', encoding='utf-8') as f:
                json.dump(self.datos, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error guardando perfil: {e}")


# ============================================
# PASO 3: HERRAMIENTAS DEL AGENTE
# ============================================

class HerramientasAgente:
    """
    Colección de herramientas que el agente puede usar.
    """

    @staticmethod
    def calcular(expresion: str) -> Dict[str, Any]:
        """Herramienta para calcular expresiones matemáticas."""
        try:
            # NOTA: En producción, usa un parser seguro como ast.literal_eval
            resultado = eval(expresion)
            return {
                "success": True,
                "resultado": resultado,
                "expresion": expresion
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    @staticmethod
    def contar_palabras(texto: str) -> Dict[str, Any]:
        """Cuenta palabras en un texto."""
        palabras = texto.split()
        return {
            "success": True,
            "total_palabras": len(palabras),
            "total_caracteres": len(texto),
            "palabras_unicas": len(set(palabras))
        }

    @staticmethod
    def obtener_fecha_hora() -> Dict[str, Any]:
        """Obtiene la fecha y hora actual."""
        now = datetime.now()
        return {
            "success": True,
            "fecha": now.strftime("%Y-%m-%d"),
            "hora": now.strftime("%H:%M:%S"),
            "dia_semana": now.strftime("%A"),
            "timestamp": now.isoformat()
        }

    @staticmethod
    def generar_resumen_estadisticas(memoria: MemoriaConversacional) -> Dict[str, Any]:
        """Genera estadísticas de la conversación."""
        historial = memoria.obtener_historial_completo()
        mensajes_usuario = [m for m in historial if m.rol == "usuario"]
        mensajes_agente = [m for m in historial if m.rol == "agente"]

        return {
            "success": True,
            "total_mensajes": len(historial),
            "mensajes_usuario": len(mensajes_usuario),
            "mensajes_agente": len(mensajes_agente),
            "primera_interaccion": historial[0].timestamp if historial else None,
            "ultima_interaccion": historial[-1].timestamp if historial else None
        }


# ============================================
# PASO 4: MOTOR DE RAZONAMIENTO
# ============================================

class MotorRazonamiento:
    """
    El "cerebro" del agente.
    Decide qué hacer basándose en el contexto y la memoria.
    """

    def __init__(self, memoria: MemoriaConversacional, perfil: PerfilUsuario):
        self.memoria = memoria
        self.perfil = perfil
        self.herramientas = HerramientasAgente()

    def analizar_intencion(self, mensaje: str, contexto: List[Mensaje]) -> Dict[str, Any]:
        """
        Analiza la intención del usuario basándose en el mensaje y contexto.

        Retorna:
            {
                "tipo": "saludo" | "pregunta" | "calculo" | "info_personal" | "otro",
                "accion": "responder" | "usar_herramienta" | "actualizar_perfil",
                "parametros": {...}
            }
        """
        mensaje_lower = mensaje.lower().strip()

        # Detectar saludo
        if any(palabra in mensaje_lower for palabra in ["hola", "buenos días", "buenas tardes", "hey"]):
            # Verificar si es primera vez
            if self.perfil.obtener("interacciones_totales") == 0:
                return {"tipo": "saludo_inicial", "accion": "presentarse"}
            else:
                return {"tipo": "saludo", "accion": "saludar"}

        # Detectar presentación del usuario
        if any(frase in mensaje_lower for frase in ["me llamo", "mi nombre es", "soy"]):
            # Extraer nombre
            for frase in ["me llamo", "mi nombre es", "soy"]:
                if frase in mensaje_lower:
                    nombre = mensaje_lower.split(frase)[1].strip().split()[0]
                    return {
                        "tipo": "presentacion",
                        "accion": "actualizar_perfil",
                        "parametros": {"nombre": nombre.capitalize()}
                    }

        # Detectar cálculos
        if any(palabra in mensaje_lower for palabra in ["calcula", "cuanto es", "suma", "resta", "multiplica"]):
            # Extraer expresión
            for palabra in ["calcula", "cuanto es"]:
                if palabra in mensaje_lower:
                    expresion = mensaje_lower.split(palabra)[1].strip()
                    # Limpiar la expresión
                    expresion = expresion.replace("?", "").strip()
                    return {
                        "tipo": "calculo",
                        "accion": "usar_herramienta",
                        "parametros": {"herramienta": "calcular", "expresion": expresion}
                    }

        # Detectar solicitud de fecha/hora
        if any(palabra in mensaje_lower for palabra in ["que hora", "que dia", "fecha", "hora"]):
            return {
                "tipo": "fecha_hora",
                "accion": "usar_herramienta",
                "parametros": {"herramienta": "obtener_fecha_hora"}
            }

        # Detectar solicitud de estadísticas
        if any(palabra in mensaje_lower for palabra in ["estadisticas", "resumen", "cuantos mensajes"]):
            return {
                "tipo": "estadisticas",
                "accion": "usar_herramienta",
                "parametros": {"herramienta": "generar_resumen_estadisticas"}
            }

        # Detectar pregunta sobre conversación pasada
        if any(palabra in mensaje_lower for palabra in ["dijiste", "mencionaste", "hablamos de"]):
            return {
                "tipo": "recordar",
                "accion": "buscar_en_memoria",
                "parametros": {"mensaje": mensaje}
            }

        # Detectar solicitud de olvido
        if any(frase in mensaje_lower for frase in ["olvida", "borra la memoria", "reinicia"]):
            return {
                "tipo": "olvido",
                "accion": "limpiar_memoria"
            }

        # Conversación general
        return {
            "tipo": "conversacion_general",
            "accion": "responder_contextualmente"
        }

    def generar_respuesta(self, intencion: Dict[str, Any], mensaje: str) -> str:
        """
        Genera una respuesta basándose en la intención detectada.
        """
        tipo = intencion["tipo"]
        accion = intencion["accion"]

        # Saludo inicial
        if tipo == "saludo_inicial":
            return """¡Hola! 👋 Soy un agente conversacional con memoria.

Puedo:
  • Recordar nuestra conversación
  • Realizar cálculos
  • Darte la fecha y hora
  • Mostrar estadísticas de nuestra charla
  • Y mucho más...

¿Cómo te llamas?"""

        # Saludo regular
        elif tipo == "saludo":
            nombre = self.perfil.obtener("nombre")
            if nombre:
                return f"¡Hola de nuevo, {nombre}! 😊 ¿En qué puedo ayudarte hoy?"
            else:
                return "¡Hola! 😊 ¿En qué puedo ayudarte?"

        # Presentación
        elif tipo == "presentacion":
            nombre = intencion["parametros"]["nombre"]
            self.perfil.actualizar("nombre", nombre)
            return f"¡Encantado de conocerte, {nombre}! 🎉 Recordaré tu nombre para futuras conversaciones."

        # Cálculo
        elif tipo == "calculo":
            expresion = intencion["parametros"]["expresion"]
            resultado = self.herramientas.calcular(expresion)
            if resultado["success"]:
                return f"🧮 El resultado de '{expresion}' es: **{resultado['resultado']}**"
            else:
                return f"❌ No pude calcular eso. Error: {resultado['error']}"

        # Fecha/Hora
        elif tipo == "fecha_hora":
            info = self.herramientas.obtener_fecha_hora()
            return f"""📅 **Fecha:** {info['fecha']}
🕐 **Hora:** {info['hora']}
📆 **Día:** {info['dia_semana']}"""

        # Estadísticas
        elif tipo == "estadisticas":
            stats = self.herramientas.generar_resumen_estadisticas(self.memoria)
            return f"""📊 **Estadísticas de nuestra conversación:**

💬 Total de mensajes: {stats['total_mensajes']}
👤 Tus mensajes: {stats['mensajes_usuario']}
🤖 Mis mensajes: {stats['mensajes_agente']}
📅 Primera interacción: {stats['primera_interaccion'][:10] if stats['primera_interaccion'] else 'N/A'}"""

        # Recordar
        elif tipo == "recordar":
            # Buscar en historial
            contexto = self.memoria.obtener_contexto(ultimos_n=20)
            mensajes_relevantes = [m for m in contexto if len(m.contenido) > 10]
            if mensajes_relevantes:
                ultimo_relevante = mensajes_relevantes[-2].contenido if len(mensajes_relevantes) > 1 else mensajes_relevantes[0].contenido
                return f"🧠 Recuerdo que hablamos sobre: '{ultimo_relevante}'"
            else:
                return "🤔 No encuentro esa información en mi memoria reciente."

        # Olvido
        elif tipo == "olvido":
            self.memoria.limpiar_memoria()
            return "🗑️ He limpiado mi memoria. Empecemos de nuevo."

        # Conversación general
        else:
            # Usar contexto para responder
            contexto = self.memoria.obtener_contexto(ultimos_n=5)
            nombre = self.perfil.obtener("nombre")

            # Respuesta contextual básica
            respuestas = [
                f"Interesante, {nombre}. Cuéntame más." if nombre else "Interesante. Cuéntame más.",
                "Entiendo. ¿Hay algo específico en lo que pueda ayudarte?",
                "He tomado nota de eso. 📝",
                "Perfecto. ¿Algo más que quieras compartir?",
            ]

            import random
            return random.choice(respuestas)


# ============================================
# PASO 5: EL AGENTE PRINCIPAL
# ============================================

class AgenteConversacional:
    """
    Agente conversacional completo con memoria y contexto.

    Este es el agente más avanzado de los tres ejemplos.
    """

    def __init__(self):
        self.nombre = "Agente Conversacional"
        self.memoria = MemoriaConversacional(max_memoria=100)
        self.perfil = PerfilUsuario()
        self.motor = MotorRazonamiento(self.memoria, self.perfil)

    def procesar_mensaje(self, mensaje: str) -> str:
        """
        Procesa un mensaje del usuario.

        Flujo completo:
        1. Agregar mensaje a memoria
        2. Obtener contexto relevante
        3. Analizar intención
        4. Generar respuesta
        5. Guardar respuesta en memoria
        6. Actualizar perfil
        """
        # Paso 1: Guardar mensaje del usuario
        self.memoria.agregar_mensaje("usuario", mensaje)

        # Paso 2: Obtener contexto
        contexto = self.memoria.obtener_contexto(ultimos_n=10)

        # Paso 3: Analizar intención
        intencion = self.motor.analizar_intencion(mensaje, contexto)

        # Paso 4: Generar respuesta
        respuesta = self.motor.generar_respuesta(intencion, mensaje)

        # Paso 5: Guardar respuesta
        self.memoria.agregar_mensaje("agente", respuesta)

        # Paso 6: Actualizar estadísticas
        self.perfil.incrementar_interacciones()

        return respuesta

    def obtener_resumen_sesion(self) -> str:
        """Obtiene un resumen de la sesión actual."""
        stats = self.motor.herramientas.generar_resumen_estadisticas(self.memoria)
        nombre = self.perfil.obtener("nombre", "Usuario")

        return f"""
╔══════════════════════════════════════════╗
║       RESUMEN DE LA SESIÓN               ║
╚══════════════════════════════════════════╝

👤 Usuario: {nombre}
💬 Total mensajes: {stats['total_mensajes']}
🔢 Interacciones totales: {self.perfil.obtener('interacciones_totales')}
📅 Primera vez: {self.perfil.obtener('primera_interaccion', 'N/A')[:10]}
"""


# ============================================
# PASO 6: INTERFAZ INTERACTIVA
# ============================================

def main():
    """Función principal con chat interactivo."""
    print("="*60)
    print("💬 AGENTE CONVERSACIONAL CON MEMORIA - EJEMPLO 3")
    print("="*60)
    print("\nEste agente:")
    print("  • Recuerda toda la conversación")
    print("  • Mantiene tu perfil de usuario")
    print("  • Usa contexto para responder")
    print("  • Tiene múltiples herramientas")
    print("\nEscribe 'salir' para terminar")
    print("="*60)

    agente = AgenteConversacional()

    # Si hay historial, mostrar resumen
    if agente.perfil.obtener("interacciones_totales", 0) > 0:
        print("\n📜 Detecté conversaciones anteriores...")
        print(agente.obtener_resumen_sesion())

    print("\n💬 Empieza a chatear:\n")

    while True:
        try:
            mensaje = input("👤 Tú: ").strip()

            if not mensaje:
                continue

            if mensaje.lower() in ["salir", "exit", "quit", "adios"]:
                print(f"\n🤖 Agente: ¡Hasta luego! Recordaré nuestra conversación. 👋")
                print(agente.obtener_resumen_sesion())
                break

            respuesta = agente.procesar_mensaje(mensaje)
            print(f"🤖 Agente: {respuesta}\n")

        except KeyboardInterrupt:
            print(f"\n\n🤖 Agente: ¡Hasta luego!")
            print(agente.obtener_resumen_sesion())
            break
        except Exception as e:
            print(f"\n❌ Error: {e}\n")


# ============================================
# CONCEPTOS CLAVE APRENDIDOS
# ============================================
"""
✅ MEMORIA CONVERSACIONAL:
   - Historial completo de mensajes
   - Ventana de contexto (últimos N mensajes)
   - Persistencia entre sesiones
   - Búsqueda en historial

✅ PERFIL DE USUARIO:
   - Información personalizada
   - Preferencias y ajustes
   - Estadísticas de uso
   - Personalización de respuestas

✅ MOTOR DE RAZONAMIENTO:
   - Análisis de intención contextual
   - Decisiones basadas en historial
   - Múltiples estrategias de respuesta
   - Uso inteligente de herramientas

✅ CONVERSACIONES MULTI-TURN:
   - El agente recuerda mensajes anteriores
   - Puede hacer referencias al pasado
   - Mantiene coherencia conversacional
   - Contexto fluye entre mensajes

✅ ARQUITECTURA COMPLETA:
   - Separación de responsabilidades
   - Módulos independientes
   - Escalable y mantenible
   - Fácil de extender

COMPARACIÓN CON EJEMPLOS ANTERIORES:
   Ejemplo 1: Sin memoria, 1 tool, respuesta simple
   Ejemplo 2: Estado básico, 5 tools, persistencia
   Ejemplo 3: Memoria completa, contexto, razonamiento avanzado

PRÓXIMOS PASOS:
   Para llevar esto a producción:
   1. Integrar LLMs (GPT, Claude) para razonamiento real
   2. Usar bases de datos vectoriales para memoria a largo plazo
   3. Implementar multi-agente (varios agentes colaborando)
   4. Agregar más herramientas especializadas
   5. Implementar seguridad y validaciones

¡Has completado los 3 ejemplos! 🎉
Ahora entiendes los fundamentos de agentes desde lo básico
hasta conceptos avanzados de memoria y contexto.
"""


if __name__ == "__main__":
    main()
