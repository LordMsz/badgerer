export interface ICell {
    id: number;
    flipped: boolean;
    value: number;
}

export class Cell implements ICell {
    public constructor(public readonly id: number, public readonly flipped: boolean) {
    }

    public get value() {
        return Math.floor(Math.random() * 100);
    }
}
