# VAT & Tax Hub

VAT & Tax Hub is a comprehensive interactive platform designed to simplify tax and VAT for small businesses and individuals in Bangladesh.

## 🌟 Key Features

- **Smart Calculators**: Advanced VAT and tax calculators tailored for the Bangladesh context.
- **Guided Workflows**: Step-by-step form and return helpers to make compliance easy.
- **Business Dashboard**: A dedicated dashboard for small businesses to track and manage their tax-related activities.
- **Bilingual Support**: Fully functional in both English and Bangla.
- **App-like UX**: Fast performance designed for ease of use.
- **Resource Integration**: Contextual links and resources associated with [TaxVATPoint.com](https://taxvatpoint.com).

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT & bcryptjs
- **PDF Generation**: jsPDF & jsPDF-AutoTable
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Set up your environment variables by creating a `.env` file based on your configuration needs, especially for the PostgreSQL database connection and JWT secrets.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Database Setup

Generate the Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

To seed the database with initial data:

```bash
bpm run prisma:seed
# Actually defined in package.json as: bun run prisma/seed.ts
```

## 🌐 Features & Pages

- **Calculators**: Interactive tools for calculating VAT and Tax.
- **Forms & Returns**: Helpers to guide users through necessary documentation.
- **Dashboard**: A protected, personalized area for managing business tax activities.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---
Developed for helping simplified tax and VAT tracking in Bangladesh.
