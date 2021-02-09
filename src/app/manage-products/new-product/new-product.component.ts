import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  multipleImages :File[]=[];
  previewImages=[];
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

  selectMultipleImage(event,index:number){
    this.multipleImages.splice(index,1,event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.previewImages.splice(index,1,reader.result); 
    }
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
      (res) => {
        this.addProductForm.reset();
        this.previewImages=[];
        this.multipleImages=[];
      },
      (err) => console.log(err)
    );
    // this.productservice.editProduct(formData,"5fe112f0897b742c70949c4d").subscribe(res=>{
    //   console.log(res);
    // }
    // )
  }

}
