export default class Dummy {
    id : number;

    dummy : string;

    constructor(id : number, dummy : string) {
      this.id = id;
      this.dummy = dummy;
    }

    setId(id : number) : void {
      this.id = id;
    }

    setDummy(dummy : string) : void {
      this.dummy = dummy;
    }

    getId() : number {
      return this.id;
    }

    getDummy() : string {
      return this.dummy;
    }
}
