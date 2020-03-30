import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecureMessageComponent } from '../../modals/secure-message/secure-message.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.page.html',
  styleUrls: ['./tool.page.scss'],
})
export class ToolPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  openSecureMessage() {
    this.router.navigateByUrl('secure-message');
  }

}
