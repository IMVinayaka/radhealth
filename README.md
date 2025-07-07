# Artemedix - Healthcare Staffing Website

A modern, responsive website for Artemedix, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🚀 Built with Next.js 14 (App Router)
- 🎨 Styled with Tailwind CSS v3
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- ⚡ Optimized performance
- 🔍 SEO-friendly
- 🎭 Dark mode ready
- 📝 Contact form with validation

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS v3 with @tailwind/typography
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form
- **Icons**: Heroicons
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/artemedix-website.git
   cd artemedix-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
artemedix-website/
├── app/                    # App router
│   ├── components/         # Reusable components
│   ├── utils/              # Utility functions
│   └── globals.css         # Global styles
├── public/                 # Static files
│   └── images/             # Image assets
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Customization

### Colors

You can customize the color scheme by editing the `tailwind.config.js` file. The primary color palette is defined as follows:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#008C95',
        'primary-light': '#9AD4D0',
        'primary-extraLight': '#EAF6F7',
        'text-dark': '#0A0D14',
        'text-muted': '#354A4A',
        highlight: '#FFE07D',
      },
    },
  },
};
```

### Animations

Custom animations are defined in `app/utils/animations.ts` using Framer Motion. You can modify or extend these animations as needed.

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import your project on Vercel
3. Vercel will detect it's a Next.js app and optimize the build for you
4. Your app will be deployed!

### Other Hosting Options

You can also deploy to other hosting providers that support Node.js applications. Make sure to run `npm run build` before deploying.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

Made with ❤️ by Loesh B S
