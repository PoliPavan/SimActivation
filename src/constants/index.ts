export interface Customer {
  name: string;
  email: string;
  dob: string;
  address: string;
  city?: string;
  pincode?: string;
  state?: string;
}

export const initialCustomers: Customer[] = [
  {
    name: "Amit Kumar",
    email: "am@gmail.com",
    dob: "12-11-2024",
    address: "dhamtpur",
  },
  {
    name: "Raja Joshi",
    email: "joshi@gmail.com",
    dob: "08-11-2024",
    address: "Sarsapur",
  },
  {
    name: "Abhishek Jha",
    email: "jha@gmail.com",
    dob: "10-11-2024",
    address: "Haridat",
  },
  {
    name: "Rohit Sunkara",
    email: "rohit@gmail.com",
    dob: "12-05-2024",
    address: "Planadespo",
  },
  {
    name: "Abhishek Jha",
    email: "jath@gmail.com",
    dob: "23-11-2024",
    address: "Aashipur",
  },
  {
    name: "Anish Kumar",
    email: "anish@gmail.com",
    dob: "13-12-2024",
    address: "Karsi",
  },
  {
    name: "Prema Astana",
    email: "pra@gmail.com",
    dob: "22-08-2024",
    address: "Hardas",
  },
  {
    name: "Gargi Agrawal",
    email: "garg@gmail.com",
    dob: "25-09-2024",
    address: "Jamnagar",
  },
  {
    name: "Arshad Ali",
    email: "ali@gmail.com",
    dob: "05-11-2024",
    address: "Vijaynagar",
  },
  {
    name: "Akshay Kumar",
    email: "deepak@gmail.com",
    dob: "10-03-2024",
    address: "Rajkot",
  },
];
