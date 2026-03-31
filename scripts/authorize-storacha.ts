import { create } from '@web3-storage/w3up-client';
import { Signer } from '@ucanto/principal/ed25519';

async function main() {
  const key = process.env.STORACHA_KEY!;
  const spaceDid = process.env.SPACE_DID!;
  const email = 'lingsiewwin99@gmail.com';

  const signer = Signer.parse(key);
  const client = await create({ principal: signer });
  console.log('Agent DID:', client.agent.did());
  console.log('Sending verification email to', email, '...');
  await client.login(email as `${string}@${string}`);
  console.log('Email confirmed. Setting space...');
  await client.setCurrentSpace(spaceDid as `did:${string}:${string}`);
  console.log('Done. Space authorized.');
}

main().catch(console.error);
