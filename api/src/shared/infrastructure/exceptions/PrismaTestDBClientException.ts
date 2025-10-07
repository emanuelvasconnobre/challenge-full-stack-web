import { AppException } from "@/shared/domain/exceptions/AppException";

export default class PrismaTestDBClientException extends AppException {
  constructor() {
    super(
      "Prisma Client was not generated, Please generate Prisma test environment by running the follow command: \n\nnpm run test:integration:setup",
    );
  }
}
