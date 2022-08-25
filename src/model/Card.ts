
export class Card {
    constructor(
        private id: string,
        private name: string,
        private number: string,
        private expiration: string,
        private cvv: number,
        private userId: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getNumber(): string {
        return this.number
    }

    public getExpiration(): string {
        return this.expiration
    }

    public getCvv(): number {
        return this.cvv
    }

    public getUserId(): string {
        return this.userId
    }

    static toCardModel(card: any): Card {
        return new Card(
            card.id,
            card.name,
            card.number,
            card.expiration,
            card.cvv,
            card.userId
        )
    }
}