-- Script para generar cursos ofertados históricos
-- Basado en los cursos del 2025-2, crea cursos para los últimos 10 semestres

-- Semestres a generar: 2025-1, 2024-2, 2024-1, 2023-2, 2023-1, 2022-2, 2022-1, 2021-2, 2021-1, 2020-2

-- 1. Semestre 2025-1
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2025-1', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 2. Semestre 2024-2
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2024-2', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 3. Semestre 2024-1
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2024-1', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 4. Semestre 2023-2
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2023-2', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 5. Semestre 2023-1
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2023-1', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 6. Semestre 2022-2
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2022-2', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 7. Semestre 2022-1
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2022-1', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 8. Semestre 2021-2
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2021-2', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 9. Semestre 2021-1
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2021-1', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- 10. Semestre 2020-2
INSERT INTO curso_ofertado (curso_id, profesor_id, semestre, codigo_seccion, cupos_disponibles, turno, alumnos_matriculados)
SELECT curso_id, profesor_id, '2020-2', codigo_seccion, cupos_disponibles, turno, 0
FROM curso_ofertado
WHERE semestre = '2025-2';

-- Verificar resultados
SELECT semestre, COUNT(*) as total_cursos
FROM curso_ofertado
GROUP BY semestre
ORDER BY semestre DESC;
