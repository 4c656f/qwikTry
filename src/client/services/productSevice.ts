import {axiosClient} from "../axios";
import type {Product} from "@prisma/client";


export class ProductSevice {

    static async getProducts(): Promise<Product[]> {

        const resp = await axiosClient.get<Product[]>('/product')
        return resp.data
    }
}