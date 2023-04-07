export interface ClienteModelo {
  _id: any;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface TypeModelo {
  _id: any;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ProductoModelo {
  _id: any;
  typeID: string;
  title: string;
  description: string;
  imageUrl: string;
  precio: number;
  marca: string;
}

export interface ImagenModelo {
  nombreArchivo: string;
  base64textString: string;
}