# CMPC Libros

Aplicación web full stack para la **gestión de libros**. Permite crear, editar, eliminar, filtrar, ordenar y exportar información de libros disponibles.

> Proyecto técnico desarrollado con React + Vite en el frontend.

---

## Tecnologías

### Frontend

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [PrimeReact](https://primereact.org/) (estilos)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) para testing

---

## Funcionalidades principales

- 🔎 Filtros dinámicos por título, autor, género, editorial y disponibilidad
- 📊 Ordenamiento por campos (título, precio, etc.)
- 🔁 Paginación y control de límite por página
- ➕ Agregar libro
- 📝 Editar libro
- ❌ Eliminar con confirmación
- 📁 Exportar libros a archivo **CSV UTF-8**
- 🧪 Cobertura de tests superior al 80%

---

## Estructura del frontend

```
src/
│
├── api/               # Configuración de Axios
├── assets/            # Imágenes por defecto
├── components/        # Componentes reutilizables (Modal, NoResults, etc.)
├── features/
│   └── book/
│       ├── components/ # Filtros y tarjetas
│       ├── pages/      # BookList
│       └── services/   # Llamadas API
├── hooks/             # Hooks personalizados
├── styles/            # CSS modularizado
├── types/             # Interfaces TypeScript
└── tests/             # Archivos de testing
```

---

## Scripts

```bash
# Instalar dependencias
npm install

# Levantar entorno de desarrollo
npm run dev

# Ejecutar tests
npm run test

# Ver reporte de cobertura
npm run test -- --coverage
```

---

## Tests

Los tests están desarrollados con `Jest` y `@testing-library/react`. Incluyen:

- Renderizado de componentes (`BookCard`, `BookList`)
- Interacción de filtros, orden y navegación
- Simulación de API (mocked Axios)
- Validación de modales de confirmación

✅ **Cobertura actual: >80%**

---

## 📦 Exportación CSV

El botón `Exportar CSV` genera automáticamente un archivo **libros.csv** con codificación UTF-8 y columnas: `Título, Autor, Género, Editorial, Precio, Disponible`.

---

## 👤 Autor

Desarrollado por **Anibal Cordero Cortez** como parte de la prueba técnica para **CMPC**.
