import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(
    'mongodb+srv://fadwamen:NHQhbgFs27o3Kz7t@cluster0.qzc8z.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
     )
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
