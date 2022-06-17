export enum RegistryDataTypes {
  Image = "Image",
  Interface = "Interface",
  Location = "Location",
  Subscribe = "Subscribe"
}

export interface RegistryData {
  Image: string;
  Interface: string;
  Location: string;
  Subscribe?: string;
  Dependents?: number;
}

interface IAlpha {
  getContainerRegistry: () => Promise<Array<RegistryData>>;
  addInterfaceToContainer: (containerData: RegistryData) => Promise<void>;
  subscribeToImageChange: (email: string, containerImage: string) => Promise<void>
}
  
const AlphaService: IAlpha = {
  getContainerRegistry: () => Promise.resolve(mockRegistryData),

  addInterfaceToContainer: (containerData: RegistryData) => {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, 2000)
    })
  },

  subscribeToImageChange: function (email: string, containerImage: string): Promise<void> {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, 2000)
    })
  }
};

export const mockRegistryData = [
  createData("India", "IN", "www.google.com", "endpoint1"),
  createData("China", "CN", "www.google.com",  "endpoint1"),
  createData("Italy", "IT", "www.google.com",  "endpoint1"),
  createData("United States", "US", "www.google.com",  "endpoint1"),
  createData("Canada", "CA", "www.google.com",  "endpoint1"),
  createData("Australia", "AU", "www.google.com",  "endpoint1"),
  createData("Germany", "DE", "www.google.com",  "endpoint1"),
  createData("Ireland", "IE", "www.google.com",  "endpoint1"),
  createData("Mexico", "MX", "www.google.com",  "endpoint1"),
];

function createData(
  Image: string,
  Interface: string,
  Location: string,
  Subscribe: string
): RegistryData {
  return { Image, Interface, Location, Subscribe };
}

export default AlphaService;
