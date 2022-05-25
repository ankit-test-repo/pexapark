import {Component, Input, OnInit} from '@angular/core';
import {Windfarm} from '../../model/windfarm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-farm-card',
  templateUrl: './farm-card.component.html',
  styleUrls: ['./farm-card.component.scss']
})
export class FarmCardComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() farm!: Windfarm;

  ngOnInit(): void {
  }

  findFarm(id: string) {
    this.router.navigate(['/farms', id]);
  }
}
