import { validationPassword } from './is-password.decorator';

describe('ValidatePassword', () => {
  it('should be defined', () => {
    expect(validationPassword).toBeDefined();
  });

  it('should be return a false with: 1', () => {
    expect(validationPassword('1')).toBeFalsy();
  });

  it('should be return a false with: 222222222222222222222', () => {
    expect(validationPassword('222222222222222222222')).toBeFalsy();
  });

  it('should be return a false with: "#45y34934230\'43"', () => {
    expect(validationPassword('"#45y34934230\'43"')).toBeFalsy();
  });

  it('should be return a true with: "#45y34934230\'43"', () => {
    expect(validationPassword('Aasasdfhd@2')).toBeTruthy();
  });

  it('should be return a true with: "#45y34934230\'43"', () => {
    expect(validationPassword('@aA5555555555555555')).toBeTruthy();
  });
});
