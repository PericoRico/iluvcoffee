import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { SetMetadata, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger/dist';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UsePipes(ValidationPipe)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }

    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        //const { limit, offset } = paginationQuery
        //await new Promise(resolve => setTimeout(resolve, 5000)); solo para que funcione el interceptor del timeout
        console.log(protocol)
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log(id);
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
