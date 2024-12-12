import { Component } from '@angular/core';

import awsmobile from 'src/aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure(awsmobile)

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
   