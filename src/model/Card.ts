
export class Card {
    constructor(
        private name: string,
        private number: string,
        private expiration: Date,
        private cvv: number,
    ) {}

    public getName(): string {
        return this.name
    }

    public getNumber(): string {
        return this.number
    }

    public getExpiration(): Date {
        return this.expiration
    }

    public getCvv(): number {
        return this.cvv
    }

    static toUserModel(user: any): Card {
        return new Card(
            user.name,
            user.number,
            user.expiration,
            user.cvv
        )
    }
}