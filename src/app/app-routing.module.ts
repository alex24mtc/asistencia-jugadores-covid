import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { ListadoComponent } from './paginas/listado/listado.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { BienvenidaComponent } from './paginas/bienvenida/bienvenida.component';
import { IsLogueadoGuard } from './guard/isLogueado/is-logueado.guard';

const routes: Routes = [

    //si el path esta vacio, se ira a listado

  {
    path:'',
    redirectTo:'formulario',
    pathMatch:'full'
  },

  {path:'login',
  component:LoginComponent
  },

  {path:'formulario',
component:ListadoComponent
  },

  {path:'admin',
  component:AdminComponent,
  canActivate:[IsLogueadoGuard]
  //es para no tener que hacer el login
  
  },

  {path:'bienvenida',
  component:BienvenidaComponent
  },

  //si el path es cualquier otro que no sea las opciones anteriores, se ira a listado
  {
    path:'**',
    redirectTo:'formulario',
    pathMatch:'full'
  },



  //si alguien entra a la ruta por defecto " / " quiero que vaya al listado

  //quiero que si alguien

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
