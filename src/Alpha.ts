export enum RegistryDataTypes {
  Container = "Container",
  Interface = "Interface",
  Location = "Location",
}

export interface RegistryData {
  Container: string;
  Interface: string;
  Location: string;
}

interface IAlpha {
  getContainerRegistry: () => Promise<Array<RegistryData>>;
  addInterfaceToContainer: (containerData: RegistryData) => void;
}
  
const AlphaService: IAlpha = {
  getContainerRegistry: () => Promise.resolve(mockRegistryData),

  addInterfaceToContainer: (containerData: RegistryData) => {
    throw new Error("Function not implemented.");
  },
};

export const mockRegistryData = [
  createData("India", "IN", "www.google.com"),
  createData("China", "CN", "www.google.com"),
  createData("Italy", "IT", "www.google.com"),
  createData("United States", "US", "www.google.com"),
  createData("Canada", "CA", "www.google.com"),
  createData("Australia", "AU", "www.google.com"),
  createData("Germany", "DE", "www.google.com"),
  createData("Ireland", "IE", "www.google.com"),
  createData("Mexico", "MX", "www.google.com"),
];

function createData(
  Container: string,
  Interface: string,
  Location: string
): RegistryData {
  return { Container, Interface, Location };
}

export default AlphaService;
