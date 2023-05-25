import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { House } from './interfaces/houses.interface';
import * as fs from 'fs';

@Injectable()
export class HousesService {
    private houses: Array<House> = [];
    private readonly logger= new Logger(HousesService.name);

    constructor() {
        this.houses = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    }

    public findAll(): Array<House> {
        this.logger.log("Returning all houses");
        return this.houses;
    }

    public findOne(id: number): House {
        this.logger.log(`Returning house with id ${id}`);
        const house: House = this.houses.find(House => House.id === id);
        if(!house) {
            throw new NotFoundException('House not found.');
        }
        return house;
    }

    public create(house: House): House {
        this.logger.log("Create a new house");

        const maxId: number = Math.max(this.houses.length, 0);
        const id: number = maxId + 1;

        const newHouse: House = {
            id,
            ...house, 
        }
        this.houses = [...this.houses, newHouse];
        fs.writeFileSync('db.json', JSON.stringify(this.houses));
        
        return newHouse;
    }

    public delete(id: number): void{
        this.logger.log("Deleting a house");
        const index: number = this.houses.findIndex(house => house.id === id);

        if(index === -1){
            throw new NotFoundException('House not found');
        }
        this.houses.splice(index, 1);
    }

    public update(id: number, house: House) :House {
        this.logger.log(`Updating house with id: ${id}`);
        const index: number = this.houses.findIndex(house => house.id === id);
        if(index === -1){
            throw new NotFoundException('House not found');
        }
        const updatedHouse: House = {
            id,
            ...house,
        };
        this.houses[index] = updatedHouse;
        return updatedHouse;
    }
}
