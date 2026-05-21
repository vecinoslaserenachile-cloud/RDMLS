# Informe de Auditoría Forense y Transparencia Activa
## Ingesta y Análisis de Gastos y Consumos de Difusión - Distrito 5 (2022-2026)

> [!NOTE]
> **ENTORNO DE EJECUCIÓN SEGURO:** Este informe fue generado bajo el **MODO AISLADO ANTIGRAVITY (Regla Cero)**. Toda la ingesta, normalización y análisis de datos se realizó en un sandbox local estricto, sin interacción con bases de datos ni servidores web en producción.

---

## 1. Resumen Ejecutivo de Ingesta

Se ha procesado y consolidado con éxito la base de datos de la **Cámara de Diputadas y Diputados de Chile** correspondiente al **Distrito 5 (Región de Coquimbo)**, para el periodo comprendido entre **marzo de 2022 y abril de 2026**.

El análisis unificó dos fuentes de datos del archivo original `documentoAdjunto.xlsx`:
*   **Hoja 1 (Rendiciones de Gastos de Difusión):** Registro de reembolsos solicitados por los parlamentarios.
*   **Hoja 2 (Consumos Internos de Difusión):** Registro de consumos y material corporativo interno.

### Métricas de Consolidación
*   **Total de Registros Consolidados:** `1,136` filas
    *   *Rendiciones de Gastos:* `1,066` filas
    *   *Consumos Internos:* `70` filas
*   **Gasto Total Consolidado:** **`$315,061,558 CLP`** (Trescientos quince millones sesenta y un mil quinientos cincuenta y ocho pesos chilenos).

---

## 2. Normalización de Datos Aplicada

Durante la ingesta, se ejecutó un script en memoria temporal para limpiar y estandarizar la base de datos de acuerdo con los estándares del sistema de auditoría *Centinel Faro*:
1.  **Limpieza de Nombres:** Se removieron sufijos temporales como `(2022-2026)` y se corrigieron codificaciones corruptas (ej. `Vctor` a `Víctor`).
2.  **Estandarización de Categorías:** Se alinearon descripciones redundantes (ej. `Reconocimiento a la Comunidad` a `COMUNICACIÓN - Reconocimiento a la comunidad`).
3.  **Conversión de Fechas:** Se transformaron todas las marcas de tiempo al formato internacional estandarizado `YYYY-MM` (año y mes) para facilitar análisis longitudinales.
4.  **Saneamiento de Montos:** Se purgaron caracteres especiales (`$`, puntos y espacios) y se forzó el tratamiento de los montos como valores numéricos de coma flotante de doble precisión.

---

## 3. Estadísticas por Parlamentario (Distrito 5)

La distribución del gasto consolidado revela una marcada asimetría en el consumo de recursos de difusión entre los siete parlamentarios del distrito:

| Diputado(a) | Gasto Total (CLP) | % del Total | Nº Registros | Promedio por Transacción |
| :--- | :---: | :---: | :---: | :---: |
| **Manouchehri L., Daniel** | `$99,069,680` | 31.44% | 227 | `$436,430` |
| **Fuenzalida C., Juan Manuel** | `$63,740,009` | 20.23% | 216 | `$295,093` |
| **Cifuentes L., Ricardo** | `$49,643,337` | 15.76% | 175 | `$283,676` |
| **Pino F., Víctor** | `$39,551,843` | 12.55% | 246 | `$160,780` |
| **Sulantay O., Marco Antonio** | `$34,494,296` | 10.95% | 120 | `$287,452` |
| **Tello R., Carolina** | `$16,538,730` | 5.25% | 82 | `$201,692` |
| **Castillo R., Nathalie** | `$12,023,663` | 3.82% | 70 | `$171,767` |
| **TOTAL** | **`$315,061,558`** | **100%** | **1,136** | **`$277,343`** |

> [!TIP]
> El diputado **Daniel Manouchehri** concentra casi un tercio (**31.44%**) de la inversión total del distrito en difusión. Junto al diputado **Juan Manuel Fuenzalida**, acumulan más del **51.6%** de los recursos totales reembolsados en el periodo.

---

## 4. Distribución por Categorías de Gasto

El desglose por concepto o *Item* de gasto indica que los medios tradicionales (radio y televisión) siguen acaparando la mayor parte de la inversión pública:

| Categoría de Gasto (Item Normalizado) | Gasto Acumulado (CLP) | % del Total | Nº Transacciones |
| :--- | :---: | :---: | :---: |
| **Contratación de espacios en radioemisoras o TV local** | `$220,525,660` | 69.99% | 819 |
| **Contratación de servicios (Redes Sociales, WhatsApp, SMS)** | `$32,441,135` | 10.30% | 122 |
| **Contratación de espacios en revistas o diarios locales** | `$22,071,381` | 7.01% | 42 |
| **Diseño e imprenta** | `$17,676,528` | 5.61% | 28 |
| **Plataformas virtuales** | `$10,666,782` | 3.39% | 35 |
| **Reconocimiento a la comunidad** | `$6,915,512` | 2.19% | 74 |
| **Diseño, edición y publicación de libros o folletería** | `$3,043,260` | 0.97% | 7 |
| **Fotografía, grabación y filmación** | `$900,000` | 0.29% | 6 |
| **Diseño y desarrollo de páginas web** | `$821,300` | 0.26% | 3 |
| **TOTAL** | **`$315,061,558`** | **100%** | **1,136** |

---

## 5. Análisis Forense de Concentración y Anomalías

El motor de detección de patrones del sistema *Centinel Faro* identificó diversos comportamientos inusuales y alertas críticas en la base de datos:

### A. Los 5 Registros Individuales Más Altos
1.  **`$5,000,000 CLP`** | **Ricardo Cifuentes** (2025-03) | *Diseño e imprenta* (Rendiciones).
2.  **`$3,139,781 CLP`** | **Ricardo Cifuentes** (2026-02) | *Espacios en revistas o diarios locales* (Rendiciones).
3.  **`$2,700,001 CLP`** | **Daniel Manouchehri** (2025-03) | *Espacios en radioemisoras o TV local* (Rendiciones).
4.  **`$2,700,000 CLP`** | **Ricardo Cifuentes** (2025-05) | *Espacios en revistas o diarios locales* (Rendiciones).
5.  **`$2,232,897 CLP`** | **Daniel Manouchehri** (2022-12) | *Espacios en radioemisoras o TV local* (Rendiciones).

### B. Concentración Crítica por Diputado-Categoría
El mayor "vortex" o sumidero de fondos corresponde a:
*   **Daniel Manouchehri** en *Radioemisoras y TV Local*: **`$60,104,762 CLP`**, lo que representa por sí solo el **19.08%** de todo el presupuesto del distrito.
*   **Juan Manuel Fuenzalida** en *Radioemisoras y TV Local*: **`$42,974,171 CLP`** (**13.64%** del total).
*   **Víctor Pino** en *Radioemisoras y TV Local*: **`$34,091,838 CLP`** (**10.82%** del total).

### C. Alerta de Repetición y Patrones de Transacción
Se detectaron **`202` registros** que constituyen patrones transaccionales idénticos (mismo diputado, mes, categoría y monto exacto de forma repetitiva). 

**Casos más notorios de fraccionamiento o pagos reiterativos:**
*   **Ricardo Cifuentes:** Repitió **4 veces** el monto idéntico de `$119,000 CLP` en el mes de **diciembre de 2022** bajo el concepto de *Radioemisoras y TV Local*.
*   **Marco Antonio Sulantay:** 
    *   Repitió **4 veces** el monto exacto de `$89,250 CLP` en **septiembre de 2025** (*Radioemisoras y TV Local*).
    *   Repitió **4 veces** el monto exacto de `$178,500 CLP` en **julio de 2025**, **octubre de 2025** y **enero de 2024** (*Radioemisoras y TV Local*).

> [!WARNING]
> Estos patrones repetitivos de transacciones con montos idénticos apuntan a un posible esquema de **fraccionamiento de pagos** para evitar controles o simplificar facturaciones periódicas con proveedores de radiodifusión locales, o bien duplicación administrativa de registros.

---

## 6. Evolución del Gasto por Año

La progresión anual demuestra un crecimiento explosivo de la inversión en difusión a medida que se acercaba el término del período parlamentario, con un **pico histórico en 2025**:

*   **Año 2022 (Marzo-Diciembre):** `$49,313,901 CLP` (233 transacciones)
*   **Año 2023:** `$65,669,007 CLP` (237 transacciones)
*   **Año 2024:** `$73,530,040 CLP` (269 transacciones)
*   **Año 2025 (Año Pre-electoral/Pico):** **`$111,592,249 CLP`** (369 transacciones)
*   **Año 2026 (Enero-Abril):** `$14,956,361 CLP` (28 transacciones)

> [!IMPORTANT]
> El año **2025** registró un aumento del **+51.7%** en comparación con 2024, lo que coincide directamente con el comportamiento típico de años de campaña parlamentaria, donde la necesidad de visibilidad pública de las autoridades se maximiza.
