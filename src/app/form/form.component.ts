import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  Register:FormGroup;
  list:any =[];
  constructor(private fb:FormBuilder,private service:ServiceService,private toastr: ToastrService) {
    this.Register= this.fb.group(
      { 
        
        // EmployeeName:[''],
        // Occupation:[''],
        // ImageFile:['']

        employeeID:[4],
        employeeName:['',Validators.required],
        employeeDeparment:['',Validators.required],
        employeeAge:['',Validators.required],
        employeeRole:['',Validators.required]
        
       } )
   }

  ngOnInit(): void {

    this.service.onReceive().subscribe(res=>{
      this.list = res;
  });

console.log(this.list);
  this.Register.patchValue({
    employeeName: this.list[0].employeeName,
    employeeDeparment: this.list[0].employeeDeparment,
    employeeRole: this.list[0].employeeRole,
    employeeAge: this.list[0].employeeAge
  });

}



onSUbmit(){
  console.log(this.list);

  // Swal.fire('This is a simple and sweet alert');
  console.log(this.Register.value);
  this.onUpdate(4);


  // if(this.Register.get('employeeID').value == 0 ){

  //   console.log(this.Register.get('employeeID').value);
  //   this.onSave();
  // }else{
  //   console.log(this.Register.get('employeeID').value);
  //   this.onUpdate(4);

  // }

  
}
onSave(){
  this.service.postEmployeeDetail(this.Register.value).subscribe(res => {
    this.service.onReceive();
    this.refreshList();
    this.toastr.success('Submitted successfully', 'Employee Detail Register')

  });

}
onUpdate(id: number){

  this.service.putEmployeeDetail(id,this.Register.value).subscribe( res => {
    // this.Register.reset();
    this.refreshList();
    this.toastr.info('Updated successfully', 'Payment Detail Register')
  })

}
onReset(){
  this.Register.reset();
  this.Register.patchValue({
    employeeID:4,});
}




refreshList(){
this.service.onReceive().subscribe(res => {
  this.list = res;
})
}

onDelete(id: any){

  if(confirm('Are you sure to delete this record'))
 
  {
  this.service.deletePaymentDetail(id).subscribe(res=>{
  console.log(res);
  this.refreshList();
  this.toastr.error('Deleted successfully', 'Employee Detail Register')

});

 }
}

populateForm(pdlist:any){
console.log(pdlist);

this.Register.patchValue({
  employeeID:pdlist.employeeID,
  employeeName:pdlist.employeeName,
  employeeDeparment:pdlist.employeeDeparment,
  employeeRole:pdlist.employeeRole,
  employeeAge:pdlist.employeeAge
});
}

}
