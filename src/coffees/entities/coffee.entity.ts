import { SchemaFactory } from "@nestjs/mongoose";
import { Prop, Schema } from "@nestjs/mongoose/dist/decorators";
import { Document } from 'mongoose';


@Schema()
export class Coffee extends Document {
    @Prop()
    name: string;
    @Prop()
    brand: string;
    @Prop([String])
    flavors: string[];
    @Prop({ default: 0 })
    recommendations: number;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee)