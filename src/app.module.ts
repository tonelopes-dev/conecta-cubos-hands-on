import { Module } from '@nestjs/common';
import { ApiManagerModule } from './modules/api-manager/api-manager.module';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/github/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, ApiManagerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
