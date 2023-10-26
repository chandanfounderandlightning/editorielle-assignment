import {
  render, screen,
} from '@testing-library/react';
import { Button } from '../index';
import { buttonClasses } from './utils';

describe('button', () => {
  it('should render button type button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toHaveAttribute('type', 'button');
  });
  it('should render button type submit', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  describe('solid variant', () => {
    it('should render small solid button', () => {
      render(<Button size="sm">Solid small</Button>);
      const button = screen.getByRole('button', { name: /solid small/i });
      expect(button).toHaveClass(buttonClasses.solidSm);
    });
    it('should render medium solid button', () => {
      render(<Button>Solid medium</Button>);
      const button = screen.getByRole('button', { name: /solid medium/i });
      expect(button).toHaveClass(buttonClasses.solidMd);
    });
    it('should render large solid button', () => {
      render(<Button size="lg">Solid large</Button>);
      const button = screen.getByRole('button', { name: /solid large/i });
      expect(button).toHaveClass(buttonClasses.solidLg);
    });

    it('should render small disabled solid button', () => {
      render(<Button size="sm" disabled>Disabled solid small</Button>);
      const button = screen.getByRole('button', { name: /disabled solid small/i });
      expect(button).toHaveClass(buttonClasses.solidSm);
      expect(button).toBeDisabled();
    });
    it('should render medium disabled solid button', () => {
      render(<Button disabled>Disabled solid medium</Button>);
      const button = screen.getByRole('button', { name: /disabled solid medium/i });
      expect(button).toHaveClass(buttonClasses.solidMd);
      expect(button).toBeDisabled();
    });
    it('should render large disabled solid button', () => {
      render(<Button size="lg" disabled>Disabled solid large</Button>);
      const button = screen.getByRole('button', { name: /disabled solid large/i });
      expect(button).toHaveClass(buttonClasses.solidLg);
      expect(button).toBeDisabled();
    });
  });

  describe('outlined variant', () => {
    it('should render small outlined button', () => {
      render(<Button variant="outlined" size="sm">Outlined small</Button>);
      const button = screen.getByRole('button', { name: /outlined small/i });
      expect(button).toHaveClass(buttonClasses.outlinedSm);
    });
    it('should render medium outlined button', () => {
      render(<Button variant="outlined">Outlined medium</Button>);
      const button = screen.getByRole('button', { name: /outlined medium/i });
      expect(button).toHaveClass(buttonClasses.outlinedMd);
    });
    it('should render large outlined button', () => {
      render(<Button variant="outlined" size="lg">Outlined large</Button>);
      const button = screen.getByRole('button', { name: /outlined large/i });
      expect(button).toHaveClass(buttonClasses.outlinedLg);
    });

    it('should render small disabled outlined button', () => {
      render(<Button variant="outlined" size="sm" disabled>Disabled outlined small</Button>);
      const button = screen.getByRole('button', { name: /disabled outlined small/i });
      expect(button).toHaveClass(buttonClasses.outlinedSm);
    });
    it('should render medium disabled outlined button', () => {
      render(<Button variant="outlined" disabled>Disabled outlined medium</Button>);
      const button = screen.getByRole('button', { name: /disabled outlined medium/i });
      expect(button).toHaveClass(buttonClasses.outlinedMd);
    });
    it('should render large disabled outlined button', () => {
      render(<Button variant="outlined" size="lg" disabled>Disabled outlined large</Button>);
      const button = screen.getByRole('button', { name: /disabled outlined large/i });
      expect(button).toHaveClass(buttonClasses.outlinedLg);
    });
  });

  describe('circular variant', () => {
    it('should render small circular button', () => {
      render(<Button variant="circular" size="sm">Circular small</Button>);
      const button = screen.getByRole('button', { name: /circular small/i });
      expect(button).toHaveClass(buttonClasses.circularSm);
    });
    it('should render medium circular button', () => {
      render(<Button variant="circular">Circular medium</Button>);
      const button = screen.getByRole('button', { name: /circular medium/i });
      expect(button).toHaveClass(buttonClasses.circularMd);
    });
    it('should render large circular button', () => {
      render(<Button variant="circular" size="lg">Circular large</Button>);
      const button = screen.getByRole('button', { name: /circular large/i });
      expect(button).toHaveClass(buttonClasses.circularLg);
    });

    it('should render small disabled circular button', () => {
      render(<Button variant="circular" size="sm" disabled>Disabled circular small</Button>);
      const button = screen.getByRole('button', { name: /disabled circular small/i });
      expect(button).toHaveClass(buttonClasses.circularSm);
    });
    it('should render medium disabled circular button', () => {
      render(<Button variant="circular" disabled>Disabled circular medium</Button>);
      const button = screen.getByRole('button', { name: /disabled circular medium/i });
      expect(button).toHaveClass(buttonClasses.circularMd);
    });
    it('should render large disabled circular button', () => {
      render(<Button variant="circular" size="lg" disabled>Disabled circular large</Button>);
      const button = screen.getByRole('button', { name: /disabled circular large/i });
      expect(button).toHaveClass(buttonClasses.circularLg);
    });
  });
});
