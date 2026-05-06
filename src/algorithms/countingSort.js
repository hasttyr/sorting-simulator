// Returns array of steps for counting sort visualization
export function generateCountingSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  if (n === 0) return steps;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  // Step 0: initial state
  steps.push({
    phase: 'initial',
    array: [...arr],
    highlights: [],
    count: null,
    output: null,
    description: `Arreglo inicial con ${n} elementos. Rango de valores: [${min}, ${max}].`,
    subDescription: 'Comenzamos el Counting Sort.',
  });

  // Build count array
  const count = new Array(range).fill(0);

  steps.push({
    phase: 'build_count',
    array: [...arr],
    highlights: [],
    count: [...count],
    countOffset: min,
    output: null,
    description: `Creamos el arreglo de conteo de tamaño ${range} (de ${min} a ${max}), inicializado en ceros.`,
    subDescription: 'Cada índice representa un valor del arreglo original.',
  });

  // Count occurrences
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
    steps.push({
      phase: 'counting',
      array: [...arr],
      highlights: [i],
      count: [...count],
      countOffset: min,
      countHighlight: arr[i] - min,
      output: null,
      description: `Encontramos el valor ${arr[i]} en la posición ${i}. Incrementamos count[${arr[i] - min}] a ${count[arr[i] - min]}.`,
      subDescription: `Contando ocurrencias del elemento arr[${i}] = ${arr[i]}.`,
    });
  }

  // Accumulate count
  const accCount = [...count];
  steps.push({
    phase: 'accumulate_start',
    array: [...arr],
    highlights: [],
    count: [...accCount],
    countOffset: min,
    output: null,
    description: 'Ahora acumulamos el arreglo de conteo. Cada posición almacenará la cantidad de elementos ≤ a ese valor.',
    subDescription: 'Esta acumulación nos permite conocer la posición final de cada elemento.',
  });

  for (let i = 1; i < range; i++) {
    accCount[i] += accCount[i - 1];
    steps.push({
      phase: 'accumulate',
      array: [...arr],
      highlights: [],
      count: [...accCount],
      countOffset: min,
      countHighlight: i,
      output: null,
      description: `count[${i}] = count[${i}] + count[${i - 1}] = ${accCount[i]}.`,
      subDescription: `Acumulando posición ${i + min}.`,
    });
  }

  // Build output
  const output = new Array(n).fill(null);
  steps.push({
    phase: 'output_start',
    array: [...arr],
    highlights: [],
    count: [...accCount],
    countOffset: min,
    output: [...output],
    description: 'Construimos el arreglo de salida recorriendo el arreglo original de derecha a izquierda.',
    subDescription: 'Esto garantiza que el algoritmo sea estable.',
  });

  for (let i = n - 1; i >= 0; i--) {
    const val = arr[i];
    const pos = accCount[val - min] - 1;
    output[pos] = val;
    accCount[val - min]--;
    steps.push({
      phase: 'placing',
      array: [...arr],
      highlights: [i],
      count: [...accCount],
      countOffset: min,
      countHighlight: val - min,
      output: [...output],
      outputHighlight: pos,
      description: `Colocamos arr[${i}]=${val} en la posición ${pos} del arreglo de salida.`,
      subDescription: `count[${val - min}] decrementado a ${accCount[val - min]}.`,
    });
  }

  steps.push({
    phase: 'done',
    array: [...output],
    highlights: output.map((_, i) => i),
    count: [...accCount],
    countOffset: min,
    output: [...output],
    description: '¡Ordenamiento completado! El arreglo de salida es la versión ordenada.',
    subDescription: 'Counting Sort tiene complejidad O(n + k) donde k es el rango de valores.',
  });

  return steps;
}
