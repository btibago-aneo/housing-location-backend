import { Controller, Get, Param, Post, ParseIntPipe, Body, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { HousesService } from './houses.service';
import { ApiTags, ApiResponse,ApiOkResponse, ApiNotFoundResponse,ApiCreatedResponse } from '@nestjs/swagger';
import { House } from './interfaces/houses.interface';

@Controller('houses')
@ApiTags('houses')
export class HousesController {
    constructor(private readonly houseService: HousesService) {}

    @Get()
    @ApiResponse({ description: 'Houses retrieved successfully.'})
    public findAll(): Array<House> {
        try {
            return this.houseService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @Get(':id')
    @ApiOkResponse({ description: 'House retrieved successfully.'})
    @ApiNotFoundResponse({ description: 'House not found!'})
    public findOne(@Param('id', ParseIntPipe) id:number): House {
        try {
            return this.houseService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @Post()
    @ApiCreatedResponse({ description: 'House created successfully. '})
    public create(@Body() house: House) : House {
        try {
            return this.houseService.create(house);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOkResponse({ description: 'House updated successfully.'})
    @ApiNotFoundResponse({ description: 'House not found!'})
    public update(@Param('id', ParseIntPipe) id: number, @Body() house: House): House{
        try {
            return this.houseService.update(id, house);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'House deleted successfully.'})
    @ApiNotFoundResponse({ description: 'House not found.' })
    public delete(@Param('id', ParseIntPipe) id:number): void {
        try{
            this.houseService.delete(id);
        } catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
