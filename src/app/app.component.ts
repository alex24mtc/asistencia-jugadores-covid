import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lista-angular';

  constructor(private db: AngularFirestore) {
    const prueba = this.db.collection('prueba').valueChanges(); //cuando referencio una variable de la cakse mejor poner el this
    prueba.subscribe(console.log);
    
}
}

