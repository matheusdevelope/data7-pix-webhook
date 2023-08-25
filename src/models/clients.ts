import { PathOrFileDescriptor, readFileSync } from "fs";

export default class Client {
  name: string;
  location: string;
  ca: Buffer;
  constructor(name: string, location: string, ca_path: PathOrFileDescriptor) {
    this.name = name;
    this.location = location;
    this.ca = readFileSync(ca_path);
  }
}
