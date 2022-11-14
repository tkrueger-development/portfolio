class BaseEntity {
  createdOn:    number;
  modifiedOn:   number;

  constructor(
    { createdOn,         modifiedOn }: 
    { createdOn: number, modifiedOn: number, id: string }) {
      this.createdOn  = createdOn  || Date.now();
      this.modifiedOn = modifiedOn || Date.now();
  }
}

export { BaseEntity };