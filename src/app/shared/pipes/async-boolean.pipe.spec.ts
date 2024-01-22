import { AsyncBooleanPipe } from './async-boolean.pipe';

describe('AsyncBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
