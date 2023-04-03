export interface ClienteModelo {
  _id: any;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface BrandModelo {
  _id: any;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ProductoModelo {
  _id: any;
  brandID: string;
  title: string;
  description: string;
  imageUrl: string;
  precio: number;
}

export interface ImagenModelo {
  nombreArchivo: string;
  base64textString: string;
}