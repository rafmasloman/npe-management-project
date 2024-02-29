# NPE Ngatur

### Npe Ngatur adalah Website Manajemen Project Untuk NPE Digital, yang membantu kolaborasi antar team lebih efisien dengan fitur-fitur pendukung.

## Table of Contents

- [Installation Project](#installation-project)
- [Structure Project](#structure-project)
- [User Instructions](#user-instructions)
- [Main Features](#features)
- [Technologies and Library Used](#technologies-used)

### Installation Project

1. Clone this repository.

```bash
git clone https://github.com/rafmasloman/npe-management-project.git
```

2. Move to application directory.

```bash
cd npe-management-project
```

3. Install all dependencies.

```bash
# using pnpm
pnpm install

# using yarn
yarn install

# using npm
npm install
```

4. Run application.

```bash
# using pnpm
pnpm dev

# using yarn
yarn dev

# using npm
npm run dev
```

5. Application will be running on port : `http://localhost:3000`.

### Structure Project

**This is your source code tree:**

```
-pages
    |-- ...
    |-- _app.tsx
    |-- index.tsx
    |-- _document.tsx
-src
    |-- assets
    |-- components
    |-- contstant
    |-- context
    |-- hooks
    |-- interfaces
    |-- layouts
    |-- shared
    |-- themes
    |-- utils

```

## Main Features

- [x] Dashboard for monitoring Project
- [x] Task Management untuk mengelola tugas project oleh masing-masing member
- [x] Milestones untuk melakukan checkpoint ketika ada beberapa task yang complete
- [x] Komentar untuk setiap task
- [x] Payroll untuk memberikan sejumlah persen gaji kepada member yang terlibat dalam project
- [x] Invoice untuk mengirimkan invoice berapa harga yang harus dibayar oleh client
- [x] ....

## Technologies and Library Used

This project utilizes the following technologies and library:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query / Tanstack Query](https://tanstack.com/query/latest/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React DnD](https://https://react-dnd.github.io/react-dnd/about)
