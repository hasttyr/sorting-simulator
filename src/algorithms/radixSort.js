// Returns array of steps for radix sort (LSD) visualization
export function generateRadixSortSteps(inputArray) {
  const steps = [];
  let arr = [...inputArray];
  const n = arr.length;

  if (n === 0) return steps;

  const max = Math.max(...arr);
  const numDigits = max === 0 ? 1 : Math.floor(Math.log10(max)) + 1;

  steps.push({
    phase: 'initial',
    array: [...arr],
    highlights: [],
    digit: null,
    buckets: null,
    numDigits,
    currentExp: null,
    description: `Arreglo inicial con ${n} elementos. Máximo: ${max} → ${numDigits} dígito(s) significativo(s).`,
    subDescription: 'Radix Sort LSD procesa de derecha a izquierda (dígito menos significativo primero).',
  });

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const digitPos = Math.round(Math.log10(exp)) + 1;
    const digitName = ['unidades', 'decenas', 'centenas', 'millares'][digitPos - 1] || `10^${digitPos - 1}`;

    // Show which digit we're processing
    steps.push({
      phase: 'new_digit',
      array: [...arr],
      highlights: [],
      digit: digitPos,
      buckets: Array.from({ length: 10 }, () => []),
      numDigits,
      currentExp: exp,
      description: `Pasada ${digitPos}/${numDigits}: procesamos el dígito de las ${digitName} (divisor = ${exp}).`,
      subDescription: 'Distribuimos cada elemento según este dígito.',
    });

    // Create counting buckets 0-9
    const buckets = Array.from({ length: 10 }, () => []);

    // Distribute
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      buckets[digit].push(arr[i]);

      steps.push({
        phase: 'distribute',
        array: [...arr],
        highlights: [i],
        digit: digitPos,
        buckets: buckets.map(b => [...b]),
        activeBucket: digit,
        numDigits,
        currentExp: exp,
        description: `arr[${i}]=${arr[i]} → dígito=${digit} → Cubeta[${digit}].`,
        subDescription: `floor(${arr[i]} / ${exp}) % 10 = ${digit}`,
      });
    }

    // Show all buckets filled
    steps.push({
      phase: 'buckets_filled',
      array: [...arr],
      highlights: [],
      digit: digitPos,
      buckets: buckets.map(b => [...b]),
      numDigits,
      currentExp: exp,
      description: `Distribución completa para dígito de las ${digitName}.`,
      subDescription: 'Ahora recolectamos los elementos en orden de cubeta.',
    });

    // Reconstruct array
    arr = [];
    const newBuckets = buckets.map(b => [...b]);
    for (let d = 0; d < 10; d++) {
      for (let val of buckets[d]) {
        arr.push(val);
        steps.push({
          phase: 'collect',
          array: [...arr, ...buckets.slice(d).flat().filter((_, i) => {
            // remaining elements after current
            let count = 0;
            for (let dd = d; dd < 10; dd++) {
              for (let vv of newBuckets[dd]) {
                if (dd === d && count <= newBuckets[d].indexOf(val)) { count++; continue; }
                // simplified: just show current arr
              }
            }
            return false;
          })],
          highlights: [arr.length - 1],
          digit: digitPos,
          buckets: newBuckets,
          activeBucket: d,
          numDigits,
          currentExp: exp,
          description: `Recolectamos ${val} de Cubeta[${d}] → posición ${arr.length - 1}.`,
          subDescription: `Concatenando cubetas en orden 0→9.`,
        });
      }
    }

    // Show array after this pass
    steps.push({
      phase: 'pass_done',
      array: [...arr],
      highlights: arr.map((_, i) => i),
      digit: digitPos,
      buckets: buckets.map(b => [...b]),
      numDigits,
      currentExp: exp,
      description: `Pasada ${digitPos} completada. Arreglo ordenado por dígito de las ${digitName}.`,
      subDescription: digitPos < numDigits ? `Continuamos con el siguiente dígito.` : '¡Esta es la última pasada!',
    });
  }

  steps.push({
    phase: 'done',
    array: [...arr],
    highlights: arr.map((_, i) => i),
    digit: numDigits,
    buckets: null,
    numDigits,
    currentExp: null,
    description: '¡Ordenamiento completado! Radix Sort procesa cada dígito de menor a mayor significancia.',
    subDescription: 'Complejidad: O(d × (n + k)) donde d=dígitos, k=base (10).',
  });

  return steps;
}
