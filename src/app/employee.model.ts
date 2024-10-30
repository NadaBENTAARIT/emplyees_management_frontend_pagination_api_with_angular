export interface Employee {
    id: number;
    age: number;
    dob: string | null;  // Date de naissance, qui peut être une chaîne ou null
    email: string;
    salary: number | string;  // Salaire, qui peut être un nombre ou une chaîne
    address: string;
    imageUrl: string;  // Cette propriété peut être renommée en fonction de son utilisation
    lastName: string;
    firstName: string;
    contactNumber: string;
  }
  