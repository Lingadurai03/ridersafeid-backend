import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';

async function bootstrap() {
    console.log(process.env.DATABASE_URL + '❤️');
    console.log('NODE_ENV at runtime:', process.env.NODE_ENV || '❌ Not found');
    console.log(
        'ACCESS_TOKEN_SECRET at runtime:',
        process.env.ACCESS_TOKEN_SECRET || '❌ Not found',
    );
    console.log('🧪 process.env dump:\n', JSON.stringify(process.env, null, 2));
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
