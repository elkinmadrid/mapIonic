import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../core/service/user.service';
import { Plugins } from '@capacitor/core';



const { Clipboard, Storage, Modals } = Plugins;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  pass: string;

  constructor(private authService: UserService, private router: Router, private alertCtrl: AlertController
  ) { }



  ngOnInit(): void {
  }


  googleAuth() {
    this.authService.googleAuth().then(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.user));

        this.router.navigateByUrl('/tab-nav');
      }
    ).catch((error) => {
      this.showAlert('Error', error);
    }
    );
  }

  authBtn() {
    this.authService.authWithEmailAndPass(this.email, this.pass).then(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigateByUrl('/tab-nav');
      }
    ).catch((error) => {
      this.showAlert('Error', error);
    }
    );
  }

  async showAlert(headerParam: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: headerParam,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
