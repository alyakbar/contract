# ContractGuard - Legal Education Platform

A modern, trustworthy, human-centered legal-education platform focused on helping people understand employment contracts, avoid exploitation, and access legal support.

![ContractGuard](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)

## ✨ Features

- **📚 Education Hub** - Contract sections explained in plain language
- **🚩 Red Flags Checklist** - Interactive tool to identify risky clauses
- **✅ Contract Self-Check** - Guided questionnaire with risk assessment
- **👨‍⚖️ Legal Support** - Directory of vetted professionals with booking
- **🔐 Authentication** - Email + Google OAuth support
- **📊 Admin Dashboard** - Manage content, professionals, and appointments

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Styling**: Custom design system (Stripe + Notion inspired)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contractguard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database URL and auth secrets:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/contractguard"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx          # Landing page
│   │   ├── learn/            # Education hub
│   │   ├── red-flags/        # Red flags checklist
│   │   ├── check/            # Contract self-check tool
│   │   ├── support/          # Legal professionals directory
│   │   ├── about/            # About page
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── admin/            # Admin dashboard
│   ├── api/                  # API routes
│   │   ├── appointments/
│   │   ├── legal-professionals/
│   │   ├── content/
│   │   └── red-flags/
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Design system
├── components/
│   └── ui/
│       ├── Navbar.tsx
│       └── Footer.tsx
└── generated/
    └── prisma/               # Prisma client

prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Seed data
```

## 🗄️ Database Schema

| Model | Description |
|-------|-------------|
| User | User accounts with roles (USER, ADMIN, LEGAL) |
| LegalProfessional | Vetted legal professionals directory |
| Appointment | Booking requests between users and professionals |
| EducationalContent | Contract education articles |
| RedFlag | Contract warning signs database |

## 🎨 Design System

The platform uses a custom design system inspired by Stripe + Notion:

| Token | Value |
|-------|-------|
| Primary | `#1e3a5f` (Deep Navy) |
| Secondary | `#3b82a0` (Soft Teal) |
| Accent | `#e07c54` (Coral) |
| Background | `#f8f9fa` (Light Gray) |
| Border Radius | `12px` (cards), `8px` (buttons) |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

### Railway / Supabase (Database)

1. Create a PostgreSQL database
2. Copy the connection string to `DATABASE_URL`
3. Run `npm run db:push` to create tables

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## ⚠️ Legal Disclaimer

ContractGuard is an educational platform designed to help workers better understand employment contracts. The information provided is for general educational purposes only and **does not constitute legal advice**.

For specific legal questions, consult with a qualified employment lawyer in your area.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for workers everywhere
