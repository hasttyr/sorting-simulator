# SortLab

SortLab es una aplicación web hecha con React y Vite para aprender visualmente algoritmos de ordenamiento no comparativos. Permite explorar Counting Sort, Bucket Sort y Radix Sort con una vista explicativa y un simulador paso a paso.

## Características

- Menú principal con selección de algoritmo.
- Vista de explicación con complejidad, historia, pasos, ventajas y desventajas.
- Simulador interactivo con avance por pasos, reproducción automática y control de velocidad.
- Carga manual de arreglos, generación aleatoria y lectura de archivos `.csv` o `.txt`.
- Visualizaciones específicas para cada algoritmo, incluyendo arreglos, cubetas y conteos.

## Algoritmos incluidos

- Counting Sort: ordenamiento estable basado en conteo de ocurrencias.
- Bucket Sort: distribución por rangos y ordenamiento de cubetas.
- Radix Sort: ordenamiento dígito por dígito apoyado en un conteo estable.

## Requisitos

- Node.js instalado en el sistema.
- npm para instalar dependencias y ejecutar scripts.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Luego abre la URL que imprime Vite en el navegador.

## Compilación para producción

```bash
npm run build
```

## Vista previa de la build

```bash
npm run preview
```

## Uso

1. Abre la app y elige uno de los algoritmos.
2. Revisa la explicación del algoritmo seleccionado.
3. Entra al simulador y define un arreglo manualmente, con valores aleatorios o desde un archivo.
4. Avanza paso a paso o reproduce la animación para ver cómo evoluciona el ordenamiento.

## Estructura del proyecto

```text
src/
	App.jsx
	index.css
	main.jsx
	algorithms/
		algorithmData.js
		bucketSort.js
		countingSort.js
		radixSort.js
	components/
		ArrayBars.jsx
		BucketDisplay.jsx
		CountDisplay.jsx
	views/
		ExplainView.jsx
		MenuView.jsx
		SimulatorView.jsx
```

## Notas

- El simulador valida que el arreglo tenga al menos 2 elementos y como máximo 50.
- La entrada del simulador acepta únicamente enteros no negativos.
- Counting Sort, Bucket Sort y Radix Sort se muestran con visualizaciones distintas para facilitar el aprendizaje.

## Tecnologías

- React 18
- Vite
- Framer Motion
