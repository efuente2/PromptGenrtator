import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ReplyFormComponent } from './admin/reply-form/reply-form.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './start/start/start.component';

const routes: Routes = [
  {path: "start", component:StartComponent},
  {path: "replyForm", component:ReplyFormComponent},
  {path: "admin", component:AdminComponent},
  {path: "chat", component:ChatComponent},
  {path: "home", component:HomeComponent},
  {path: "cart", component:CartComponent},
  {path: "login", component:LoginComponent},
  {path: "about", component:AboutComponent},
  {path: "contact", component:ContactComponent},
  {path: "", redirectTo:"start", pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
