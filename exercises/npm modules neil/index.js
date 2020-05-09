import wait from 'waait';
import faker from 'faker';
import { formatDistance } from 'date-fns';

async function go() {
  console.log('going');
  await wait(2000);
  console.log(faker.name.firstName());
}

go();
