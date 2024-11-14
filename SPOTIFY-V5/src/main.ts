import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilitar CORS
    app.enableCors({
        origin: "http://localhost:5173", // Cambia a la URL de tu frontend
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Accept, Authorization",
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}

bootstrap();
