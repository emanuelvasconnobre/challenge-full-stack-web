declare module "@prisma-test/client" {
  export class PrismaClient {
    $disconnect(): Promise<void>;
    $connect(): Promise<void>;
    $queryRaw(q: string): Promise<void>;
  }
}
