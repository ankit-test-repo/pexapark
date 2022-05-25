import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllFarmsComponent } from './pages/all-farms/all-farms.component';
import {WindfarmsState} from './store/windfarms/windfarms.state';
import {NgxsModule} from '@ngxs/store';
import {WindfarmService} from './services/windfarm.service';
import {HttpClientModule} from '@angular/common/http';
import { FarmOutputComponent } from './pages/farm-output/farm-output.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FarmCardComponent } from './components/farm-card/farm-card.component';
import {NgChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AllFarmsComponent,
    FarmOutputComponent,
    HeaderComponent,
    FilterPipe,
    FarmCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([WindfarmsState]),
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [WindfarmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
