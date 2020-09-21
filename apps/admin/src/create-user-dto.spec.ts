import { UserDto } from './user-dto';

describe('CreateUserDto', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined();
  });
});
