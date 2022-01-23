import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders without crashing', () => {
    render(<VideoPlayer />);
  });

  it('returns <video> element', () => {
    render(<VideoPlayer />);

    const container = screen.getByTestId('videoContainer');
  });
});
