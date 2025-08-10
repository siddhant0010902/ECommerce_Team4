import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-contact-us',
  imports: [Footer, Header],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
    onSubmit(){
      alert('Your message has been sent successfully!');
    }
}
