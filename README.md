# Backend API - Sistema de Horarios UNI

API REST principal construida con NestJS, TypeScript y Prisma ORM.

## 🚀 Tecnologías

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript
- **ORM**: Prisma 6.19.0
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator, class-transformer

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── auth/          # Autenticación y autorización
│   ├── common/        # Interceptors, decorators, guards
│   ├── modules/       # Módulos del sistema
│   │   ├── alumno/
│   │   ├── profesor/
│   │   ├── curso/
│   │   ├── ofertado/
│   │   ├── matricula/
│   │   ├── dashboard/  # 🆕 Dashboards por rol
│   │   └── users/
│   ├── prisma/        # Cliente Prisma
│   └── main.ts
├── prisma/
│   └── schema.prisma  # Esquema de base de datos
└── package.json
```

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev
```

## ▶️ Ejecutar el Proyecto

```bash
# Desarrollo (watch mode)
npm run start:dev

# Producción
npm run start:prod
```

**Puerto**: `http://localhost:3003`

## 📚 Documentación

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Referencia completa de todos los endpoints
- **[POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)** - Guía de pruebas con Postman

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
