import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose";
import { Product } from "./product.model";


@Injectable()
export class ProductService {
    private products: Product[] = [];
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
   async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        })
        const result= await newProduct.save();
        
         return result.id as string;
    }
   async  getProducts() {
    const products= await  this.productModel.find().exec()
        return products.map(prod=>({
            id:prod.id,
            title:prod.title,
            description:prod.description,
            price:prod.price}))
        }
    

   async getSingleProduct(productId: string) {
        const product =await this.findproduct(productId)
        return  {id:product.id,
        title:product.title,
        description:product.description,
        price:product.price}
    }
    async updateSingleProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findproduct(productId)
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.description = desc
        }
        if (price) {
            updatedProduct.price = price
        }

        updatedProduct.save()
    }
    private async findproduct(productId: string):Promise< Product> {
        let product
      try {   product = await this.productModel.findById(productId)}
       
      catch (error){
        throw new NotFoundException("could not find product")

      }
      if (!product) {
            throw new NotFoundException("could not find product")
        }
        return product
    }
    async deleteProductById(productId: string) {
     const result= await this.productModel.deleteOne({_id:productId}).exec()
if (result.deletedCount ===0){
    throw new NotFoundException("could not find product")

}
    }

}