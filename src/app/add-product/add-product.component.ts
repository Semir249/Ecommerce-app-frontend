import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  multipleImages = [];
  constructor(private productservice:ProductService) { }

  ngOnInit(): void {
  }

  addProductForm=new FormGroup({
    name:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    category:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    image:new FormArray([])
  })

  selectMultipleImage(event){
    this.multipleImages.push(event.target.files[0]);
  }

  async onMultipleSubmit(){
    if(this.addProductForm.invalid){
      return;
    }
    
    const formData = new FormData();
    formData.append('name',this.addProductForm.value.name);
    formData.append('category',this.addProductForm.value.category);
    formData.append('price',this.addProductForm.value.price);
    formData.append('quantity',this.addProductForm.value.quantity);
    formData.append('description',this.addProductForm.value.description);
    for(let img of this.multipleImages){
    await formData.append('image', img);
    }


    if(formData.get('image')==null){
      return;
    }
    
    this.productservice.addProduct(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // this.productservice.editProduct(formData,"5fe112f0897b742c70949c4d").subscribe(res=>{
    //   console.log(res);
    // }
    // )
  }
}
