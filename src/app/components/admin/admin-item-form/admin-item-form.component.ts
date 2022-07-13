import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Location } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';


@Component({
  selector: 'app-admin-item-form',
  templateUrl: './admin-item-form.component.html',
  styleUrls: ['./admin-item-form.component.css']
})
export class AdminItemFormComponent implements OnInit {

  @ViewChild('itemForm') public itemForm?: NgForm;
  categories: string[] = ["", "Shoes", "Clothes", "Glasses"];
  mode:string = "new";
  item:Item = {id:0, name:"", price:0, category:"", description:""};
  public progress: number = 0;
  public message: string = "";
  success:boolean = false;
  submitted:boolean = false;
  imageLink:string = '';
  image?: Image;

  constructor(
    private route: ActivatedRoute,
    public itemService: ItemService,
    private location: Location,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  onSubmit(): void {
    if(this.item.id > 0){
      this.itemService.updateItem(this.item)
        .subscribe({
          next: () => {
            this.itemForm?.form.markAsPristine(); 
            this.success = true;
            this.submitted = true;
          },
          error: () => {
            this.success = false;
            this.submitted = true;
          }
        });
    }
    else{
      this.itemService.addItem(this.item)
        .subscribe((item) => {
          this.item = item;
          this.itemForm?.form.markAsPristine(); 
        });
    }
  }

  getItem(): void {
    if(this.route.snapshot.paramMap.get('id') === 'undefined'
        || this.route.snapshot.paramMap.get('id') === null
        || Number(this.route.snapshot.paramMap.get('id')) === 0){
      
      this.item = {id:0, name:"", price:0, category:"", description:""};
    }
    else{
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if(id > 0){
        this.itemService.getItem(id)
        .subscribe((item) => {
            this.item = item;          
            let imagesArray = this.item?.images;
            if(imagesArray !== undefined)
              this.imageLink = `${environment.imagesUrl}/` + imagesArray[0].fileName + '?' + Math.random();
          }); 
      }
      else{
        this.router.navigate(['/404']);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }   

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      let fileExtension = file.name.split('?')[0].split('.').pop();
      this.image = new Image(this.item.id, this.item.id.toString()+'.'+fileExtension, file.type, file);

      this.imageService.upload(this.image)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / (event.total || 1));
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.updateImageLink();
          }
        });
    });
    reader.readAsDataURL(file);
  }

  public updateImageLink() {
    this.imageLink = `${environment.imagesUrl}/` + this.image?.fileName + '?' + Math.random();          

  }
}
