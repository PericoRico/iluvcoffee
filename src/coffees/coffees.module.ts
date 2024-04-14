import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], //ya se uso el forRoot en el appmodule, solo se hace una vez, los demas modulos usan forFeature
    controllers: [CoffeesController],
    providers: [CoffeesService]
})
export class CoffeesModule { }
