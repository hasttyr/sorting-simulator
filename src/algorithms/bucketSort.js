// Returns array of steps for bucket sort visualization
export function generateBucketSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  if (n === 0) return steps;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const numBuckets = Math.max(2, Math.floor(Math.sqrt(n)));
  const range = max - min + 1;

  steps.push({
    phase: 'initial',
    array: [...arr],
    highlights: [],
    buckets: null,
    numBuckets,
    min, max,
    description: `Arreglo inicial con ${n} elementos. Usaremos ${numBuckets} cubetas.`,
    subDescription: `Rango: [${min}, ${max}]. El número de cubetas ≈ √n.`,
  });

  // Create empty buckets
  const buckets = Array.from({ length: numBuckets }, () => []);

  steps.push({
    phase: 'create_buckets',
    array: [...arr],
    highlights: [],
    buckets: buckets.map(b => [...b]),
    numBuckets, min, max,
    description: `Creamos ${numBuckets} cubetas vacías.`,
    subDescription: 'Cada cubeta cubrirá un rango de valores proporcional.',
  });

  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const val = arr[i];
    let bucketIdx;
    if (val === max) {
      bucketIdx = numBuckets - 1;
    } else {
      bucketIdx = Math.floor(((val - min) / range) * numBuckets);
    }
    buckets[bucketIdx].push(val);

    steps.push({
      phase: 'distribute',
      array: [...arr],
      highlights: [i],
      buckets: buckets.map(b => [...b]),
      activeBucket: bucketIdx,
      numBuckets, min, max,
      description: `arr[${i}]=${val} → Cubeta ${bucketIdx} (rango ~[${Math.round(min + (bucketIdx / numBuckets) * range)}, ${Math.round(min + ((bucketIdx + 1) / numBuckets) * range) - 1}]).`,
      subDescription: `Distribuyendo elemento ${i + 1} de ${n}.`,
    });
  }

  // Sort each bucket (insertion sort)
  steps.push({
    phase: 'sort_buckets_start',
    array: [...arr],
    highlights: [],
    buckets: buckets.map(b => [...b]),
    numBuckets, min, max,
    description: 'Ordenamos cada cubeta individualmente usando Insertion Sort.',
    subDescription: 'Las cubetas pequeñas se ordenan rápidamente.',
  });

  for (let b = 0; b < numBuckets; b++) {
    const bucket = buckets[b];
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;

      if (bucket.length > 1) {
        steps.push({
          phase: 'sort_bucket',
          array: [...arr],
          highlights: [],
          buckets: buckets.map(bkt => [...bkt]),
          activeBucket: b,
          numBuckets, min, max,
          description: `Ordenando cubeta ${b}: movemos ${key} a posición ${j + 1}.`,
          subDescription: `Insertion sort dentro de la cubeta ${b}.`,
        });
      }
    }

    steps.push({
      phase: 'bucket_sorted',
      array: [...arr],
      highlights: [],
      buckets: buckets.map(bkt => [...bkt]),
      sortedBuckets: Array.from({ length: b + 1 }, (_, i) => i),
      activeBucket: b,
      numBuckets, min, max,
      description: `Cubeta ${b} ordenada: [${buckets[b].join(', ')}].`,
      subDescription: `${b + 1} de ${numBuckets} cubetas ordenadas.`,
    });
  }

  // Concatenate
  const sorted = buckets.flat();
  steps.push({
    phase: 'done',
    array: [...sorted],
    highlights: sorted.map((_, i) => i),
    buckets: buckets.map(b => [...b]),
    sortedBuckets: Array.from({ length: numBuckets }, (_, i) => i),
    numBuckets, min, max,
    description: '¡Ordenamiento completado! Concatenamos todas las cubetas en orden.',
    subDescription: 'Bucket Sort tiene complejidad promedio O(n + k).',
  });

  return steps;
}
