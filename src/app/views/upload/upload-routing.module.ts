import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDatComponent } from './uploaddata.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Upload'
    },
    children: [
      {
        path: '',
        redirectTo: 'schema'
     },
      {
        path: 'schema',
         component: UploadDatComponent,
        data: {
          title: 'Upload Data'
        }
      },
      {
        path: 'typography',
        // component: TypographyComponent,
        data: {
          title: 'Typography'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaddRoutingModule {}
