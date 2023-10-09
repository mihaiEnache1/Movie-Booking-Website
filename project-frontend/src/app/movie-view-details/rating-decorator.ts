import { Decorator } from "./decorator";

export class RatingDecorator implements Decorator {
    private icon!: string;

    getIcon(): string {
        return this.icon;
    }

    setIcon(rating: number): void {
        if (rating > 7) {
            this.icon = 'sentiment_very_satisfied'
        } else if (rating >= 5 && rating < 7) {
            this.icon = 'sentiment_neutral'
        } else if (rating < 5) {
            this.icon = 'sentiment_dissatisfied'
        }
    }
}