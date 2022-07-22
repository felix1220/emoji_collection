import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollerComponent } from './scroller/scroller.component';
import { ChartSampleComponent } from './chart-sample/chart-sample.component';
import { DoughnoutChartComponent } from './doughnout-chart/doughnout-chart.component';
import { SplitSpriteComponent } from './split-sprite/split-sprite.component';
import { FormsModule } from '@angular/forms';
import { RewriteComponent } from './rewrite/rewrite.component';
import { DatetimePickerInputComponent } from './datetime-picker-input/datetime-picker-input.component';
import { TreeWrapperComponent } from './tree-wrapper/tree-wrapper.component';
import { TreeNgxModule } from 'tree-ngx';
import { TreeModule } from '@circlon/angular-tree-component';
import { FakeOneComponent } from './fake-one/fake-one.component';
import { FakeTwoComponent } from './fake-two/fake-two.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';

@NgModule({
  declarations: [
    AppComponent,
    ScrollerComponent,
    ChartSampleComponent,
    DoughnoutChartComponent,
    SplitSpriteComponent,
    RewriteComponent,
    DatetimePickerInputComponent,
    TreeWrapperComponent,
    FakeOneComponent,
    FakeTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    TreeNgxModule,
    TreeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
