import React, { Component } from 'react';
import { render } from '@testing-library/react';

import { withRandoml } from '../src';

// TODO infer
interface Props {
  choose: () => number | undefined;
  // TODO predict
}

const renderResult = ({ choose }: Props) => {
  const choice = choose();

  return <p data-testid="choice">{choice}</p>;
};

describe('withRandoml usage with a functional component', () => {
  const FunctionalComponent: React.FC<Props> = (props) => {
    return renderResult(props);
  };

  const FunctionalComponentHOC = withRandoml()(FunctionalComponent);

  it('should render random value', () => {
    const { getByTestId } = render(<FunctionalComponentHOC />);

    const result = getByTestId('choice');

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(15);
  });
});

describe('withRandoml usage with a class component', () => {
  class ClassComponent extends Component<Props> {
    render() {
      return renderResult(this.props);
    }
  }

  const ClassComponentHOC = withRandoml()(ClassComponent);

  it('should render a random value', () => {
    const { getByTestId } = render(<ClassComponentHOC />);

    const result = getByTestId('choice');

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(15);
  });
});
