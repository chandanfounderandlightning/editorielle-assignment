import React from 'react';
import {
  render, fireEvent, waitFor, getByTestId, 
} from '@testing-library/react';
import ResetPasswordGeneral from './page';
import "@testing-library/jest-dom";
jest.mock('next-auth/react', () => {
  return {
    useSession: () => jest.fn(),
  }
})
jest.mock('next/navigation');

describe('ResetPasswordGeneral Component', () => {
  it('should render the component with form elements', async () => {

    const { getByTestId } = render(<ResetPasswordGeneral />);

    // Find form elements by their labels
    const currentPasswordInput = getByTestId("currentPassword");
    const newPasswordInput = getByTestId('newPassword');
    const confirmPasswordInput = getByTestId('confirmPassword');
    const changePasswordButton = getByTestId('changePassword');

    // Ensure form elements are rendered
    expect(currentPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(currentPasswordInput, { target: { value: 'oldPassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword' } });

    // Assert that the input values have changed
    expect(currentPasswordInput).toHaveValue('oldPassword');
    expect(newPasswordInput).toHaveValue('newPassword');
    expect(confirmPasswordInput).toHaveValue('newPassword');

    // Simulate form submission
    fireEvent.submit(changePasswordButton);

  });
});
