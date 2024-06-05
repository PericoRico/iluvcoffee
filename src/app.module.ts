import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot('mongodb+srv://nest:nestjs@clusternest.gx2qmi2.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNest')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
