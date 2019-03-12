import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent ,ChatSupportComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { chatSupportService } from './services/chat-support.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { TokenInterceptor } from './app.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    ChatSupportComponent,
    
    
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule, 
    MatCheckboxModule,
    FormsModule, ReactiveFormsModule
    
    
    
  ],
  entryComponents:[
   
    ChatSupportComponent
    

  ],
  providers: [chatSupportService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },



  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
