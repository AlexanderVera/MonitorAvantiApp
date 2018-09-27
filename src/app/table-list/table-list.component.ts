import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TnVariable } from '../models/tnVariable';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  token: string;
  variables: TnVariable[];
  variable: TnVariable;
  id = new FormControl('', [Validators.required]);

  constructor(private dataService: DataService) {
    this.variable = new TnVariable();

    this.getDataTnVariable();


  }


  validVariable() {
    return (!isNaN(this.variable.idVariable) && !isNaN(this.variable.estado) && this.variable.descripcion != undefined && this.variable.nombre != undefined);
  }

  selectVariable(tnVar: TnVariable) {
    this.variable = tnVar;
  }

  getDataTnVariable() {
    this.dataService.getDataTnVariable(this.token).subscribe(
      res => {
        this.variables = JSON.parse(res._body);
        console.log("table-list RES(" + JSON.stringify(res._body) + ")");
        console.log("table-list variables(" + this.variables[0].descripcion + ")");
      }
    );
  }

  deleteTnVariable(tnVar: TnVariable) {
    this.dataService.deleteDataTnVariable(this.token, tnVar.idVariable).subscribe(
      res => {
        this.getDataTnVariable();
      }
    );
  }

  isVariable(idVariable: number) {
    if (this.variables == undefined || this.variables.length == 0) {
      return undefined;
    }
    else {
      return this.variables.find(function exist(tnVar) {
        return tnVar.idVariable === idVariable;
      });
    }
  }

  createUpdateVar() {
    if (this.isVariable(this.variable.idVariable) == undefined) {
      this.dataService.saveVariable(this.token, this.variable).subscribe(
        res => {
          this.getDataTnVariable();
          this.variable = new TnVariable();
        }
      );
    } else {
      this.dataService.updateVariable(this.token, this.variable).subscribe(
        res => {
          this.getDataTnVariable();
          this.variable = new TnVariable();
        }
      );
    }
  }

  ngOnInit() {
  }

}
