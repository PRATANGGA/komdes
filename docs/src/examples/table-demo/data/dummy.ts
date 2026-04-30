import { faker } from '@faker-js/faker';

// Set a fixed seed for consistent data generation
faker.seed(67890);

const refDate = new Date('2025-01-01T00:00:00.000Z');

export const users = Array.from({ length: 10 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    createdAt: faker.date.past({ refDate }),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    firstName,
    id: faker.string.uuid(),
    lastName,
    phoneNumber: faker.phone.number({ style: 'international' }),
    role: faker.helpers.arrayElement(['superadmin', 'admin', 'cashier', 'manager']),
    status: faker.helpers.arrayElement(['active', 'inactive', 'invited', 'suspended']),
    updatedAt: faker.date.recent({ refDate }),
    username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
  };
});
