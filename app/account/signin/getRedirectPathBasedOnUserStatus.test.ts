import { getRedirectPathBasedOnUserStatus } from './getRedirectPathBasedOnUserStatus';

describe(getRedirectPathBasedOnUserStatus, () => {
  it('Should redirect to add team member page if user is individual admin and verified', () => {
    const expectedPathReturned = '/individual/add-team-member';
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: true,
      step: 'verified',
      role: 'individual_admin',
      id: 1,
    };
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  });

  it('Should redirect to choose categories if user is individual admin and member added', () => {
    const expectedPathReturned = '/individual/choose-categories';
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: true,
      step: 'member_added',
      role: 'individual_admin',
      id: 1,
    };
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  })
  it('Should redirect to choose categories if user is individual admin and selected categories', () => {
    const expectedPathReturned = '/individual/choose-categories';
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: true,
      step: 'category_selected',
      role: 'individual_admin',
      id: 1,
    };
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  })
  it('Should redirect to individual verification page if user is individual admin and not verified', () => {
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: false,
      step: 'not_verified',
      role: 'individual_admin',
      id: 1,
    };
    const expectedPathReturned = `/individual/account/signup-verification?email=${user.email}`;
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  });
  it('Should redirect to team add team member page if user is team admin and verified', () => {
    const expectedPathReturned = '/team/add-team-member';
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: true,
      step: 'verified',
      role: 'team_admin',
      id: 1,
    };
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  });
  it('Should redirect to team choose categories if user is team admin and member added', () => {
    const expectedPathReturned = '/team/choose-categories';
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: true,
      step: 'member_added',
      role: 'team_admin',
      id: 1,
    };
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  })
  it('Should redirect to team verification page if user is team admin and not verified', () => {
    const user = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      isVerified: false,
      step: 'not_verified',
      role: 'team_admin',
      id: 1,
    };
    const expectedPathReturned = `/team/account/signup-verification?email=${user.email}`;
    const pathReturned = getRedirectPathBasedOnUserStatus(user);
    expect(pathReturned).toEqual(expectedPathReturned);
  });
})