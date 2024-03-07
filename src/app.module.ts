import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiManagerModule } from './modules/api-manager/api-manager.module';

@Module({
    imports: [ConfigModule.forRoot(), ApiManagerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
