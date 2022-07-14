import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    await app.listen(3000);
}

bootstrap()
    .then(() => {
        console.log('server listened on port 3000');
    })
    .catch(console.error);
