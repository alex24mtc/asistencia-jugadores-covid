import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface Asistente {
nombre: string;
telefono: any;
email: string;
dni: string;
rol: string;
id: string;
jornada: number;
}

@Component({
selector: 'app-listado-alumnos',
templateUrl: './listado-alumnos.component.html',
styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit, OnChanges {

alumnosRef:any;
alumnosArray = [];
alumnosArrayFiltrado = [];
@Input() jornada;

displayedColumns: string[] = [
'nombre',
'telefono',
'email',
'dni',
'rol',
'id',
'jornada'];

dataSource;

@ViewChild(MatSort) sort: MatSort;

ngAfterViewInit(){
this.dataSource.sort = this.sort;
}



constructor(private db: AngularFirestore ) {
this.alumnosRef = this.db.collection('alumnos');
}



ngOnInit(): void {
// milisegundo 1
const alumnos = this.db.collection('alumnos').snapshotChanges()



alumnos.subscribe(( res:any)=>{
// 49 milisegundos
const arrayMapped: Asistente[] = res.map((a)=>{
const data = a.payload.doc.data();
const id = a.payload.doc.id;
return { ...data, id }
})

this.alumnosArray = arrayMapped;
this.alumnosArrayFiltrado = this.alumnosArray;
console.log('ALUMNOS ARRAY FILTRADO', this.alumnosArrayFiltrado)


this.filtrar();
});
}

ngOnChanges(changes: SimpleChanges) {
// milisegundo 3
console.log('NG ON CHANGES');
this.filtrar()
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
filtrar(){
const jornadaParseada = parseInt(this.jornada);
this.alumnosArrayFiltrado = this.alumnosArray.filter((participante, index)=>{
if(participante.jornada === jornadaParseada ){
return true
}else{
return false
}
})

this.dataSource = new MatTableDataSource(this.alumnosArrayFiltrado);
this.dataSource.sort = this.sort;

}

eliminar(id:string){
console.log('id', id);

Swal.fire({
title: '¿Estás seguro que deseas eliminarlo?',
showCancelButton: true,
confirmButtonText: 'Yes, delete it!',
cancelButtonText: 'No, keep it'
}).then((result) => {
if (result.value) {
// QUIERO ELIMINAR A ESTE USUARIO;
this.alumnosRef.doc(id).delete()

}
})
//
}

}

