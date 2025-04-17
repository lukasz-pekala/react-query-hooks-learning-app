import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { createServer } from "http";
import path from "path";
import { LoggerService } from "./shared/logger.service";

async function bootstrap() {
  // Create Express instance
  const expressApp = express();

  // Configure Express middleware
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  // Create NestJS application with Express adapter
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      cors: true,
      bodyParser: false, // Using Express's body parser
    }
  );

  const logger = new Logger("Bootstrap");

  // Set global prefix for API routes
  app.setGlobalPrefix("api");

  // Apply global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Get the LoggerService from the application context
  const loggerService = app.get(LoggerService);

  // Apply custom logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Initialize NestJS
  await app.init();

  // Create HTTP server
  const httpServer = createServer(expressApp);

  // In production, serve static frontend files
  if (process.env.NODE_ENV === "production") {
    const clientPath = path.resolve(process.cwd(), "dist/client");
    expressApp.use(express.static(clientPath));

    // Serve index.html for any unmatched routes (SPA fallback)
    expressApp.get("*", (req, res) => {
      // Exclude API routes
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(clientPath, "index.html"));
      }
    });
  }

  // Start server
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    logger.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
