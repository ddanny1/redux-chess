import Wording from 'utils/Wording.js';
import modeActionTypes from '../../constants/modeActionTypes';

describe('extract()', () => {
  it('ACCEPT is extracted from DRAW_ACCEPT', () => {
    const verb = Wording.extract(modeActionTypes.DRAW_ACCEPT, Wording.verb.ACCEPT);
    expect(verb).toBe(Wording.verb.ACCEPT);
  });
  it('DECLINE is extracted from DRAW_DECLINE', () => {
    const verb = Wording.extract(modeActionTypes.DRAW_DECLINE, Wording.verb.DECLINE);
    expect(verb).toBe(Wording.verb.DECLINE);
  });
  it('PROPOSE is extracted from DRAW_PROPOSE', () => {
    const verb = Wording.extract(modeActionTypes.DRAW_PROPOSE, Wording.verb.PROPOSE);
    expect(verb).toBe(Wording.verb.PROPOSE);
  });
  it('DECLINE is not extracted from DRAW_ACCEPT', () => {
    const verb = Wording.extract(modeActionTypes.DRAW_ACCEPT, Wording.verb.DECLINE);
    expect(verb).toBe(null);
  });
});
