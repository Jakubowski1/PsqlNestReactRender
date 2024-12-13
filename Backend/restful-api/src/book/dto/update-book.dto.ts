export class UpdateBookDto {
    title?: string;
    author?: string;
    publisher?: string;
    dateOfPublication?: string;
    price?: number;
    isReserved?: boolean;
    isRented?: boolean;
    reservedUntil?: Date;
    rentedUntil?: Date;
  }
  