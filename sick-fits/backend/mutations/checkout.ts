import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { OrderCreateInput } from '../.keystone/schema-types';

async function checkout(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {}

export default checkout;
