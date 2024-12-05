export const logos = {
  react: '/icons/react.svg',
  nodejs: '/icons/nodejs.svg',
  mongodb: '/icons/mongodb.svg',
  docker: '/icons/docker.svg',
  python: '/icons/python.svg',
  typescript: '/icons/typescript.svg',
} as const;

export type LogoType = keyof typeof logos; 