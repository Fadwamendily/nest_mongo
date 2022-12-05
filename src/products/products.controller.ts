import { Body, Controller, Get, Delete, Post, Param, Patch } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) { }
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice)
    return { id: generatedId }
  }
  @Get()
  async getAllProducts() {
    const products= await this.productService.getProducts();
    return products
  }


  @Get(':id')
  getProductbyid(@Param('id') prodId: string) { return this.productService.getSingleProduct(prodId) }

  @Patch(':id')
 async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,) {
   await  this.productService.updateSingleProduct(prodId, prodTitle, prodDesc, prodPrice)
    return null;
  }
  @Delete(':id')
  deleteProductbyId(@Param('id') prodId: string) { return this.productService.deleteProductById(prodId) }
}
