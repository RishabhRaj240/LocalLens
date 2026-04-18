# 📍 LocalLens

LocalLens is a modern, full-stack platform designed to bridge the gap between local businesses and their communities. Built with a focus on performance and seamless user experience, it serves as a hyper-local discovery engine.

![LocalLens Preview](<img width="1892" height="853" alt="Screenshot 2026-04-18 142717" src="https://github.com/user-attachments/assets/59461436-b4eb-4e4d-ae5e-f65376f6d5ee" />
) ## 🚀 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Database:** PostgreSQL (with custom schema management)
- **Deployment:** [Vercel](https://vercel.com/)

## ✨ Key Features

- **Hyper-Local Search:** Easily find services and businesses in your immediate vicinity.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views using Tailwind CSS.
- **Dynamic Routing:** Leverages Next.js App Router for fast, SEO-friendly page transitions.
- **Scalable Architecture:** Clean code structure following professional software architecture principles.

## 🛠️ Project Structure

```text
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router (Pages & APIs)
│   ├── components/     # Reusable UI components (Shadcn/UI)
│   ├── lib/            # Utility functions & shared logic
│   └── styles/         # Global styles
├── database_schema.sql # SQL definitions for the backend
└── next.config.mjs     # Next.js configuration

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

