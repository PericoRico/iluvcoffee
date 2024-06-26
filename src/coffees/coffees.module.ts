import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffesConfig from './config/coffes.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffesConfig
        )], //ya se uso el forRoot en el appmodule, solo se hace una vez, los demas modulos usan forFeature
    controllers: [CoffeesController],
    providers: [CoffeesService,
        { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }],
    exports: [CoffeesService]
})
export class CoffeesModule { }
