import { Component, OnInit } from '@angular/core';
import { Hopital } from 'src/app/modules/hopital.module';
import { HopitalService } from 'src/app/services/hopital.service';
import { serverHopResponse } from '../header/header.component';

@Component({
  selector: 'app-hopitaux',
  templateUrl: './hopitaux.component.html',
  styleUrls: ['./hopitaux.component.css']
})
export class HopitauxComponent implements OnInit {

  hopitaux:Hopital[];
  // filterlist:Hopital[];
  regions:Hopital[];
  provinces:Hopital[];
  loader=true;
  result=true;
  // nbrligne:number;
  selectedProvince:string;
  selectedRegion:string;
  selectedNom:string;
  constructor(private hopitalservice:HopitalService) { }

  ngOnInit(): void {

    

    this.hopitalservice.getall()
      .subscribe((data:serverHopResponse)=>{ 
        this.hopitaux=data.hopitaux; 
        // this.filterlist=data; 
      setInterval(() => {   
        this.loader = false;  
      }, 1500);
        // this.nbrligne=data.hopitaux.length;
        // console.log(this.nbrligne);
      });


      

      // setTimeout(()=>{ 
      //   this.loader=false;       
           
      // },4000);

    // setTimeout(()=>{
    //   this.hopitalservice.getall()
    //   .subscribe((data)=>{ 
    //     this.hopitaux=data;    
    //     console.log(data);
    //   });
    // },3000);
   
      this.hopitalservice.getRegions()
      .subscribe((data:serverRegionsResponse)=>{
        console.log("regions : "+data);  
        this.regions=data.regions;

     });

     this.hopitalservice.getProvince()
      .subscribe((data:serverProvincesResponse)=>{
        console.log("province" + data);  
        this.provinces=data.provinces;
     });

  }


  search(){
    if((this.selectedProvince==="" || this.selectedProvince===undefined) && (this.selectedRegion==="" || this.selectedRegion===undefined) && (this.selectedNom==="" || this.selectedNom===undefined)){
       this.loader=true;
      this.hopitalservice.getall()
      .subscribe((data)=>{ 
        this.hopitaux=data.hopitaux; 
        // this.filterlist=data; 
        this.result=true;
      setInterval(() => {   
        this.loader = false;  
      }, 1500);
        // this.nbrligne=data.hopitaux.length;
        // console.log(this.nbrligne);
      },err=>{
        this.result=false;
      });
    }
    else{
      if((this.selectedRegion!=="" && this.selectedRegion!==undefined) && (this.selectedProvince!=="" && this.selectedProvince!==undefined) && (this.selectedNom!=="" && this.selectedNom!==undefined)){
        this.loader=true;
        this.hopitalservice.getByNameProvReg(this.selectedNom,this.selectedProvince,this.selectedRegion)
        .subscribe(data=>{    
          this.hopitaux=data;
          this.result=true;   
          setInterval(() => {   
            this.loader = false;  
          }, 1500);
        },err=>{
                alert("err");
                this.result=false;   
        });
      
      }
      else if((this.selectedRegion!=="" && this.selectedRegion!==undefined) && (this.selectedProvince!=="" && this.selectedProvince!==undefined)){
          this.loader=true;
          this.hopitalservice.getByRegProv(this.selectedProvince,this.selectedRegion)
          .subscribe(data=>{    
            this.hopitaux=data; 
            this.result=true;   
            setInterval(() => {   
              this.loader = false;  
            }, 1500);
          },err=>{
            this.result=false;
          })
      }
      else if((this.selectedRegion!=="" && this.selectedRegion!==undefined) && (this.selectedNom!=="" && this.selectedNom!==undefined)){
        this.loader=true;
        this.hopitalservice.getByRegName(this.selectedNom,this.selectedRegion)
        .subscribe(data=>{    
          this.hopitaux=data; 
          this.result=true;   
          setInterval(() => {   
            this.loader = false;  
          }, 1500);
        },err=>{
            this.result=false;
        });
      }
      else if((this.selectedProvince!=="" && this.selectedProvince!==undefined) && (this.selectedNom!=="" && this.selectedNom!==undefined)){
        this.loader=true;
        this.hopitalservice.getByProvName(this.selectedNom,this.selectedProvince)
        .subscribe(data=>{    
          this.hopitaux=data;   
          this.result=true; 
          setInterval(() => {   
            this.loader = false;  
          }, 1500);
        },err=>{
                
                this.result=false;
        });
      }
      else if((this.selectedProvince!=="" && this.selectedProvince!==undefined)){
         

          this.loader=true;
          this.hopitalservice.getByProvince(this.selectedProvince)
          .subscribe(data=>{    
            this.hopitaux=data; 
            this.result=true;   
            setInterval(() => {   
              this.loader = false;  
            }, 1500);
          },err=>{
            this.result=false;
          });

      }
      else if((this.selectedRegion!=="" && this.selectedRegion!==undefined)){
       

        this.loader=true;
        this.hopitalservice.getByRegion(this.selectedRegion)
        .subscribe(data=>{    
          this.hopitaux=data; 
          this.result=true;   
          setInterval(() => {   
            this.loader = false;  
          }, 1500);
        },err=>{
          this.result=false;
        })

      }
      else if((this.selectedNom!=="" && this.selectedNom!==undefined)){
       
        this.loader=true;
        this.hopitalservice.getByName(this.selectedNom)
        .subscribe(data=>{    
          this.hopitaux=data;  
          this.result=true;  
          setInterval(() => {   
            this.loader = false;  
          }, 1500);
        },err=>{
          this.result=false;
        })

      }

     
    }
  }

  // search(req="rtccasablanaca"){
  //   alert(req);
  //   // this.filterlist=(req)?this.hopitaux.filter(emp=>emp.nom.toLowerCase().includes(req.toLowerCase()) || emp.prenom.toLowerCase().includes(req.toLowerCase()) || emp.email.toLowerCase().includes(req.toLowerCase()) || emp.type.toLowerCase().includes(req.toLowerCase())) : this.employes;
  //   this.filterlist=(req)?this.hopitaux.hopitaux.filter(emp=>emp.nom.toLowerCase().includes(req.toLowerCase())) : this.hopitaux;
    
  // }

}

export interface serverRegionsResponse{
  regions:Hopital[];

}

export interface serverProvincesResponse{
  provinces:Hopital[];
}


