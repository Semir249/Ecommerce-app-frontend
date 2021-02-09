import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsResponse } from 'src/app/interfaces/product-details-response';
import { FormGroup,FormControl,FormArray, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId:string;
  product:ProductDetailsResponse;
  multipleImages :File[]=[];
  previewImages=[];
  addProductForm:FormGroup;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private productservice:ProductService,private http:HttpClient) {
    this.activatedRoute.data.subscribe((res:{product:ProductDetailsResponse})=>{
      this.product=res.product;
    });
   }
  
  ngOnInit(): void {
    if(sessionStorage.getItem('item')){
      this.productId = JSON.parse(sessionStorage.getItem('item'));
    }else{
      this.activatedRoute.paramMap.subscribe(()=> {
        this.productId=window.history.state.id;
        sessionStorage.setItem('item', JSON.stringify(window.history.state.id));
        console.log('no state');
      });
    }

    for(let img of this.product.product.images){
      this.getImage(`${environment.apiUrl}/${img}`).subscribe(res=>{
        this.multipleImages.push(new File([res],img.substring(img.indexOf('-') + 1),{type:"image/jpeg"}));
        let reader = new FileReader();
        reader.readAsDataURL(new File([res],img.substring(img.indexOf('-') + 1),{type:"image/jpeg"})); 
        reader.onload = (_event) => { 
        this.previewImages.push(reader.result); 
    }
        
      })
    }
     
    this.addProductForm=new FormGroup({
      name:new FormControl(this.product.product.name,Validators.required),
      price:new FormControl(this.product.product.price,Validators.required),
      category:new FormControl(this.product.product.category,Validators.required),
      quantity:new FormControl(this.product.product.quantity,Validators.required),
      description:new FormControl(this.product.product.description,Validators.required),
      image:new FormArray([])
    });
  }

   getImage(imageUrl: string) {
    
     return this.http.get(imageUrl, { responseType: 'blob' });
     
  }

  removeImage(index:number){
    this.multipleImages.splice(index,1);
    this.previewImages.splice(index,1);
  }
  

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
    this.productservice.editProduct(formData,this.product.product._id).subscribe(
      (res) => {
        this.addProductForm.reset();
        this.previewImages=[];
        this.multipleImages=[];
      },
      (err) => console.log(err)
    );
  }
}
