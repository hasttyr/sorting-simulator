export const ALGORITHMS = {
  counting: {
    id: 'counting',
    name: 'Counting Sort',
    tagline: 'El poder del conteo directo',
    accent: '#45d7ff',
    complexity: {
      time: 'O(n + k)',
      space: 'O(k)',
      best: 'O(n + k)',
      worst: 'O(n + k)',
      stable: true,
    },
    history: [
      {
        year: '1954',
        title: 'Origen del algoritmo',
        content: 'Harold H. Seward describió Counting Sort en su tesis de maestría en el MIT como parte de su investigación sobre métodos de clasificación interna. Era un enfoque radicalmente diferente a los algoritmos comparativos de la época.',
      },
      {
        year: '1960s',
        title: 'Adopción en computación',
        content: 'Con la masificación de las computadoras IBM, Counting Sort comenzó a usarse en aplicaciones donde los datos tenían rangos acotados, como el procesamiento de calificaciones, códigos postales y datos censales.',
      },
      {
        year: '1998',
        title: 'Base de Radix Sort',
        content: 'Counting Sort se convirtió en el algoritmo subyacente de Radix Sort moderno. Su propiedad de ser estable (mantiene el orden relativo de elementos iguales) lo hace ideal como subrutina.',
      },
      {
        year: 'Hoy',
        title: 'Uso en la industria',
        content: 'Se utiliza en sistemas de bases de datos, procesamiento de señales digitales y en la implementación de histogramas. Lenguajes como Python lo usan internamente para ciertos tipos de ordenamiento.',
      },
    ],
    howItWorks: [
      'Encuentra el valor mínimo y máximo del arreglo.',
      'Crea un arreglo de conteo de tamaño (max - min + 1), inicializado en ceros.',
      'Recorre el arreglo original e incrementa el contador para cada valor encontrado.',
      'Acumula el arreglo de conteo: cada posición suma la anterior.',
      'Construye el arreglo de salida recorriendo el original de derecha a izquierda para garantizar estabilidad.',
    ],
    pros: ['Muy rápido para rangos pequeños de datos', 'Algoritmo estable', 'No requiere comparaciones entre elementos'],
    cons: ['Ineficiente si el rango k >> n', 'Solo funciona con enteros no negativos (o requiere adaptación)', 'Usa memoria adicional O(k)'],
  },

  bucket: {
    id: 'bucket',
    name: 'Bucket Sort',
    tagline: 'Divide y vencerás por rangos',
    accent: '#ff8a5b',
    complexity: {
      time: 'O(n + k)',
      space: 'O(n + k)',
      best: 'O(n)',
      worst: 'O(n²)',
      stable: true,
    },
    history: [
      {
        year: '1956',
        title: 'Primeras ideas',
        content: 'El concepto de dividir elementos en "cubetas" o "baldes" surgió de la necesidad de ordenar grandes colecciones de datos en sistemas con memoria limitada. William Ford y William Topp lo formalizaron matemáticamente.',
      },
      {
        year: '1970s',
        title: 'Procesamiento distribuido',
        content: 'Bucket Sort se volvió fundamental en sistemas de procesamiento distribuido, donde cada "cubeta" podía procesarse en un nodo diferente. Fue precursor de los algoritmos de ordenamiento paralelo.',
      },
      {
        year: '1991',
        title: 'Análisis probabilístico',
        content: 'Thomas H. Cormen y colaboradores en "Introduction to Algorithms" demostraron formalmente que Bucket Sort tiene complejidad promedio O(n) cuando los datos siguen una distribución uniforme.',
      },
      {
        year: 'Hoy',
        title: 'Big Data y cloud',
        content: 'El concepto de Bucket Sort es la base de algoritmos de ordenamiento usados en Apache Spark y sistemas de procesamiento distribuido como MapReduce, donde los datos se particionan en rangos y se procesan en paralelo.',
      },
    ],
    howItWorks: [
      'Determina el número de cubetas (generalmente √n).',
      'Crea k cubetas vacías, cada una representando un rango de valores.',
      'Distribuye cada elemento del arreglo en su cubeta correspondiente.',
      'Ordena cada cubeta individualmente (generalmente con Insertion Sort).',
      'Concatena todas las cubetas en orden para obtener el arreglo final.',
    ],
    pros: ['Excelente rendimiento con distribución uniforme', 'Paralelizable: cada cubeta se puede ordenar independientemente', 'Funciona con números de punto flotante'],
    cons: ['Rendimiento degrada a O(n²) si la distribución es muy sesgada', 'Requiere conocer el rango de los datos', 'Overhead de memoria por las cubetas'],
  },

  radix: {
    id: 'radix',
    name: 'Radix Sort',
    tagline: 'Ordenar dígito por dígito',
    accent: '#b98cff',
    complexity: {
      time: 'O(d × (n + k))',
      space: 'O(n + k)',
      best: 'O(n)',
      worst: 'O(d × n)',
      stable: true,
    },
    history: [
      {
        year: '1887',
        title: 'Máquinas tabuladoras',
        content: 'Herman Hollerith inventó las máquinas tabuladoras para el censo de EE.UU. de 1890, usando un principio similar a Radix Sort para clasificar tarjetas perforadas dígito por dígito. Fue el primer uso masivo del concepto.',
      },
      {
        year: '1923',
        title: 'Clasificadoras mecánicas',
        content: 'IBM desarrolló clasificadoras mecánicas de tarjetas que implementaban Radix Sort físicamente. Cada pasada por la máquina ordenaba las tarjetas por un dígito diferente, comenzando por el menos significativo.',
      },
      {
        year: '1954',
        title: 'Formalización digital',
        content: 'Con la llegada de las computadoras digitales, Harold Seward formalizó el algoritmo LSD Radix Sort (Least Significant Digit). Poco después se desarrolló también la variante MSD (Most Significant Digit).',
      },
      {
        year: '2000s',
        title: 'Resurgimiento en GPU',
        content: 'Radix Sort tuvo un renacimiento con la programación de GPU. Su naturaleza de pasadas fijas lo hace extremadamente paralelizable. Nvidia lo utiliza en sus librerías de ordenamiento para CUDA.',
      },
    ],
    howItWorks: [
      'Encuentra el número máximo para determinar la cantidad de dígitos (pasadas).',
      'Para cada posición de dígito (de unidades a la más significativa):',
      'Usa Counting Sort estable para ordenar según ese dígito específico.',
      'Distribuye los elementos en 10 cubetas (0-9) según el dígito actual.',
      'Recolecta los elementos de las cubetas en orden y repite para el siguiente dígito.',
    ],
    pros: ['Tiempo lineal O(d×n) cuando d es constante', 'Funciona bien con enteros de ancho fijo', 'Altamente paralelizable en GPU'],
    cons: ['Solo funciona nativamente con enteros', 'Requiere espacio adicional O(n)', 'No es eficiente si los números tienen muchos dígitos'],
  },
};
