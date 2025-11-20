"""
EJEMPLO 1: AGENTE SIMPLE DE CLIMA 🌤️

Este es un agente básico que:
- Consulta el clima de una ciudad
- Da recomendaciones basadas en el clima
- Es SIMPLE: sin memoria, solo responde a requests

Conceptos clave:
- Tools (herramientas): funciones que el agente puede usar
- Prompt: instrucciones para el agente
- Input/Output: cómo interactúa con el usuario
"""

import json
from typing import Dict, List, Any
from datetime import datetime


# ============================================
# PASO 1: DEFINIR LAS HERRAMIENTAS (TOOLS)
# ============================================

class ClimaTool:
    """
    Herramienta simulada para obtener el clima.
    En producción, esto consultaría una API real como OpenWeatherMap.
    """

    # Datos simulados para el ejemplo
    clima_simulado = {
        "madrid": {"temp": 22, "condicion": "soleado", "humedad": 45},
        "barcelona": {"temp": 25, "condicion": "parcialmente nublado", "humedad": 60},
        "londres": {"temp": 15, "condicion": "lluvioso", "humedad": 80},
        "miami": {"temp": 30, "condicion": "soleado", "humedad": 75},
        "nueva york": {"temp": 18, "condicion": "nublado", "humedad": 55},
    }

    @staticmethod
    def obtener_clima(ciudad: str) -> Dict[str, Any]:
        """
        Obtiene el clima de una ciudad.

        Args:
            ciudad: Nombre de la ciudad

        Returns:
            Diccionario con temperatura, condición y humedad
        """
        ciudad_lower = ciudad.lower()

        if ciudad_lower in ClimaTool.clima_simulado:
            clima = ClimaTool.clima_simulado[ciudad_lower]
            return {
                "success": True,
                "ciudad": ciudad,
                "temperatura": clima["temp"],
                "condicion": clima["condicion"],
                "humedad": clima["humedad"],
                "timestamp": datetime.now().isoformat()
            }
        else:
            return {
                "success": False,
                "error": f"No tengo datos del clima para {ciudad}",
                "ciudades_disponibles": list(ClimaTool.clima_simulado.keys())
            }


# ============================================
# PASO 2: DEFINIR EL AGENTE
# ============================================

class AgenteClima:
    """
    Agente simple que consulta el clima y da recomendaciones.

    Este agente es STATELESS (sin estado), significa que no recuerda
    conversaciones pasadas. Cada consulta es independiente.
    """

    def __init__(self):
        """Inicializa el agente con sus herramientas."""
        self.clima_tool = ClimaTool()
        self.nombre = "Agente del Clima"

    def _generar_recomendaciones(self, clima: Dict[str, Any]) -> List[str]:
        """
        Genera recomendaciones basadas en el clima.
        Esta es la "inteligencia" del agente.
        """
        recomendaciones = []

        temp = clima["temperatura"]
        condicion = clima["condicion"]
        humedad = clima["humedad"]

        # Recomendaciones por temperatura
        if temp < 10:
            recomendaciones.append("🧥 Lleva abrigo, hace frío")
        elif temp < 20:
            recomendaciones.append("👕 Una chaqueta ligera estaría bien")
        elif temp < 28:
            recomendaciones.append("👕 Ropa ligera, temperatura agradable")
        else:
            recomendaciones.append("🩳 Hace calor, viste fresco")

        # Recomendaciones por condición
        if "lluv" in condicion.lower():
            recomendaciones.append("☔ No olvides el paraguas")
        elif "nublado" in condicion.lower():
            recomendaciones.append("🌥️ Puede que necesites el paraguas")
        else:
            recomendaciones.append("😎 Día perfecto para salir")

        # Recomendaciones por humedad
        if humedad > 70:
            recomendaciones.append("💧 Alta humedad, puede sentirse pesado")

        return recomendaciones

    def procesar_consulta(self, ciudad: str) -> str:
        """
        Método principal del agente.

        Este es el ciclo completo:
        1. Recibe input (ciudad)
        2. Usa herramienta (obtener clima)
        3. Razona (genera recomendaciones)
        4. Responde (formatea la respuesta)

        Args:
            ciudad: Ciudad a consultar

        Returns:
            Respuesta formateada para el usuario
        """
        print(f"\n🤖 {self.nombre}: Consultando el clima de {ciudad}...\n")

        # PASO 1: Obtener datos con la herramienta
        clima = self.clima_tool.obtener_clima(ciudad)

        # PASO 2: Verificar si fue exitoso
        if not clima["success"]:
            return f"❌ {clima['error']}\nCiudades disponibles: {', '.join(clima['ciudades_disponibles'])}"

        # PASO 3: Generar recomendaciones (razonamiento)
        recomendaciones = self._generar_recomendaciones(clima)

        # PASO 4: Formatear respuesta
        respuesta = f"""
📍 Clima en {clima['ciudad'].title()}
{'='*40}
🌡️  Temperatura: {clima['temperatura']}°C
☁️  Condición: {clima['condicion']}
💧 Humedad: {clima['humedad']}%

📋 Recomendaciones:
"""
        for rec in recomendaciones:
            respuesta += f"   • {rec}\n"

        return respuesta


# ============================================
# PASO 3: CREAR INTERFAZ DE USO
# ============================================

def main():
    """
    Función principal para demostrar el agente.
    """
    print("="*50)
    print("🌤️  AGENTE DE CLIMA - EJEMPLO 1")
    print("="*50)

    # Crear instancia del agente
    agente = AgenteClima()

    # Ejemplos de uso
    ejemplos = ["Madrid", "Londres", "Miami", "Tokio"]

    for ciudad in ejemplos:
        respuesta = agente.procesar_consulta(ciudad)
        print(respuesta)
        print("-"*50)


# ============================================
# CONCEPTOS CLAVE APRENDIDOS
# ============================================
"""
✅ HERRAMIENTAS (Tools):
   - ClimaTool es una herramienta que el agente usa
   - En un agente real, tendrías múltiples herramientas
   - Las herramientas encapsulan funcionalidad específica

✅ AGENTE SIN ESTADO (Stateless):
   - No recuerda conversaciones pasadas
   - Cada consulta es independiente
   - Más simple pero menos poderoso

✅ FLUJO DE PROCESAMIENTO:
   1. Input → 2. Tool → 3. Razonamiento → 4. Output

✅ SEPARACIÓN DE RESPONSABILIDADES:
   - ClimaTool: obtiene datos
   - AgenteClima: razona y decide
   - main: interfaz de usuario

PRÓXIMO NIVEL: En el Ejemplo 2 veremos un agente CON ESTADO
que puede recordar información entre consultas.
"""


if __name__ == "__main__":
    main()
