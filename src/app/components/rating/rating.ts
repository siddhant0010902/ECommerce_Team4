import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, IconDefinition, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-rating',
  imports: [FontAwesomeModule],                
  templateUrl: './rating.html',
  styleUrl: './rating.css'
})
export class Rating {
  score = input<number>(0);
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  stars = computed(()=> {
    const value = Math.min(this.score(), 5);
    const icons : IconDefinition[] = [];
    const solid = Math.floor(value);
    const half = value - solid >= 0.5;

    for(let i = 0; i < solid; i++) {
      icons.push(this.faStar);
    }

    if(half) {
      icons.push(this.faStarHalfStroke);
    }

    while(icons.length < 5) {
      icons.push(this.faStarEmpty);
    }

    return [...icons];
    
  })
}
