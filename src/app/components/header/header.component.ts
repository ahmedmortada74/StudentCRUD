import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  ,
imports: [RouterLink]
})
export class HeaderComponent {
 visible: boolean = false;

  constructor(private router: Router) {}
  // showDialog() {
  //         this.visible = !this.visible;
  //     }
  // goToForm(event: Event) {
  //   event.preventDefault(); // يمنع refresh
  //   event.stopPropagation();
  //   this.router.navigate(['/form']);
  // }
}
